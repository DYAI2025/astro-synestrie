import { describe, it, expect } from "vitest";
import { MICRO_REACTIONS, reactionNote, MICRO_RESULT_LINE, type MicroReactionId } from "./microExperience";

describe("microExperience (RD-3) — reactions + anti-reification framing", () => {
  it("has the four canonical reactions", () => {
    expect(MICRO_REACTIONS.map((r) => r.id)).toEqual(["trifft", "teilweise", "widerstand", "passt_nicht"]);
    expect(MICRO_REACTIONS.map((r) => r.label)).toEqual(["Trifft", "Teilweise", "Widerstand", "Passt nicht"]);
  });

  it("each reaction note is distinct, non-empty, and not a verdict", () => {
    const ids: MicroReactionId[] = ["trifft", "teilweise", "widerstand", "passt_nicht"];
    const notes = ids.map(reactionNote);
    expect(new Set(notes).size).toBe(4);
    const forbidden = /du bist|schicksal|diagnose|therapie|heilung|garantiert|beweist|kompatibel/i;
    for (const n of notes) {
      expect(n.length).toBeGreaterThan(8);
      expect(n).not.toMatch(forbidden);
    }
  });

  it("result line names a visible tension, never an identity", () => {
    expect(MICRO_RESULT_LINE).toContain("Spannung");
    expect(MICRO_RESULT_LINE).not.toMatch(/du bist/i);
  });
});
