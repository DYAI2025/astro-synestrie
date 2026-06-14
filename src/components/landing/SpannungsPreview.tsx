import React from "react";
import GlassCard from "../design/GlassCard";
import { demoPreview } from "../../utils/visual/tensionFieldVisual";
import { ELEMENT_AXIS_MAP } from "../../utils/tensionNavigator";
import {
  MICRO_REACTIONS,
  reactionNote,
  MICRO_RESULT_LINE,
  type MicroPhase,
  type MicroReactionId,
} from "../../utils/visual/microExperience";

// RD-3: a 90-second DEMO teaser of the Spannungsnavigator interaction. Explicitly a demo
// (no compute, no data sent) — it ends with a CTA into the real flow. Result names a
// visible tension, never an identity. No SVG transforms; the only motion is a CSS spinner.

const PREVIEW = demoPreview();
const ACTIVE_AXIS = Object.values(ELEMENT_AXIS_MAP).find((a) => a.id === PREVIEW.activeAxis) ?? null;

export default function SpannungsPreview({ onStart }: { onStart?: () => void }) {
  const [phase, setPhase] = React.useState<MicroPhase>("intro");
  const [reaction, setReaction] = React.useState<MicroReactionId | null>(null);

  React.useEffect(() => {
    if (phase !== "calculating") return;
    const t = setTimeout(() => setPhase("question"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <GlassCard data-testid="spannungs-preview" className="p-6 sm:p-8 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-xl font-bold text-gold-light">90-Sekunden-Probelauf</h3>
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-fusion-blue/80 border border-fusion-blue/30 rounded-full px-2 py-0.5">
          Demo
        </span>
      </div>

      {phase === "intro" && (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-stone-400">
            Ein kurzer Durchlauf zeigt, wie der Spannungsnavigator arbeitet — als Demo, ohne deine
            Daten. Für dein echtes Feld brauchst du danach nur deine Geburtsdaten.
          </p>
          <button
            type="button"
            data-testid="spannungs-start"
            onClick={() => setPhase("calculating")}
            className="rounded-lg border border-fusion-blue/30 bg-fusion-blue/10 px-5 py-2.5 font-serif text-sm font-bold text-fusion-blue transition active:scale-95 cursor-pointer"
          >
            Demo starten
          </button>
          <p className="font-mono text-[9px] text-stone-400">Demo — es werden keine Daten gesendet oder gespeichert.</p>
        </div>
      )}

      {phase === "calculating" && (
        <div data-testid="spannungs-calculating" className="flex flex-col items-center gap-3 py-8">
          <div className="h-12 w-12 rounded-full border-2 border-gold-muted border-t-transparent animate-spin" />
          <p className="font-mono text-xs text-stone-400">Das Modell rechnet …</p>
        </div>
      )}

      {(phase === "question" || phase === "reacted") && ACTIVE_AXIS && (
        <div className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-gold-muted">
            Aktive Spannung: {ACTIVE_AXIS.poleA} <span className="text-fusion-blue">↔</span> {ACTIVE_AXIS.poleB}
          </p>
          <p data-testid="spannungs-question" className="font-serif text-lg leading-relaxed text-slate-100">
            {PREVIEW.question}
          </p>
          <p data-testid="spannungs-result" className="text-xs text-stone-400">{MICRO_RESULT_LINE}</p>

          <div className="flex flex-wrap gap-2">
            {MICRO_REACTIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                data-testid={`spannungs-reaction-${r.id}`}
                onClick={() => {
                  setReaction(r.id);
                  setPhase("reacted");
                }}
                className={`rounded-full border px-3 py-1.5 font-sans text-xs transition active:scale-95 cursor-pointer ${
                  reaction === r.id
                    ? "border-gold-light bg-gold-muted/20 text-gold-light"
                    : "border-gold-muted/25 text-stone-300 hover:border-gold-muted/50"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {phase === "reacted" && reaction && (
            <div className="space-y-3 pt-1">
              <p data-testid="spannungs-note" className="text-[13px] leading-relaxed text-stone-300">
                {reactionNote(reaction)}
              </p>
              <button
                type="button"
                data-testid="spannungs-cta"
                onClick={onStart}
                className="rounded-lg border border-gold-light/20 bg-gradient-to-r from-gold-muted to-gold-dark px-5 py-2.5 font-serif text-sm font-bold tracking-wide text-stone-950 transition active:scale-95 cursor-pointer glow-gold"
              >
                Jetzt für dich berechnen
              </button>
            </div>
          )}
          <p className="font-mono text-[9px] text-stone-400">Modellergebnis, keine Eigenschaft.</p>
        </div>
      )}
    </GlassCard>
  );
}
