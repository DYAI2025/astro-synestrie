/**
 * encounterChoices — die Begegnungswahl (Zielpunkt des Tagesrituals).
 *
 * "Womit begegnest du dem Tag?" — drei Qualitäten aus der Chance-Seite des
 * heutigen Tagestyps, ergänzt um das Tageselement der Tagessäule. Immer
 * dabei: Freitext ("Eigene Wahl") und ein gleichwertiger Skip — beides
 * rendert die UI, hier kommen nur die Angebote her.
 *
 * Anti-Reifikation: Angebote an sich selbst, nie Remediation-Befehle
 * ("dir fehlt X, tu Y"). Formulierungen sind Qualitäten (Substantive),
 * keine Anweisungen. Verzichtswahl ist paradoxe Intention: "Ich versuche
 * heute nicht …" — ebenfalls Angebot, ebenfalls überspringbar.
 */

import { DayType, ElementDe } from "./baziLabels";

/** Begegnungsqualitäten je Tageselement (Qualität des Elements selbst, kein Defizit-Ausgleich). */
const ELEMENT_QUALITIES: Record<ElementDe, string> = {
  Holz: "Wachstumslust",
  Feuer: "Wärme",
  Erde: "Bodenhaftung",
  Metall: "Klarheit",
  Wasser: "Beweglichkeit",
};

/** Verzichts-Angebote je Tagestyp — die Schatten-Seite als paradoxe Intention. */
const VETO_BY_DAY_TYPE: Record<DayType["id"], string[]> = {
  ressource: ["alles selbst zu machen", "Hilfe abzulehnen"],
  ausdruck: ["mich zu verzetteln", "jede Idee sofort zu zeigen"],
  einfluss: ["alles kontrollieren zu wollen", "über Grenzen anderer zu gehen"],
  struktur: ["mich klein zu machen", "Regeln wichtiger zu nehmen als Menschen"],
  gleichrang: ["nur im Vertrauten zu bleiben", "Gegenstimmen zu überhören"],
};

export interface EncounterOffer {
  /** Drei wählbare Begegnungsqualitäten. */
  qualities: string[];
  /** Verzichts-Angebote ("Ich versuche heute nicht …"). */
  vetoOptions: string[];
  /** Datenanker für den Provenance-Chip. */
  anchor: string;
}

/**
 * Baut die Begegnungs-Angebote aus Tagestyp + Tageselement.
 * Ohne Tagestyp gibt es KEINE Angebote (ehrlicher Missing-State) —
 * die UI bietet dann nur Freitext und Skip an.
 */
export function encounterOffer(dayType: DayType | null, dayElement: ElementDe | null): EncounterOffer | null {
  if (!dayType) return null;

  const qualities = [...dayType.chanceQualities];
  // Tageselement-Qualität ergänzt oder ersetzt den letzten Slot — max. 3 Angebote,
  // deterministisch, ohne Duplikate.
  if (dayElement) {
    const elementQuality = ELEMENT_QUALITIES[dayElement];
    if (!qualities.includes(elementQuality)) {
      qualities.splice(2, 1, elementQuality);
    }
  }

  return {
    qualities: qualities.slice(0, 3),
    vetoOptions: VETO_BY_DAY_TYPE[dayType.id],
    anchor: "Chance-Seite des Tagestyps + Element der Tagessäule",
  };
}
