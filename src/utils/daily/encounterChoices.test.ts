import { describe, it, expect } from "vitest";
import { encounterOffer } from "./encounterChoices";
import { dayTypeFromRelation } from "./baziLabels";

// Angebote, keine Befehle: kein Imperativ-Verdikt, keine Defizit-Sprache.
const FORBIDDEN = /du bist|du musst|dir fehlt|schicksal|diagnose|therapie|heilung/i;

describe("encounterOffer — Begegnungswahl", () => {
  const einfluss = dayTypeFromRelation("wealth")!;

  it("liefert genau 3 Qualitäten + Verzichts-Angebote + Datenanker", () => {
    const offer = encounterOffer(einfluss, "Holz")!;
    expect(offer.qualities).toHaveLength(3);
    expect(offer.vetoOptions.length).toBeGreaterThanOrEqual(2);
    expect(offer.anchor).toContain("Tagestyp");
  });

  it("webt die Tageselement-Qualität ein (deterministisch, ohne Duplikate)", () => {
    const offer = encounterOffer(einfluss, "Metall")!;
    expect(offer.qualities).toContain("Klarheit");
    expect(new Set(offer.qualities).size).toBe(3);
  });

  it("ohne Tageselement bleiben die Tagestyp-Qualitäten unverändert", () => {
    const offer = encounterOffer(einfluss, null)!;
    expect(offer.qualities).toEqual(einfluss.chanceQualities);
  });

  it("ohne Tagestyp gibt es KEIN Angebot (ehrlicher Missing-State)", () => {
    expect(encounterOffer(null, "Holz")).toBeNull();
  });

  it("alle Texte sind Angebote, keine Verdikte oder Defizit-Befehle", () => {
    for (const rel of ["resource", "output", "wealth", "officer", "companion"]) {
      const t = dayTypeFromRelation(rel)!;
      for (const el of ["Holz", "Feuer", "Erde", "Metall", "Wasser"] as const) {
        const offer = encounterOffer(t, el)!;
        for (const text of [...offer.qualities, ...offer.vetoOptions]) {
          expect(text, `${rel}/${el}`).not.toMatch(FORBIDDEN);
        }
      }
    }
  });
});
