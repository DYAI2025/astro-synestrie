import { describe, it, expect } from "vitest";
import { dominantElement, pickSpeaker, SpeakerInput } from "./dayTypeSelector";

const FULL: SpeakerInput = {
  dayMasterStem: "Xin",
  relationRaw: "wealth",
  natalFocus: ["sun", "ascendant"],
  elements: { Holz: 0.4992, Feuer: 0.4885, Erde: 0.3683, Metall: 0.282, Wasser: 0.5009 },
  lastReactionForType: null,
};

describe("dominantElement", () => {
  it("liefert das stärkste Element (Fixture: Wasser)", () => {
    expect(dominantElement(FULL.elements)).toBe("Wasser");
  });

  it("ist bei Gleichstand deterministisch (alphabetisch)", () => {
    expect(dominantElement({ Feuer: 0.5, Erde: 0.5, Holz: 0.1 })).toBe("Erde");
  });

  it("gibt bei < 2 validen Einträgen ehrlich null zurück", () => {
    expect(dominantElement({ Holz: 0.5 })).toBeNull();
    expect(dominantElement(null)).toBeNull();
    expect(dominantElement({ Holz: NaN, Feuer: 0.2 })).toBeNull();
  });
});

describe("pickSpeaker — Rat der Sechs, nur verankerte Archetypen", () => {
  it("Standard: Day-Master spricht zuerst (Ost = Kapazitätsrahmen)", () => {
    const s = pickSpeaker(FULL)!;
    expect(s.source).toBe("day_master");
    expect(s.label).toContain("Xīn");
    expect(s.label).toContain("Metall");
    expect(s.perspective).toBe("standard");
    expect(s.anchor).toContain("eastern.evidence");
  });

  it("Gegenseite-Wahl beim letzten gleichen Tagestyp wechselt garantiert die Seite (West zuerst)", () => {
    const s = pickSpeaker({ ...FULL, lastReactionForType: "gegenseite" })!;
    expect(s.source).toBe("west_archetyp");
    expect(s.label).toBe("Sonne");
    expect(s.perspective).toBe("gegenseite");
  });

  it("ohne Day-Master-Anker spricht der West-Archetyp", () => {
    const s = pickSpeaker({ ...FULL, dayMasterStem: null })!;
    expect(s.source).toBe("west_archetyp");
  });

  it("ohne West-Anker in Gegenseiten-Lage spricht das Dominante Element", () => {
    const s = pickSpeaker({ ...FULL, natalFocus: [], lastReactionForType: "gegenseite" })!;
    expect(s.source).toBe("dominantes_element");
    expect(s.label).toContain("Wasser");
  });

  it("ohne jeden Anker spricht NIEMAND — Schweigen statt Erfindung", () => {
    expect(
      pickSpeaker({ dayMasterStem: null, relationRaw: null, natalFocus: [], elements: null, lastReactionForType: null }),
    ).toBeNull();
  });

  it("unbekannte relation_to_day_master lässt den Day-Master schweigen (kein Tagestyp = kein Kapazitäts-Claim)", () => {
    const s = pickSpeaker({ ...FULL, relationRaw: "mystery" })!;
    expect(s.source).toBe("west_archetyp");
  });
});
