// RD-3 micro-experience pure layer: the 90s demo teaser's reactions + result framing.
// The landing teaser is explicitly a DEMO (no real compute) — its result line names a
// visible tension, never an identity ("Diese Spannung wird sichtbar", not "Du bist").

export type MicroPhase = "intro" | "calculating" | "question" | "reacted";

export type MicroReactionId = "trifft" | "teilweise" | "widerstand" | "passt_nicht";

export interface MicroReaction {
  id: MicroReactionId;
  label: string;
}

export const MICRO_REACTIONS: MicroReaction[] = [
  { id: "trifft", label: "Trifft" },
  { id: "teilweise", label: "Teilweise" },
  { id: "widerstand", label: "Widerstand" },
  { id: "passt_nicht", label: "Passt nicht" },
];

const NOTES: Record<MicroReactionId, string> = {
  trifft: "Vertiefung möglich — diese Achse trägt für dich.",
  teilweise: "Teilweise — die Achse teilt sich in Nuancen.",
  widerstand: "Widerstand — der Gegenpol wird mitgeprüft.",
  passt_nicht: "Passt nicht — eine andere Achse käme als Nächstes.",
};

/** Note shown after a reaction — a reflection on the model, never a verdict on the person. */
export function reactionNote(id: MicroReactionId): string {
  return NOTES[id];
}

/** Result headline — a visible tension, NOT an identity claim. */
export const MICRO_RESULT_LINE = "Diese Spannung wird sichtbar.";
