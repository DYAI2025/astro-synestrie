Triage: Tief — Verb: integriere, schreibe, prüfe — Engpass: Ein realer MVP muss Lernflexibilität behalten, ohne Consent-, Profil-, Präzisions- oder Evidenzgrenzen zu verwischen — Modus: voll

# Ultrathink Craftsmanship Review

## Problemrahmen
- Ziel: coding-agent-fähiger Plan und PRD für einen realen Western-Synastry-Durchstich.
- Nicht-Ziel: vorzeitige Standardisierung in FuFirE oder öffentliche Produktionsfreigabe.
- Constraints: bestehende New_Bazi-/FuFirE-Mechaniken, persönliche Geburtsdaten, kein Score, Frontend-Ownership, TDD und realer Browser-Durchstich.
- Erfolgskriterium: reversible MVP-Architektur mit serverseitigem Eigentums-/Consent-Gate, real-boundary evidence und Human Gate vor Tiefenausbau.

## Optionen

| Option | Nutzen | Kosten | Risiko | Reversibilität |
|---|---|---|---|---|
| FuFirE-Endpunkt sofort | zentrale Logik | zwei Repos, früher Vertrag | ungeprüfte Regeln werden Standard | mittel |
| Alles im Browser | höchste Experimentiergeschwindigkeit | schwache Trust Boundary | Consent, Profileigentum und Clientdrift | hoch |
| Authentifiziertes BFF + Frontend-Produktanalyse | sichere Grenze plus Lernflexibilität | spätere Promotion nötig | Regeln bleiben zunächst clientgebunden | hoch |

## Empfehlung

Authentifiziertes BFF plus Frontend-Produktanalyse. Person A wird serverseitig über eine owner-gefilterte Profil-ID geladen; Partnerdaten bleiben flüchtig. FuFirE bleibt mathematische Quelle. Das erste Browser-E2E ist real-boundary, nicht gemockt.

## Gegenprüfung
- Stärkstes Gegenargument: Ein zentraler FuFirE-Endpunkt verhindert spätere Clientdrift.
- Antwort: Zeitmodell und Dimensionen besitzen noch keine Nutzer- oder Zweitconsumer-Evidenz. Versionierte Regeln plus `API-001` begrenzen das Risiko.
- Failure Mode: Wenn der Browser Rohdaten für Person A frei einreichen oder ein fremdes Profil referenzieren kann, wird Eigentum umgangen und ein Real-Flow beweist die falsche Grenze. Mitigation: `requireUserAuth`, owner-gefilterte Profilauflösung, 404, null Upstream-Aufrufe und Authz-Test.
- Zweiter Failure Mode: Wenn 2 von 9 Paaren bereits `provisional` ergeben, wirkt ein instabiles Mondsignal substanzieller als die Daten tragen. Mitigation: Mittelpunkt-Paar plus mindestens `ceil(totalPairs/2)` Coverage.
- Bias-Risiko: Sunk-cost-Bias zugunsten alter Synastrie; Overengineering durch API-Neubau; Visual Bias; Completion Pressure; Verwechslung von Testdoubles mit Realitätsbeleg.

## Craftsmanship-Prüfung
- Einfachheit: FuFirE unverändert, keine DB-Migration, kein LLM, eine neue additive BFF-Route.
- Kohäsion: BFF besitzt Auth/Owner/Consent/Rate-Limit/Transport; Frontend besitzt Produkttaxonomie.
- Explizitheit: Zeitmodi, Coverage, DST, Statusfelder, Rate-Limit und Stop-Regeln sind sichtbar.
- Testbarkeit: pure Zeit-/Stabilitätsmodule, Route-Vertrag, Authz/Rate-Limit und real-boundary getrennt.
- Operabilität: Feature Flag, PII-freie Request-ID, maximal sechs Calls, redigierte Evidence.
- Änderbarkeit: Regeln versioniert; API-Promotion getrennt.

## Konfabulations-Audit manuell
- Belegt: vorhandene Profile/Owner-Filter, Scorelogik, 12:00-Placeholder, FuFirE-Western-Endpunkt, Rate-Limiter und E2E-Pfad.
- Ableitbar: BFF-Transport/Frontend-Analyzer als kleinster robuster Schnitt.
- Annahme: konkrete Zeitfenster, Drei-Punkt-Sampling, Coverage-Schwelle und DST-Policy.
- Ungeprüft: Staging-Funktion, tatsächliche Usability und astrologische Qualität der Mappings.
- Nicht behauptet: Produktionsreife, rechtliche Consent-Verifikation, Markt- oder Umsatzwirkung.

## Verdict

`READY_FOR_CODING_AGENT_MVP` für TASK-001 bis TASK-013.
`ENVIRONMENT_REQUIRED` für TASK-014 und TASK-015.
`HUMAN_GATE_REQUIRED` vor TASK-017 und öffentlicher Freigabe.
