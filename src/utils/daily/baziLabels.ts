/**
 * baziLabels — deutsche Präsentations-Labels für die FuFirE-Rohfelder des
 * Tagespuls (Etappe 1, Tagespuls 2.0).
 *
 * Reine Lokalisierung, kein Error-Masking: Die Engine liefert Pinyin-Stems,
 * englische Relationen und teils englische Zeichennamen — hier werden sie in
 * die deutsche Oberfläche übersetzt. Unbekannte Werte ergeben ehrlich `null`
 * (die UI zeigt dann den Missing-State), nie einen erfundenen Fallback.
 *
 * Unverortete Sektornummern werden bewusst NICHT übersetzt — die
 * 12er-Lebensbereich-Taxonomie ist eine offene fachliche Entscheidung
 * (Etappe 2); bis dahin rendert die UI keine Sektoren.
 */

export type ElementDe = "Holz" | "Feuer" | "Erde" | "Metall" | "Wasser";
export type Polarity = "Yang" | "Yin";

export interface StemInfo {
  pinyin: string;
  hanzi: string;
  element: ElementDe;
  polarity: Polarity;
}

/** Die 10 Himmelsstämme, kanonische Pinyin-Schreibweise wie von FuFirE geliefert. */
const STEMS: Record<string, StemInfo> = {
  jia: { pinyin: "Jiǎ", hanzi: "甲", element: "Holz", polarity: "Yang" },
  yi: { pinyin: "Yǐ", hanzi: "乙", element: "Holz", polarity: "Yin" },
  bing: { pinyin: "Bǐng", hanzi: "丙", element: "Feuer", polarity: "Yang" },
  ding: { pinyin: "Dīng", hanzi: "丁", element: "Feuer", polarity: "Yin" },
  wu: { pinyin: "Wù", hanzi: "戊", element: "Erde", polarity: "Yang" },
  ji: { pinyin: "Jǐ", hanzi: "己", element: "Erde", polarity: "Yin" },
  geng: { pinyin: "Gēng", hanzi: "庚", element: "Metall", polarity: "Yang" },
  xin: { pinyin: "Xīn", hanzi: "辛", element: "Metall", polarity: "Yin" },
  ren: { pinyin: "Rén", hanzi: "壬", element: "Wasser", polarity: "Yang" },
  gui: { pinyin: "Guǐ", hanzi: "癸", element: "Wasser", polarity: "Yin" },
};

export interface BranchInfo {
  pinyin: string;
  hanzi: string;
  animal: string;
  element: ElementDe;
}

/** Die 12 Erdzweige (Tier + Zweig-Element). */
const BRANCHES: Record<string, BranchInfo> = {
  zi: { pinyin: "Zǐ", hanzi: "子", animal: "Ratte", element: "Wasser" },
  chou: { pinyin: "Chǒu", hanzi: "丑", animal: "Büffel", element: "Erde" },
  yin: { pinyin: "Yǐn", hanzi: "寅", animal: "Tiger", element: "Holz" },
  mao: { pinyin: "Mǎo", hanzi: "卯", animal: "Hase", element: "Holz" },
  chen: { pinyin: "Chén", hanzi: "辰", animal: "Drache", element: "Erde" },
  si: { pinyin: "Sì", hanzi: "巳", animal: "Schlange", element: "Feuer" },
  wu: { pinyin: "Wǔ", hanzi: "午", animal: "Pferd", element: "Feuer" },
  wei: { pinyin: "Wèi", hanzi: "未", animal: "Ziege", element: "Erde" },
  shen: { pinyin: "Shēn", hanzi: "申", animal: "Affe", element: "Metall" },
  you: { pinyin: "Yǒu", hanzi: "酉", animal: "Hahn", element: "Metall" },
  xu: { pinyin: "Xū", hanzi: "戌", animal: "Hund", element: "Erde" },
  hai: { pinyin: "Hài", hanzi: "亥", animal: "Schwein", element: "Wasser" },
};

export function stemInfo(raw: string | null | undefined): StemInfo | null {
  if (!raw) return null;
  return STEMS[raw.trim().toLowerCase()] ?? null;
}

export function branchInfo(raw: string | null | undefined): BranchInfo | null {
  if (!raw) return null;
  return BRANCHES[raw.trim().toLowerCase()] ?? null;
}

// ---------------------------------------------------------------------------
// Tagestypen — die 5 Bezugskategorien der Tagessäule zum Day-Master
// ---------------------------------------------------------------------------

export type DayTypeId = "ressource" | "ausdruck" | "einfluss" | "struktur" | "gleichrang";

export interface DayType {
  id: DayTypeId;
  label: string;
  /** Ein Satz, der die Kapazitäts-Qualität des Tages beschreibt — Rahmen, kein Verdikt. */
  frame: string;
  /** Chance-Qualitäten für die Begegnungswahl (Angebote, keine Anweisungen). */
  chanceQualities: string[];
}

const DAY_TYPES: Record<DayTypeId, DayType> = {
  ressource: {
    id: "ressource",
    label: "Ressource-Tag",
    frame: "Die Tagessäule nährt deinen Day-Master — ein Rahmen, der Aufnehmen und Auftanken leichter macht als Durchsetzen.",
    chanceQualities: ["Aufnahmebereitschaft", "Ruhe", "Lernen"],
  },
  ausdruck: {
    id: "ausdruck",
    label: "Ausdruck-Tag",
    frame: "Dein Day-Master bringt heute etwas hervor — ein Rahmen, in dem Zeigen, Formulieren und Gestalten Rückenwind haben.",
    chanceQualities: ["Ausdruck", "Spielfreude", "Sichtbarkeit"],
  },
  einfluss: {
    id: "einfluss",
    label: "Einfluss-Tag",
    frame: "Die Tagessäule liegt im Zugriff deines Day-Masters — ein Rahmen für Anpacken, Verhandeln und konkretes Umsetzen.",
    chanceQualities: ["Initiative", "Verhandlung", "Fokus aufs Konkrete"],
  },
  struktur: {
    id: "struktur",
    label: "Struktur-Tag",
    frame: "Die Tagessäule fordert deinen Day-Master — ein Rahmen, in dem Grenzen, Regeln und Verantwortung spürbarer sind als sonst.",
    chanceQualities: ["Sorgfalt", "Verbindlichkeit", "klare Grenzen"],
  },
  gleichrang: {
    id: "gleichrang",
    label: "Gleichrang-Tag",
    frame: "Die Tagessäule gleicht deinem Day-Master — ein Rahmen, der Eigenes verstärkt: Rückenwind für Vertrautes, wenig Gegengewicht.",
    chanceQualities: ["Verbundenheit", "Beharrlichkeit", "Selbstvertrauen"],
  },
};

/**
 * Übersetzt den rohen relation_to_day_master-Wert der Engine (Ten-God-Gruppe,
 * englisch) in einen der 5 Tagestypen. Unbekannt → null (ehrlicher Missing-State).
 */
export function dayTypeFromRelation(raw: string | null | undefined): DayType | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  switch (key) {
    case "resource":
      return DAY_TYPES.ressource;
    case "output":
      return DAY_TYPES.ausdruck;
    case "wealth":
      return DAY_TYPES.einfluss;
    case "officer":
    case "influence":
    case "authority":
    case "control":
    case "power":
      return DAY_TYPES.struktur;
    case "companion":
    case "parallel":
    case "peer":
      return DAY_TYPES.gleichrang;
    default:
      return null;
  }
}

export function dayTypeById(id: DayTypeId): DayType {
  return DAY_TYPES[id];
}

export const ALL_DAY_TYPE_IDS: DayTypeId[] = ["ressource", "ausdruck", "einfluss", "struktur", "gleichrang"];

// ---------------------------------------------------------------------------
// Jieqi — die 24 Solarterme, deutsch
// ---------------------------------------------------------------------------

const JIEQI: Record<string, string> = {
  lichun: "Frühlingsanfang",
  yushui: "Regenwasser",
  jingzhe: "Erwachen der Insekten",
  chunfen: "Frühlings-Tagundnachtgleiche",
  qingming: "Klares Licht",
  guyu: "Saatregen",
  lixia: "Sommeranfang",
  xiaoman: "Kleine Fülle",
  mangzhong: "Körner mit Grannen",
  xiazhi: "Sommersonnenwende",
  xiaoshu: "Kleine Hitze",
  dashu: "Große Hitze",
  liqiu: "Herbstanfang",
  chushu: "Ende der Hitze",
  bailu: "Weißer Tau",
  qiufen: "Herbst-Tagundnachtgleiche",
  hanlu: "Kalter Tau",
  shuangjiang: "Reifbildung",
  lidong: "Winteranfang",
  xiaoxue: "Kleiner Schnee",
  daxue: "Großer Schnee",
  dongzhi: "Wintersonnenwende",
  xiaohan: "Kleine Kälte",
  dahan: "Große Kälte",
};

/** Deutsche Jieqi-Übersetzung; unbekannt → Pinyin unverändert (nie erfinden). */
export function jieqiLabel(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase().replace(/[\s_-]/g, "");
  return JIEQI[key] ? `${raw} — ${JIEQI[key]}` : raw;
}

// ---------------------------------------------------------------------------
// Tierkreiszeichen — Engine kann englisch ODER deutsch liefern
// ---------------------------------------------------------------------------

const SIGNS_EN_DE: Record<string, string> = {
  aries: "Widder",
  taurus: "Stier",
  gemini: "Zwillinge",
  cancer: "Krebs",
  leo: "Löwe",
  virgo: "Jungfrau",
  libra: "Waage",
  scorpio: "Skorpion",
  sagittarius: "Schütze",
  capricorn: "Steinbock",
  aquarius: "Wassermann",
  pisces: "Fische",
};

export function signLabel(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  return SIGNS_EN_DE[trimmed.toLowerCase()] ?? trimmed;
}

/** natal_focus-Werte der Engine → deutsche Archetyp-Labels (nur verankerte). */
const NATAL_FOCUS_DE: Record<string, string> = {
  sun: "Sonne",
  ascendant: "Aszendent",
  moon: "Mond",
};

export function natalFocusLabel(raw: string | null | undefined): string | null {
  if (!raw) return null;
  return NATAL_FOCUS_DE[raw.trim().toLowerCase()] ?? null;
}
