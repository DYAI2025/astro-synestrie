import { describe, it, expect } from "vitest";
import {
  ALL_DAY_TYPE_IDS,
  branchInfo,
  dayTypeFromRelation,
  jieqiLabel,
  natalFocusLabel,
  signLabel,
  stemInfo,
} from "./baziLabels";

// Anti-Reifikation: Tagestyp-Frames sind Rahmen-Beschreibungen, keine Verdikte.
const FORBIDDEN = /du bist|schicksal|diagnose|therapie|heilung|garantiert|beweist/i;

describe("baziLabels", () => {
  it("kennt alle 10 Himmelsstämme mit Element, Polarität und Hanzi", () => {
    const stems = ["jia", "yi", "bing", "ding", "wu", "ji", "geng", "xin", "ren", "gui"];
    for (const s of stems) {
      const info = stemInfo(s);
      expect(info, s).not.toBeNull();
      expect(info!.hanzi.length).toBeGreaterThan(0);
      expect(["Holz", "Feuer", "Erde", "Metall", "Wasser"]).toContain(info!.element);
      expect(["Yang", "Yin"]).toContain(info!.polarity);
    }
    // Case-insensitiv, wie die Engine liefert ("Yi", "Xin")
    expect(stemInfo("Xin")?.element).toBe("Metall");
    expect(stemInfo("Yi")?.polarity).toBe("Yin");
  });

  it("kennt alle 12 Erdzweige mit Tier und Element", () => {
    const branches = ["zi", "chou", "yin", "mao", "chen", "si", "wu", "wei", "shen", "you", "xu", "hai"];
    for (const b of branches) {
      const info = branchInfo(b);
      expect(info, b).not.toBeNull();
      expect(info!.animal.length).toBeGreaterThan(0);
    }
    expect(branchInfo("Mao")?.animal).toBe("Hase");
  });

  it("gibt für unbekannte Stems/Branches ehrlich null zurück", () => {
    expect(stemInfo("quux")).toBeNull();
    expect(branchInfo("")).toBeNull();
    expect(stemInfo(null)).toBeNull();
  });

  it("mappt alle 5 Relationsgruppen auf Tagestypen — unbekannt ehrlich null", () => {
    expect(dayTypeFromRelation("resource")?.id).toBe("ressource");
    expect(dayTypeFromRelation("output")?.id).toBe("ausdruck");
    expect(dayTypeFromRelation("wealth")?.id).toBe("einfluss"); // Fixture-Wert
    expect(dayTypeFromRelation("officer")?.id).toBe("struktur");
    expect(dayTypeFromRelation("companion")?.id).toBe("gleichrang"); // Live-API-Wert
    expect(dayTypeFromRelation("unbekannte_relation")).toBeNull();
    expect(dayTypeFromRelation(null)).toBeNull();
  });

  it("Tagestyp-Frames tragen keine Verdikt-/Reifikationssprache und je 3 Chance-Qualitäten", () => {
    for (const id of ALL_DAY_TYPE_IDS) {
      const t = dayTypeFromRelation(
        { ressource: "resource", ausdruck: "output", einfluss: "wealth", struktur: "officer", gleichrang: "companion" }[id],
      )!;
      expect(t.frame, id).not.toMatch(FORBIDDEN);
      expect(t.chanceQualities).toHaveLength(3);
    }
  });

  it("übersetzt Jieqi mit Pinyin-Erhalt und lässt Unbekanntes unverändert", () => {
    expect(jieqiLabel("Mangzhong")).toBe("Mangzhong — Körner mit Grannen");
    expect(jieqiLabel("Xiaoshu")).toBe("Xiaoshu — Kleine Hitze");
    expect(jieqiLabel("NichtExistent")).toBe("NichtExistent");
    expect(jieqiLabel(null)).toBeNull();
  });

  it("übersetzt englische Tierkreiszeichen und lässt deutsche unverändert", () => {
    expect(signLabel("Gemini")).toBe("Zwillinge");
    expect(signLabel("Pisces")).toBe("Fische");
    expect(signLabel("Zwillinge")).toBe("Zwillinge");
  });

  it("kennt nur verankerte natal_focus-Werte", () => {
    expect(natalFocusLabel("sun")).toBe("Sonne");
    expect(natalFocusLabel("ascendant")).toBe("Aszendent");
    expect(natalFocusLabel("jupiter")).toBeNull();
  });
});
