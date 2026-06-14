import React from "react";
import ScrollProgress from "../design/ScrollProgress";
import SectionShell from "../design/SectionShell";
import FusionHero from "./FusionHero";
import SpannungsPreview from "./SpannungsPreview";
import VisibleEngineBento from "./VisibleEngineBento";

// RD-2..5: the additive Observatorium landing. Composes the redesign sections; each RD
// iteration adds one. `onStart` flows into the live InputForm (App activeTab='input').
export default function LandingPage({ onStart }: { onStart?: () => void }) {
  return (
    <div data-testid="landing-page" className="relative">
      <ScrollProgress />

      <SectionShell className="pt-10">
        <FusionHero onStart={onStart} />
      </SectionShell>

      <SectionShell
        eyebrow="Probelauf"
        heading="Teste eine Spannung in 90 Sekunden"
        intro="Kein Konto nötig. Ein Demo-Durchlauf zeigt die Bewegung: aktive Spannung, eine Frage, deine Reaktion."
      >
        <SpannungsPreview onStart={onStart} />
      </SectionShell>

      <SectionShell
        eyebrow="Die Engine"
        heading="Sichtbar gerechnet, nicht behauptet"
        intro="Wie aus Geburtsdaten ein lesbares Spannungsfeld wird — sechs Schichten, jede mit einem konkreten Anker."
      >
        <VisibleEngineBento />
      </SectionShell>
    </div>
  );
}
