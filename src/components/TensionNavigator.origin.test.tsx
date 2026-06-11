import { describe, it, expect, afterEach } from "vitest";
import React from "react";
import TensionNavigator from "./TensionNavigator";
import { renderComponent, cleanupComponent, clickTestId } from "../test-utils/renderComponent";
import { normalizeFuFireProfile } from "../utils/fufireNormalizer";
import fusionFixture from "../__fixtures__/fufire/fusion.json";

const INPUT = { name: "Test", birthDate: "1990-06-15", birthTime: "14:30", birthPlaceLabel: "Berlin", gender: "Divers" };
afterEach(cleanupComponent);

describe("OriginLayer Kohärenz-Gauge (B-002)", () => {
  it("zeigt den kalibrierten Prozentwert, wenn vorhanden", () => {
    const vm = normalizeFuFireProfile({ fusion: fusionFixture }, INPUT, "fufire-orchestrated");
    const c = renderComponent(<TensionNavigator viewModel={vm} />);
    clickTestId(c, "tension-origin-toggle");
    expect(c.querySelector('[data-testid="fusion-coherence-value"]')?.textContent).toMatch(/\d+(\.\d+)?%/);
  });

  it("rendert 'nicht verfügbar' statt 0%/null%, wenn coherenceIndex null ist", () => {
    const vm = normalizeFuFireProfile(
      { fusion: {
          calibration: { h_raw: 0.5, h_baseline: 0.25, h_sigma: 0.25 },
          elemental_comparison: (fusionFixture as any).elemental_comparison
      } },
      INPUT, "fufire-orchestrated"
    );
    expect(vm.fusion.coherenceIndex).toBeNull();
    const c = renderComponent(<TensionNavigator viewModel={vm} />);
    clickTestId(c, "tension-origin-toggle");
    const missing = c.querySelector('[data-testid="fusion-coherence-missing"]');
    expect(missing).toBeTruthy();
    expect(missing!.textContent).toContain("nicht verfügbar");
    expect(c.querySelector('[data-testid="fusion-coherence-value"]')).toBeNull();
    expect(c.textContent).not.toContain("null%");
    expect(c.textContent).not.toContain("NaN");
  });
});
