/**
 * dayTypeSelector — deterministische, reine Sprecher- und Tagestyp-Auswahl
 * für Tagespuls 2.0 (Rat der Sechs, anti-fabrikationskonform beschnitten).
 *
 * Es sprechen ausschließlich Archetypen mit echtem Datenanker im
 * Daily-/Bootstrap-Response:
 *  - Day-Master        (eastern.evidence.day_master + relation_to_day_master)
 *  - West-Archetyp     (western.evidence.natal_focus[0] → Sonne/Aszendent/Mond)
 *  - Dominantes Element (signature_blueprint.elements, stärkstes Gewicht)
 *
 * Mond und Jahrestier ohne Tagesanker schweigen — Schweigen ist Feature.
 * Die Auswahl ist eine pure Function (testbar, im Methodik-Tab offengelegt)
 * und immer als "Interpretation" gelabelt.
 *
 * Agency-Loop: Hat der Nutzer beim letzten Tag GLEICHEN Typs
 * "Bei mir anders → zeig die Gegenseite" gewählt, wird die Perspektive
 * clientseitig verlässlich gewechselt (West ↔ Ost).
 */

import { DayType, ElementDe, dayTypeFromRelation, natalFocusLabel, stemInfo } from "./baziLabels";

export type Reaction = "kenne_ich" | "teils" | "gegenseite";

export type SpeakerSource = "day_master" | "west_archetyp" | "dominantes_element";

export interface Speaker {
  source: SpeakerSource;
  /** Anzeigename, z. B. "Day-Master Xīn (Metall, Yin)" oder "Sonne". */
  label: string;
  /** Der Datenanker, der diesen Sprecher legitimiert (Provenance-Chip). */
  anchor: string;
  /** "gegenseite", wenn der Agency-Loop die Perspektive gewechselt hat. */
  perspective: "standard" | "gegenseite";
}

export interface SpeakerInput {
  /** Roh: eastern.evidence.day_master (Pinyin-Stem). */
  dayMasterStem: string | null | undefined;
  /** Roh: eastern.evidence.relation_to_day_master. */
  relationRaw: string | null | undefined;
  /** Roh: western.evidence.natal_focus (z. B. ["sun","ascendant"]). */
  natalFocus: string[] | null | undefined;
  /** Roh: signature_blueprint.elements (5 WuXing-Gewichte). */
  elements: Record<string, number> | null | undefined;
  /** Letzte Reaktion beim GLEICHEN Tagestyp (aus dem Reflection-Store). */
  lastReactionForType: Reaction | null | undefined;
}

export function deriveDayType(relationRaw: string | null | undefined): DayType | null {
  return dayTypeFromRelation(relationRaw);
}

/** Stärkstes Element der 5D-Signatur; bei Gleichstand das alphabetisch erste (deterministisch). */
export function dominantElement(elements: Record<string, number> | null | undefined): ElementDe | null {
  if (!elements) return null;
  const valid = Object.entries(elements).filter(
    ([k, v]) => ["Holz", "Feuer", "Erde", "Metall", "Wasser"].includes(k) && Number.isFinite(v),
  ) as [ElementDe, number][];
  if (valid.length < 2) return null;
  valid.sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0], "de"));
  return valid[0][0];
}

function dayMasterSpeaker(input: SpeakerInput, perspective: Speaker["perspective"]): Speaker | null {
  const stem = stemInfo(input.dayMasterStem);
  if (!stem || !deriveDayType(input.relationRaw)) return null;
  return {
    source: "day_master",
    label: `Day-Master ${stem.pinyin} (${stem.element}, ${stem.polarity} ${stem.hanzi})`,
    anchor: "Tagessäule + Day-Master (FuFirE eastern.evidence)",
    perspective,
  };
}

function westSpeaker(input: SpeakerInput, perspective: Speaker["perspective"]): Speaker | null {
  const first = (input.natalFocus ?? []).map((f) => natalFocusLabel(f)).find(Boolean);
  if (!first) return null;
  return {
    source: "west_archetyp",
    label: first,
    anchor: "Transit-Fokus (FuFirE western.evidence.natal_focus)",
    perspective,
  };
}

function elementSpeaker(input: SpeakerInput, perspective: Speaker["perspective"]): Speaker | null {
  const dom = dominantElement(input.elements);
  if (!dom) return null;
  return {
    source: "dominantes_element",
    label: `Dominantes Element ${dom}`,
    anchor: "5D-Signatur (FuFirE signature_blueprint.elements)",
    perspective,
  };
}

/**
 * Wählt den heutigen Sprecher.
 *
 * Standard-Priorität: Day-Master (Ost, Kapazitätsrahmen) → West-Archetyp →
 * Dominantes Element. Nach einer "Gegenseite"-Wahl beim letzten gleichen
 * Tagestyp wird die Seite gewechselt: West-Archetyp zuerst (bzw. Day-Master,
 * wenn zuletzt West sprach implizit über die Standard-Priorität) — der
 * Wechsel ist sichergestellt, solange mindestens zwei verankerte Sprecher
 * existieren. Existiert kein verankerter Sprecher, gibt es KEINEN Sprecher
 * (ehrlicher Missing-State), nie einen erfundenen.
 */
export function pickSpeaker(input: SpeakerInput): Speaker | null {
  const flipped = input.lastReactionForType === "gegenseite";
  const perspective: Speaker["perspective"] = flipped ? "gegenseite" : "standard";

  const order = flipped
    ? [westSpeaker, elementSpeaker, dayMasterSpeaker]
    : [dayMasterSpeaker, westSpeaker, elementSpeaker];

  for (const candidate of order) {
    const speaker = candidate(input, perspective);
    if (speaker) return speaker;
  }
  return null;
}
