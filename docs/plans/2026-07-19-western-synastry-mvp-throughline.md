# Bazodiac Relationships — Western Synastry MVP Implementation Plan v2

Plan path: `docs/plans/2026-07-19-western-synastry-mvp-throughline.md`
Status: ready-for-execution
Owner/Executor: coding agent with human product, privacy and astrology review gates
Last updated: 2026-07-19
Supersedes: `2026-07-19-western-synastry-web-app.md`

<!-- GOAL_START -->
Goal: Real-Data-MVP-Durchstich für westliche Synastrie

Ziel. In der bestehenden New_Bazi-Web-App entsteht ein durchgängiger Western-Synastry-MVP: Ein angemeldeter Nutzer erstellt oder wählt sein Profil, erfasst die zweite Person, bestätigt deren Zustimmung als eigene Erklärung, startet eine echte FuFirE-Berechnung und erhält einen vereinfachten evidenzgebundenen Vergleich. Exakte, ungefähre und unbekannte Geburtszeiten werden unterschiedlich behandelt; Unsicherheit bleibt sichtbar. Die Oberfläche nutzt das angehängte Pastell-Olive-Farbschema und folgt einem ruhigen, klaren, Apple-artigen Interaktionsmuster.

Scope. Umsetzung im New_Bazi-Repository mit dem vorhandenen React/Vite/Express-BFF, den bestehenden Profilrouten und FuFirE `POST /v1/calculate/western`. Das BFF besitzt Validierung, Consent-Gate, Sampling-Orchestrierung, Secret-Schutz und Transportredaktion. Das Frontend besitzt Inter-Aspekte, Sample-Stabilität, Priorisierung und die vorläufige Dimensionslogik. FuFirE wird im MVP nicht geändert.

Bedingungen (hart).
- Der Server akzeptiert die Analyse nur mit `secondPersonConsentConfirmed: true`; dies ist eine Nutzerbestätigung, keine externe Verifikation.
- Der Real-Boundary-Akzeptanztest verwendet echte FuFirE-Antworten; Demo-, Placeholder- oder Mock-Ergebnisse dürfen diesen Nachweis nicht ersetzen.
- Es gibt keinen globalen Kompatibilitätsprozentsatz und kein Urteil über Beziehungsqualität oder Vorherbestimmung.
- Bei ungefähren Zeiten werden Start, Mittelpunkt und Ende eines versionierten Zeitfensters berechnet und als `stable`, `provisional` oder `unavailable` ausgewiesen.
- Produktdimensionen und Produktnormalisierung bleiben im Frontend; eine spätere API-Promotion ist ein getrenntes Ticket.
- Partnerdaten werden im MVP nicht automatisch dauerhaft gespeichert.
- TDD und ein realer End-to-End-Durchstich gehen dem Tiefenausbau voraus.

Akzeptanzkriterien.
- Ein angemeldeter Nutzer kann ein bestehendes Profil wählen oder über die vorhandene Profilroute speichern und anschließend eine Partneranalyse starten.
- Der BFF-Request mit fehlender oder falscher Zustimmungsbestätigung endet mit HTTP 422; bei `true` wird nur die Erklärung bestätigt, nicht eine externe Prüfung behauptet.
- Exact-, approximate- und unknown-Zeitmodi erzeugen nachvollziehbare Sample- und Precision-Daten.
- Der erste Ergebnis-Screen zeigt mindestens drei echte, berechnete Muster oder ehrliche Missing-States, ihre Körper/Aspekte, Stabilität und eine Reflexionsfrage.
- Der durchgehende E2E-Smoke trifft eine reale FuFirE-Grenze und verwendet keine gecannte Upstream-Antwort.
- `npm test`, `npm run lint`, `npm run build` und die fokussierten Playwright-Tests sind grün.
- Nach dem Durchstich liegt ein Usability-Protokoll vor; der Ausbau auf alle sechs Dimensionen beginnt erst nach Human Gate.

Explizit out-of-scope.
- Kein neuer FuFirE-Synastrie-Endpunkt im aktuellen MVP.
- Kein Payment-, Subscription- oder Entitlement-System.
- Keine automatische Speicherung des Partnerprofils oder des Analyseergebnisses.
- Kein LLM-generierter Beziehungstext im ersten Durchstich.
- Keine Composite-, Davison-, Transit-, Progressions-, BaZi- oder Wu-Xing-Analyse.
- Kein standardisiertes serverseitiges Premium-PDF vor dem Usability-Gate.

Done-Definition. Der MVP-Durchstich ist fertig, wenn der reale Flow Profil → Partner → Consent → FuFirE → vereinfachtes Ergebnis browser-live belegt ist, die Unsicherheitsregeln getestet sind, keine Fake-Daten den Nachweis tragen und der Nutzer das Usability-Gate für den nächsten Slice ausdrücklich entscheidet.

Reference-Doc: `docs/prd/prd_report.md`
<!-- GOAL_END -->

## Evidence and source boundary

### Provided evidence
- Nutzerauftrag und Designreferenz `assets/pastel-olive.jpg`.
- Nutzerentscheidungen DEC-20260719-01 bis DEC-20260719-08.
- Vorheriger Plan und zwei Reviewberichte, die Consent, Unknown-Time, Ownership, Directionality, Confidence, Taskgröße, E2E-Pfade und Usability als zentrale Punkte identifizierten.

### Inspected evidence
- New_Bazi enthält `POST /api/azodiac/synastry`, zwei FuFirE-Profilaufrufe und lokale Inter-Aspekt-Logik.
- `src/utils/synastry.ts` erzeugt den bisherigen Prozentwert aus Day-Master- und Sonnenzeichen-Elementen; dieser Pfad wird im neuen Produkt nicht verwendet.
- `src/utils/birthInputValidation.ts` setzt bei unbekannter Zeit aktuell `12:00`; der neue Relationship-Validator muss diese Vereinfachung kapseln und darf sie nicht als exakte Zeit behandeln.
- Bestehende authentifizierte Profile liegen hinter `/api/me/profiles`; Partnerprofile existieren ebenfalls, werden im MVP aber nicht automatisch genutzt oder gespeichert.
- Der FuFirE-Client besitzt `postWestern()` gegen `/v1/calculate/western`.
- Playwright liegt unter `tests/e2e/`.

### Not inspected / unavailable
- Keine laufende Staging- oder Produktionsinstanz wurde für diesen Plan aufgerufen.
- Keine echten Benutzerinterviews oder Nutzungsdaten für die neue Oberfläche liegen vor.
- Keine finale astrologische Freigabe der Mapping-Regeln liegt vor.
- Keine Kauf- oder Freischaltungslogik ist Teil dieses Scopes.

## Assumptions, missing information, open questions, blockers

### ASSUMPTION
- `time-band-v1` verwendet: Nacht 00:00–05:59, Morgen 06:00–08:59, Vormittag 09:00–11:59, Nachmittag 12:00–17:59, Abend 18:00–23:59.
- Der erste Usability-Gate umfasst fünf moderierte Sessions mit Personen aus der Zielgruppe.
- Der MVP startet auf Deutsch und legt Textschlüssel locale-fähig an.
- Das eigene Profil wird über bestehende authentifizierte Profilrouten gespeichert oder ausgewählt; Partnerdaten bleiben für den Analyse-Request flüchtig.

### MISSING
- Finaler Produktname und URL-Slug.
- Staging-URL und Test-Credentials für FuFirE und Supabase.
- Final freigegebene redaktionelle Texte und astrologische Rule-Review.
- Entscheidung über späteres Speichern, Teilen oder Bezahlen von Reports.

### OPEN QUESTION
- Nach dem Usability-Gate: Welche der sechs Dimensionen bleiben, werden umbenannt oder anders priorisiert?
- Nach dem Usability-Gate: Reicht Browser-Print oder wird ein serverseitiges PDF-Produkt benötigt?
- Nach einem zweiten Consumer: Welche stabilen Regeln werden über `API-001` in FuFirE promotet?

### BLOCKER
- Kein Blocker für Implementierung der MVP-Slices 1–4.
- Öffentliche Produktfreigabe bleibt blockiert, bis fachliche Texte, Datenschutztexte, realer Staging-Smoke und Human Acceptance vorliegen.
- Ausbau nach dem Durchstich bleibt blockiert, bis das Usability-Gate entschieden wurde.

## Decision incorporation and dependency changes

| Entscheidung | Planänderung | Abhängige Bereiche |
|---|---|---|
| DEC-01 Consent-Attestierung | Pflichtfeld, Textversion, 422 und null Upstream-Aufrufe | Request-Schema, Review-Screen, Route-Tests, Datenschutztext |
| DEC-02 Tageszeitfenster | `exact`/`approximate`/`unknown`, `time-band-v1`, transiente Präzisierung des eigenen Profils | Eingabe, Validator, Sampling, Methodiktext |
| DEC-03 Unsicherheitsbereich | Drei Samples, Coverage-Schwelle und sichtbare Status | Fan-out, Stabilitätsalgorithmus, Ergebnis-Badges |
| DEC-04 Dimensionen im Frontend | Kein FuFirE-Dimensionsprofil im MVP | Frontend-Konfiguration, `API-001` |
| DEC-05 Normalisierung im Frontend | BFF liefert Transportvertrag; keine Produkt-View-Model-Logik | Client-Schema, Analyzer-Ownership |
| DEC-06 Vertikale TDD-Slices | Ausführung entlang beobachtbaren Nutzerwerts | Task-Schnitt, PR-Strategie, Tests |
| DEC-07 Früher realer E2E | Kein gemockter Browser-MVP-Meilenstein | Staging-Credentials, Playwright, Evidence Ledger |
| DEC-08 Real-Data-Durchstich | MVP-Akzeptanz nur an echter Profil- und FuFirE-Grenze | Feature Gate, Usability Gate, kein Fake-Done-Claim |

Zusätzlich gelten `TECH-INV-01` bis `TECH-INV-04` aus dem Entscheidungsprotokoll: Rollenrichtung, getrennte Präzisionsfelder, serverseitige Profilauflösung und Compute-Rate-Limit.

## Product outcome and experience principles

### Primary user job
Eine Person möchte greifbare Hinweise auf Beziehungsdynamiken erhalten, ohne eine scheinobjektive Kompatibilitätsnote zu bekommen.

### MVP promise
- Echte Berechnung statt Demo-Ausgabe.
- Substanz vor Umfang: wenige, nachvollziehbare Muster.
- Unsicherheit sichtbar statt stiller 12:00-Scheinpräzision.
- Beidseitige Sprache statt Schuldzuweisung.
- Ein klarer Schritt pro Screen.

### First through-line screens
1. **Eigenes Profil:** anmelden, vorhandenes Profil wählen oder speichern.
2. **Zweite Person:** Geburtsdaten und Zeitmodus erfassen.
3. **Prüfung und Erklärung:** Daten prüfen, Zustimmung bestätigen.
4. **Berechnung:** reale FuFirE-Aufrufe, ehrlicher Fortschritt ohne Fake-Prozent.
5. **Vereinfachtes Ergebnis:** drei priorisierte Muster, Evidence-Chips, Stabilität, Reflexionsfrage.

### Post-usability expansion
- Alle sechs Dimensionen.
- Dimensionsdetail und Gegenlesart.
- Aspect Explorer.
- Methodik- und Provenance-Ansicht.
- Printansicht.

## Visual design system

| Token | Value | Verwendung |
|---|---:|---|
| `--rel-bg` | `#EFEBCE` | Hauptgrundfläche |
| `--rel-surface` | `#F8F5E5` | Karten und Eingaben |
| `--rel-olive` | `#A3A580` | Sekundärflächen |
| `--rel-olive-strong` | `#545842` | Primärbutton und kontraststarke Akzente |
| `--rel-clover` | `#D7CE93` | Hervorhebungen |
| `--rel-rose` | `#D8A48F` | emotionale Hinweise |
| `--rel-peach` | `#BB8588` | Fokus und Interaktion |
| `--rel-text` | `#292A23` | Haupttext |
| `--rel-text-muted` | `#626457` | Sekundärtext |
| `--rel-danger` | `#8B3F46` | Fehlerzustände |

Designregeln:
- Ein Hauptziel pro Screen, klare Zurücknavigation und erhaltene Eingaben.
- Touch-Ziele mindestens 44 × 44 CSS-Pixel.
- Farbe nie als einziger Informationsträger.
- `prefers-reduced-motion` respektieren.
- Pastellflächen erhalten dunkle Text- und Fokustokens; keine helle Schrift auf Peach/Rose für Fließtext.

## Requirements

| ID | Type | Statement | Source | Verification |
|---|---|---|---|---|
| REQ-F-001 | functional | Angemeldete Nutzer wählen oder erstellen ein eigenes Profil; der Analyse-Endpunkt erhält nur `personAProfileId` und löst das Profil serverseitig mit Owner-Filter auf. | repository + DEC-08 + TECH-INV-03 | Route-, Authz-, Component- und real-boundary Test |
| REQ-F-002 | functional | Partnerdaten werden für die Analyse erfasst und standardmäßig nicht gespeichert. | DEC-08 | DOM-, Route- und Storage-Review |
| REQ-F-003 | functional | Die Review-Seite verlangt `secondPersonConsentConfirmed=true` und eine Textversion. | DEC-01 | Given/When/Then Route-Test |
| REQ-F-004 | functional | Pro Person existieren `exact`, `approximate` und `unknown`; ein gespeichertes eigenes Profil mit unbekannter Zeit darf für den Request transient auf `approximate` verfeinert werden. | DEC-02 | Validator-, Owner- und Component-Test |
| REQ-F-005 | functional | Approximate und unknown erzeugen Start/Mitte/Ende-Samples; `provisional` benötigt das Mittelpunkt-Paar und mindestens `ceil(totalPairs/2)` Coverage. Der Mittelpunkt gilt nie als exakte Zeit. | DEC-03 | Unit- und Contract-Test |
| REQ-F-006 | functional | Das BFF ruft für jeden Samplepunkt den echten FuFirE-Western-Endpunkt auf und liefert einen redigierten Transportvertrag. | DEC-08 | Integration und real-boundary smoke |
| REQ-F-007 | functional | Das Frontend berechnet Inter-Aspekte, Stabilität und Produktpriorisierung aus dem Transportvertrag. | DEC-03/06 | Unit- und Component-Test |
| REQ-F-008 | functional | Der MVP zeigt mindestens drei berechnete Muster oder ehrliche Missing-States sowie eine Reflexionsfrage. | DEC-08 | Component- und E2E-Test |
| REQ-F-009 | functional | Es gibt keinen Gesamt-, Western- oder BaZi-Kompatibilitätsprozentsatz im neuen Flow. | product rule | DOM- und wording test |
| REQ-F-010 | functional | Fehler und Timeouts erhalten Eingaben und bieten Retry oder Korrektur. | product rule | Integration und E2E |
| REQ-F-011 | functional | Nach MVP-Durchstich wird ein Human Usability Gate dokumentiert, bevor Tiefenfeatures aktiviert werden. | DEC-08 | Gate-Protokoll |
| REQ-D-001 | data | `RelationshipTimeInput` ist eine diskriminierte Union für exact/approximate/unknown. | DEC-02 | Type- und validator test |
| REQ-D-002 | data | Evidence speichert Person-A-Körper, Person-B-Körper, Aspekt, Orb-Spanne und Sampleabdeckung. | DEC-04 | Schema- und symmetry test |
| REQ-D-003 | data | Statusfelder sind `dataPrecision`, `sampledStability`, `ruleStatus`, `interpretationStatus`; ein generisches `confidence` ist verboten. | DEC-05 | Type- und forbidden-field test |
| REQ-D-004 | data | Partnerprofil und Ergebnis werden im MVP nicht persistent geschrieben. | DEC-08 | DB-call spy und manual review |
| REQ-A-001 | architecture | FuFirE bleibt unverändert und liefert über `/v1/calculate/western` die astronomischen Rohberechnungen. | DEC-03/06 | Dependency review |
| REQ-A-002 | architecture | Das BFF besitzt Consent-Gate, Sampling-Orchestrierung, Secret-Schutz, Fehler und Transportredaktion. | DEC-01/02/06 | Route tests |
| REQ-A-003 | architecture | Das Frontend besitzt Dimensionskonfiguration, Inter-Aspekt-Aggregation, Stability und Priorisierung. | DEC-03/06 | Import-boundary review |
| REQ-A-004 | architecture | Die bestehende Score-Logik `compareProfiles()` wird im neuen Flow nicht importiert. | repository finding | Static import test |
| REQ-A-005 | architecture | Stabile Regeln werden erst über das separate Backlog-Ticket `API-001` in FuFirE verschoben. | DEC-03/06 | Artifact review |
| REQ-NF-001 | non-functional | Kernflow ist bei 320, 768 und 1440 Pixeln ohne horizontales Scrollen nutzbar. | user request | Playwright viewport matrix |
| REQ-NF-002 | non-functional | Kernflow ist per Tastatur bedienbar und besitzt sichtbaren Fokus. | user request | axe + keyboard review |
| REQ-NF-003 | non-functional | Sample-Fan-out ist auf höchstens drei FuFirE-Aufrufe pro Person begrenzt. | simplicity constraint | route test |
| REQ-NF-004 | non-functional | Loading-State erscheint sofort; Timeout- und Retry-Verhalten nutzen bestehende BFF-Konfiguration. | repository | component/integration test |
| REQ-NF-005 | non-functional | Generierte Samples behandeln DST explizit: exakte nicht existente Lokalzeit wird abgelehnt; generierte Samples dürfen mit `shift_forward` korrigiert werden, müssen die Korrektur aber als Warning transportieren. Ambige Zeiten verwenden die dokumentierte `earlier`-Policy und bleiben sichtbar. | safe implementation assumption | DST boundary tests and warning review |
| REQ-S-001 | security | FuFirE- und Supabase-Secrets bleiben serverseitig. | repository | bundle/env inspection |
| REQ-S-002 | security | Consent-Assertion fehlt oder ist false: HTTP 422, kein Upstream-Aufruf. | DEC-01 | route test |
| REQ-S-003 | security | Logs enthalten keine Namen, Daten, Zeiten, Orte, Koordinaten oder kompletten Upstream-Payloads. | privacy gate | log capture test |
| REQ-S-004 | security | Der Relationship-Endpunkt erfordert Auth, lädt `personAProfileId` mit `id + user_id` und antwortet bei fremdem/fehlendem Profil mit 404 ohne Upstream-Aufruf; Partnerdaten werden nicht gespeichert. | repository + DEC-08 + TECH-INV-03 | authz/integration test |
| REQ-S-005 | security | `/api/relationships` wird in den bestehenden Compute-Rate-Limiter aufgenommen; Rate-Limit endet mit 429 vor weiterem FuFirE-Fan-out. | repository + TECH-INV-04 | ratelimit route test |
| REQ-O-001 | observability | Request-ID, Dauer, Samplezahl, Status und Upstream-Fehler werden ohne PII protokolliert. | operation need | log capture test |
| REQ-DOC-001 | documentation | Entscheidungen, Zeitfensterprofil, Grenzen, Testevidenz und API-Promotion-Ticket werden dokumentiert. | governance | artifact review |

### Core Given/When/Then acceptance scenarios

#### AC-001 — Consent assertion
Given ein authentifizierter Nutzer, ein eigenes Profil und valide Partnerdaten,
When `secondPersonConsentConfirmed` fehlt oder `false` ist,
Then antwortet das BFF mit HTTP 422,
And es erfolgt kein Profil-Fan-out und kein FuFirE-Aufruf,
And die Antwort behauptet keine unabhängige Zustimmungskontrolle.

#### AC-002 — Owned profile boundary
Given der Nutzer ist authentifiziert,
When er eine eigene `personAProfileId` einreicht,
Then lädt das BFF das Profil serverseitig über `id + user_id`.
When die ID fehlt, ungültig oder fremd ist,
Then antwortet das BFF mit 404,
And es erfolgt kein FuFirE-Aufruf.

#### AC-003 — Exact time
Given beide Personen verwenden eine valide exakte Uhrzeit,
When die Analyse startet,
Then erzeugt das BFF je Person genau einen Western-Chart-Sample,
And Häuser und Achsen dürfen als `exact` transportiert werden.

#### AC-004 — Approximate time
Given eine Person wählt `approximate` mit `afternoon`,
When die Analyse startet,
Then verwendet das BFF Start, Mittelpunkt und Ende von `time-band-v1`,
And das Frontend klassifiziert `stable`, `provisional` oder `unavailable`,
And `provisional` verlangt das Mittelpunkt-Paar plus mindestens `ceil(totalPairs/2)` Sample-Coverage,
And der Mittelpunkt wird nicht als gemessene Geburtszeit bezeichnet.

#### AC-005 — Unknown time
Given eine Person wählt `unknown`,
When die Analyse startet,
Then werden 00:00, 12:00 und 23:59 als begrenzte Tages-Samples berechnet,
And Häuser und Achsen bleiben `unavailable`,
And nur stabile oder coverage-geprüfte provisorische Signale können Kernaussagen werden.

#### AC-006 — DST edge behavior
Given ein Sample fällt in eine nicht existente oder ambige lokale Zeit,
When der Request gebaut wird,
Then wird eine exakte nicht existente Eingabe abgelehnt,
And eine generierte Sample-Korrektur oder Ambiguitätsentscheidung wird als Warning und Policy im Transport ausgewiesen,
And sie wird nicht still als exakte Beobachtung behandelt.

#### AC-007 — Real-data through-line
Given ein authentifiziertes, eigenes Profil und valide Partnerdaten,
When der Playwright Real-Boundary-Smoke ausgeführt wird,
Then laufen echte Profil-, BFF- und FuFirE-Aufrufe,
And das Ergebnis enthält berechnete Körperpositionen und Inter-Aspekte oder einen ehrlichen Missing-State,
And keine Route-Interception, Fixture, Demo- oder Mock-Antwort trägt den Acceptance-Claim.

#### AC-008 — No score
Given das Ergebnis ist sichtbar,
When DOM und Response geprüft werden,
Then gibt es keinen globalen Prozentwert und keinen Import von `compareProfiles()` im neuen Flow.

#### AC-009 — Evidence and statuses
Given ein Muster wird angezeigt,
When der Nutzer Details öffnet,
Then sind beide Körperrollen, Aspekttyp, Orb oder Orb-Spanne, Sampleabdeckung, `dataPrecision`, `sampledStability`, `ruleStatus` und `interpretationStatus` sichtbar.

#### AC-010 — Compute rate limit
Given die konfigurierte Compute-Grenze ist überschritten,
When ein weiterer Relationship-Request eingeht,
Then antwortet das BFF mit HTTP 429,
And es erfolgt kein weiterer FuFirE-Fan-out.

#### AC-011 — Usability gate
Given der reale Durchstich ist belegt,
When die moderierten Sessions abgeschlossen sind,
Then werden Abschluss, Hilfestellungen, Missverständnisse und Vertrauensfragen dokumentiert,
And der Nutzer entscheidet über den Ausbau auf sechs Dimensionen.

## Architecture and file boundaries

### Current architecture facts

```text
React UI
  -> Same-Origin Express BFF
    -> FuFirEClient
      -> /v1/calculate/western
  -> lokale Synastrie-Helfer
```

Der aktuelle `/api/azodiac/synastry`-Pfad mischt westliche, BaZi- und Fusionsergebnisse und liefert einen groben Score. Er bleibt während der MVP-Entwicklung bestehen, wird aber vom neuen Flow nicht verwendet.

### Target MVP architecture

```text
Relationship UI
  -> POST /api/relationships/western-synastry (authenticated + compute-rate-limited)
     -> strict request and consent validation
     -> owner-filtered lookup of personAProfileId
     -> transient Person-A time refinement when stored time is unknown
     -> time-band sample expansion and explicit DST policy
     -> max. 3 x FuFirE postWestern per person
     -> redacted WesternSynastryTransportResponse
  -> frontend relationshipAnalyzer
     -> inter-aspect geometry
     -> sampled stability aggregation
     -> role-preserving evidence
     -> product dimension mapping v1
     -> top-pattern selection
  -> simplified result UI
```

### Responsibility boundaries

| Layer | Owns | Must not own |
|---|---|---|
| FuFirE | Western chart mathematics, houses, angles, bodies, provenance, precision | Product dimensions, consent copy, UI priorities |
| New_Bazi BFF | Required auth, profile ownership, request validation, consent assertion, compute rate limit, sampling, DST policy, retries, redaction, correlation | Relationship judgment, dimension naming, product prose |
| New_Bazi frontend domain | Inter-aspects, sample aggregation, stability, dimensions, prioritization, evidence-linked templates | Secrets, direct FuFirE calls, persistence |
| UI | Guided flow, status, detail disclosure, palette, accessibility | New astrology calculations outside domain modules |

### Files and modules

Existing files to modify:
- `src/api/bazodiacClient.ts`
- `src/server/app.ts`
- `src/App.tsx`
- `src/components/PageShell.tsx`
- `src/index.css`

Existing files to reuse without score import:
- `src/utils/interAspects.ts`
- `src/utils/interAspects.test.ts`
- `src/utils/fufireClient.ts`
- `src/utils/fufirePayloadMappers.ts`
- `src/components/PlaceAutocomplete.tsx`
- `src/components/AccountMenu.tsx`

New files:
- `src/types/relationship.ts`
- `src/utils/relationship/timeBands.ts`
- `src/utils/relationship/relationshipInputValidation.ts`
- `src/utils/relationship/sampleStability.ts`
- `src/utils/relationship/relationshipAnalyzer.ts`
- `src/content/relationship/dimensions.ts`
- `src/api/relationshipClient.ts`
- `src/components/relationship/RelationshipEntry.tsx`
- `src/components/relationship/ProfileStep.tsx`
- `src/components/relationship/PartnerStep.tsx`
- `src/components/relationship/ReviewConsentStep.tsx`
- `src/components/relationship/RelationshipProgress.tsx`
- `src/components/relationship/RelationshipMvpResult.tsx`
- `src/styles/relationship.css`
- corresponding colocated tests
- `tests/e2e/relationship-real-boundary.spec.ts`

### Prohibited changes
- Do not modify FuFirE in this MVP.
- Do not import `compareProfiles()` or render the current synastry score.
- Do not add automatic partner persistence.
- Do not use a generic `confidence` field.
- Do not let the browser call FuFirE directly.
- Do not add a mocked browser-E2E as the MVP milestone; the first MVP browser-E2E must be real-boundary.
- Do not delete the existing Synastry tab before human acceptance.

## API and data contract

### BFF endpoint

`POST /api/relationships/western-synastry`

Hard boundary:
- Route uses `requireUserAuth`.
- Route is included in the existing compute-rate-limiter.
- Person A is referenced by owned profile ID; raw Person-A birth data are not accepted as an alternative path.
- Partner data are request-scoped and are not persisted.

Request:

```json
{
  "schemaVersion": "western-synastry-request-v1",
  "personA": {
    "profileId": "6f2f4cf3-6e32-4a63-a930-2f702266c1d8",
    "timeOverride": {
      "mode": "approximate",
      "band": "morning",
      "bandProfileVersion": "time-band-v1"
    }
  },
  "personB": {
    "name": "B",
    "birthDate": "1992-10-04",
    "placeId": "...",
    "birthPlaceLabel": "München",
    "lat": 48.137,
    "lon": 11.575,
    "tz": "Europe/Berlin",
    "time": {
      "mode": "approximate",
      "band": "morning",
      "bandProfileVersion": "time-band-v1"
    }
  },
  "consentAssertion": {
    "secondPersonConsentConfirmed": true,
    "textVersion": "relationship-consent-v1"
  },
  "options": { "zodiacMode": "tropical" }
}
```

`personA.timeOverride` is optional. It is accepted only when the stored profile has `timeKnown=false`; it may select `approximate` or retain `unknown`. It never silently mutates the stored profile.

Response:

```json
{
  "schemaVersion": "western-synastry-transport-v1",
  "requestId": "...",
  "consentAcknowledgement": {
    "assertionReceived": true,
    "textVersion": "relationship-consent-v1",
    "verificationStatus": "user_attested_not_independently_verified"
  },
  "subjects": {
    "personA": {
      "subjectId": "person-a",
      "timeMode": "approximate",
      "sampleProfileVersion": "time-band-v1",
      "samples": [
        {
          "sampleId": "person-a-midpoint",
          "sampleRole": "midpoint",
          "bodies": {},
          "houses": null,
          "angles": null,
          "precision": {},
          "provenance": {},
          "timeResolution": {
            "ambiguousTimePolicy": "earlier",
            "nonexistentTimePolicy": "shift_forward",
            "adjusted": false
          }
        }
      ]
    },
    "personB": {
      "subjectId": "person-b",
      "timeMode": "approximate",
      "sampleProfileVersion": "time-band-v1",
      "samples": []
    }
  },
  "warnings": [],
  "provenance": {
    "upstream": "/v1/calculate/western",
    "zodiacMode": "tropical"
  }
}
```

Transport rules:
- Unknown, malformed or foreign `profileId` returns 404 without upstream calls.
- Names and raw dates are not echoed; the frontend owns display labels.
- Approximate/unknown samples carry `sampleRole`, not a claim of exact birth time.
- BFF strips unused natal aspects and request echoes where safe.
- Upstream errors are normalized; no complete payload enters logs.
- DST adjustments and ambiguity policies remain visible in sample metadata/warnings.

### Frontend evidence model

```ts
type SampledStability = "stable" | "provisional" | "unavailable";
type DataPrecision = "exact" | "bounded_time_window" | "date_only";
type RuleStatus = "draft" | "domain_reviewed";
type InterpretationStatus = "symbolic_hypothesis";

interface RelationshipAspectEvidence {
  id: string;
  personABody: string;
  personBBody: string;
  aspectType: string;
  exactAngle: number;
  orbMin: number;
  orbMax: number;
  samplePairsObserved: number;
  samplePairsTotal: number;
  dataPrecision: DataPrecision;
  sampledStability: SampledStability;
  ruleStatus: RuleStatus;
  interpretationStatus: InterpretationStatus;
}
```

### Sampling algorithm v1

1. `exact`: one sample at the entered time.
2. `approximate`: start, midpoint and end of selected `time-band-v1` interval.
3. `unknown`: 00:00, 12:00 and 23:59 local civil time.
4. Resolve Person A from the owned profile. If its stored time is unknown, apply an optional request-scoped band override without persisting it.
5. Generate at most three Western charts per person, then compute the cartesian product, maximum nine chart pairs.
6. Identify evidence by directed body roles plus aspect type: `personABody`, `personBBody`, `aspectType`.
7. `stable`: the same aspect type exists in every sampled pair.
8. `provisional`: the same aspect exists in the canonical center pair and in at least `ceil(samplePairsTotal / 2)` pairs, but not all.
9. `unavailable`: all other cases; never used as a headline.
10. Record orb minimum/maximum and observed/total pair count.
11. Houses and angles are available only when both persons are `exact`.
12. Exact nonexistent local time fails validation. Generated samples may use `shift_forward`; ambiguous time uses `earlier`; either condition is transported as warning/policy.
13. The UI calls this sampled uncertainty, not continuous-interval proof.

## Implementation phases

### Phase 0 — Baseline and decision freeze
- Characterize existing score and current route without changing behavior.
- Add decision record and feature flag.
- Freeze request/response types and time-band config.

### Phase 1 — Vertical Slice A: profile, partner and consent
User value: A user can prepare a real analysis request without losing data and understands the consent assertion.

### Phase 2 — Vertical Slice B: real calculation through-line
User value: The app reaches FuFirE with real input and returns real chart samples without mock results.

### Phase 3 — Vertical Slice C: simplified evidence result
User value: The user sees three traceable patterns and honest uncertainty.

### Phase 4 — Usability Gate
User value: The team learns whether the flow, language and uncertainty model are understandable before deepening.

### Phase 5 — Conditional depth expansion
Only after Human Gate: six dimensions, detail, explorer, method and print.

## Tasks

### TASK-001: Freeze the current relationship baseline

Objective: Preserve the existing route and score behavior as a regression boundary while proving the new flow is additive.
Requirement links: REQ-A-004, REQ-DOC-001
Files/modules:
- Inspect: `src/server/app.ts`, `src/utils/synastry.ts`, `src/components/Synastry.tsx`
- Modify/Test: existing route tests plus `src/__tests__/synastryWording.test.ts`

Steps:
1. Add a focused test that records the current `/api/azodiac/synastry` response shape and score presence.
2. Run the test and record baseline output.
3. Add a test that the future relationship entry does not import `compareProfiles()`.
4. Do not change the old route in this task.

Acceptance criteria:
- Old behavior is characterized, not endorsed.
- New-flow import boundary is testable.

Validation:
- Command: `npm test -- src/server/app.test.ts src/__tests__/synastryWording.test.ts`
- Expected result: baseline tests pass.

Rollback note: Revert only new tests; no runtime behavior changed.

### TASK-002: Define relationship types, time bands and status vocabulary

Objective: Create the exact product contract before UI or route implementation.
Requirement links: REQ-F-003, REQ-F-004, REQ-F-005, REQ-D-001, REQ-D-003, REQ-NF-005
Files/modules:
- Create: `src/types/relationship.ts`
- Create: `src/utils/relationship/timeBands.ts`
- Test: `src/utils/relationship/timeBands.test.ts`

Steps:
1. Write failing tests for exact/approximate/unknown unions, `time-band-v1`, start/mid/end anchors and forbidden generic `confidence`.
2. Write coverage tests for `stable`, midpoint-plus-`ceil(total/2)` `provisional`, and `unavailable`.
3. Add DST-policy cases for exact nonexistent local time versus generated samples.
4. Implement minimal types and pure functions only after the tests fail for the intended reason.

Acceptance criteria:
- Every time mode has one valid shape and invalid combinations fail validation.
- Sampling and coverage thresholds are deterministic for 1, 3 and 9 sample pairs.
- DST policy is explicit rather than inherited silently.

Validation:
- Command: `npm test -- src/utils/relationship/timeBands.test.ts`
- Expected result: all time-band, threshold and DST-policy tests pass.

Rollback note: Remove the isolated module and tests.

### TASK-003: Add relationship-specific request validation

Objective: Validate profile reference, partner data, time modes and consent without changing global birth-input behavior.
Requirement links: REQ-F-003, REQ-F-004, REQ-S-002, REQ-S-004
Files/modules:
- Create: `src/utils/relationship/relationshipInputValidation.ts`
- Test: `src/utils/relationship/relationshipInputValidation.test.ts`
- Reuse: common date/place checks from `src/utils/birthInputValidation.ts` where safe

Steps:
1. Write failing tests for invalid profile UUID, missing/false consent, unsupported consent version, invalid bands, exact without time, and unknown with forbidden exact value.
2. Specify that Person-A time override is allowed only for a stored unknown-time profile and is request-scoped.
3. Verify missing/false consent and malformed input short-circuit before profile lookup or upstream action.
4. Implement a strict relationship validator; do not overload the existing `timeKnown` boolean.
5. Return field-addressable errors without echoing complete birth data.

Acceptance criteria:
- Invalid consent is a deterministic 422 candidate.
- Person A is represented by profile ID, not a second raw birth-data path.
- No 12:00 placeholder is presented as exact input.

Validation:
- Command: `npm test -- src/utils/relationship/relationshipInputValidation.test.ts`
- Expected result: validation matrix passes.

Rollback note: Delete the isolated validator; existing flow remains untouched.

### TASK-004: Build own-profile selection, creation and transient time refinement

Objective: Let an authenticated user select or create the owned profile used as Person A and refine unknown time only for this analysis.
Requirement links: REQ-F-001, REQ-F-004, REQ-S-004
Files/modules:
- Create: `src/components/relationship/ProfileStep.tsx`
- Create: `src/api/relationshipClient.ts`
- Reuse: `/api/me/profiles`, Supabase session handling from `AccountMenu.tsx`
- Test: `src/components/relationship/ProfileStep.test.tsx`

Steps:
1. Write component tests for logged-out, empty-list, existing-profile, create-profile and unknown-time refinement states.
2. Implement token-aware profile loading and creation through existing routes.
3. Submit only the selected profile ID plus optional request-scoped time override to the relationship route.
4. Preserve selection and refinement across back navigation.
5. Do not mutate the stored profile when a time band is chosen for the relationship analysis.

Acceptance criteria:
- An authenticated user can select a real owned profile or create one.
- An unknown-time profile can remain unknown or receive a transient approximate band.
- Logged-out state has no demo-profile fallback.

Validation:
- Command: `npm test -- src/components/relationship/ProfileStep.test.tsx src/server/app.profiles.test.ts`
- Expected result: profile and refinement behaviors pass.

Rollback note: Remove new component/client methods; existing AccountMenu remains unchanged.

### TASK-005: Build partner time-mode input

Objective: Capture Person B with exact, approximate or unknown time using progressive disclosure.
Requirement links: REQ-F-002, REQ-F-004, REQ-NF-001, REQ-NF-002
Files/modules:
- Create: `src/components/relationship/PartnerStep.tsx`
- Reuse: `src/components/PlaceAutocomplete.tsx`
- Test: `src/components/relationship/PartnerStep.test.tsx`

Steps:
1. Write failing tests for mode switching, band selection, retained place data and inline errors.
2. Implement segmented time mode control.
3. Show exact time input only for `exact`; band cards only for `approximate`.
4. Explain that `unknown` uses a broad sampled range and reduces certainty.

Acceptance criteria:
- Each mode exposes only relevant fields.
- Switching modes removes incompatible stale values from the submitted model.

Validation:
- Command: `npm test -- src/components/relationship/PartnerStep.test.tsx`
- Expected result: mode and validation tests pass.

Rollback note: Remove the isolated component.

### TASK-006: Build review and consent assertion step

Objective: Make the non-verifiable nature of consent explicit and enforce the assertion before submit.
Requirement links: REQ-F-003, REQ-S-002
Files/modules:
- Create: `src/components/relationship/ReviewConsentStep.tsx`
- Test: `src/components/relationship/ReviewConsentStep.test.tsx`

Steps:
1. Write tests that submit stays disabled until the checkbox is checked.
2. Render both data summaries and precision modes without exposing unnecessary technical detail.
3. Use versioned consent copy `relationship-consent-v1`.
4. Include wording: user confirms; application does not independently verify.

Acceptance criteria:
- No analysis request can be emitted by the component without the assertion.
- Copy does not misrepresent verification.

Validation:
- Command: `npm test -- src/components/relationship/ReviewConsentStep.test.tsx`
- Expected result: consent UI tests pass.

Rollback note: Remove component; no server state affected.

### TASK-007: Add authenticated BFF route contract tests first

Objective: Specify the profile-ownership, consent, rate-limit and orchestration boundary before implementation.
Requirement links: REQ-F-005, REQ-F-006, REQ-A-002, REQ-S-002, REQ-S-003, REQ-S-004, REQ-S-005
Files/modules:
- Create: `src/server/app.relationship.test.ts`
- Modify later: `src/server/app.ts`

Steps:
1. Write failing tests for 401 without auth.
2. Write failing tests for 404 on missing/foreign profile ID and zero FuFirE calls.
3. Write failing tests for 422 consent rejection and zero FuFirE calls.
4. Write failing tests for exact=1, approximate=3 and unknown=3 Western calls per affected person, maximum six total.
5. Add a dedicated rate-limit test proving 429 prevents further fan-out.
6. Assert no raw birth payload enters captured logs and no dimension/view-model appears in the response.

Acceptance criteria:
- Contract tests fail for the expected missing route before implementation.
- Auth, owner filter, call caps, rate limit and privacy rules are explicit.

Validation:
- Command: `npm test -- src/server/app.relationship.test.ts src/server/app.ratelimit.test.ts`
- Expected result before implementation: focused, documented failures.

Rollback note: Remove only the new tests.

### TASK-008: Implement the authenticated relationship BFF route

Objective: Resolve the owned profile and orchestrate validated real FuFirE Western samples behind consent and compute controls.
Requirement links: REQ-F-005, REQ-F-006, REQ-A-001, REQ-A-002, REQ-S-001, REQ-S-003, REQ-S-004, REQ-S-005
Files/modules:
- Modify: `src/server/app.ts`
- Reuse: `src/utils/fufireClient.ts`, `src/utils/fufirePayloadMappers.ts`
- Create if needed: `src/server/relationshipTransport.ts`
- Test: `src/server/app.relationship.test.ts`, `src/server/app.ratelimit.test.ts`

Steps:
1. Add `/api/relationships` to the existing compute limiter and protect the new route with `requireUserAuth`.
2. Load Person A with `profileId + req.userId`; return 404 without revealing ownership details when absent.
3. Apply an allowed request-scoped time override only to stored unknown-time profiles.
4. Expand sample times, apply explicit DST policies and call `postWestern()` with maximum concurrency six.
5. Preserve upstream precision/provenance and DST warnings; strip unused request echoes.
6. Normalize errors through existing `sendError` behavior.
7. Emit only PII-free request ID, sample count, duration and status.

Acceptance criteria:
- Contract, authz and rate-limit tests pass.
- Missing consent or foreign profile never reaches FuFirE.
- No secret or raw birth payload appears in browser response or logs.

Validation:
- Command: `npm test -- src/server/app.relationship.test.ts src/server/app.ratelimit.test.ts && npm run lint`
- Expected result: route, authz, rate-limit and type checks pass.

Rollback note: Remove the new route/helper and limiter path; old route remains.

### TASK-009: Add client transport validation

Objective: Fetch the BFF transport response and reject malformed data before product analysis.
Requirement links: REQ-A-003, REQ-D-001, REQ-D-003
Files/modules:
- Modify: `src/api/relationshipClient.ts`
- Test: `src/api/relationshipClient.test.ts`

Steps:
1. Write failing tests for accepted schema version, missing samples, unknown statuses and error mapping.
2. Implement lightweight runtime guards without adding a dependency unless justified.
3. Keep display names in local UI state rather than relying on response echo.

Acceptance criteria:
- Malformed transport never reaches the analyzer.
- BFF errors retain actionable fields.

Validation:
- Command: `npm test -- src/api/relationshipClient.test.ts`
- Expected result: transport tests pass.

Rollback note: Revert new client module.

### TASK-010: Implement sampled aspect stability

Objective: Aggregate real chart samples into role-preserving stable/provisional/unavailable evidence.
Requirement links: REQ-F-007, REQ-D-002, REQ-D-003
Files/modules:
- Create: `src/utils/relationship/sampleStability.ts`
- Reuse: `src/utils/interAspects.ts`
- Test: `src/utils/relationship/sampleStability.test.ts`

Steps:
1. Write tests for exact/exact, exact/approximate, approximate/approximate and unknown combinations.
2. Verify `stable` requires every pair and `provisional` requires the canonical midpoint pair plus at least `ceil(totalPairs/2)` coverage.
3. Add tests separating geometric symmetry from person/body role preservation.
4. Implement cartesian pairing, candidate aggregation, orb min/max and observed/total count.
5. Exclude houses/angles from non-exact evidence and prohibit generic `confidence`.

Acceptance criteria:
- Classifications match the documented coverage rules for 1, 3 and 9 pairs.
- Swapping persons preserves geometry but swaps display roles.

Validation:
- Command: `npm test -- src/utils/interAspects.test.ts src/utils/relationship/sampleStability.test.ts`
- Expected result: geometry, role and coverage tests pass.

Rollback note: Remove isolated analyzer; transport remains usable.

### TASK-011: Implement the simplified product analyzer

Objective: Select up to three meaningful patterns and one reflection question from evidence without a score.
Requirement links: REQ-F-007, REQ-F-008, REQ-F-009, REQ-A-003, REQ-A-004
Files/modules:
- Create: `src/utils/relationship/relationshipAnalyzer.ts`
- Create: `src/content/relationship/dimensions.ts`
- Test: `src/utils/relationship/relationshipAnalyzer.test.ts`

Steps:
1. Write tests that stable signals outrank provisional signals and unavailable signals never headline.
2. Define versioned frontend-only mappings for initial communication, emotional and attraction themes.
3. Add a test that no score field or `compareProfiles` import exists.
4. Generate structured text keys, not free-form LLM output.
5. Return honest Missing when fewer than three acceptable patterns exist.

Acceptance criteria:
- Output contains zero to three evidence-linked patterns, never invented filler.
- Every pattern exposes both roles and all four status fields.

Validation:
- Command: `npm test -- src/utils/relationship/relationshipAnalyzer.test.ts src/__tests__/synastryWording.test.ts`
- Expected result: product analyzer and anti-score tests pass.

Rollback note: Remove frontend product analyzer; no backend impact.

### TASK-012: Build the end-to-end MVP shell

Objective: Connect owned profile, partner, review, progress and simplified result in one reversible flow.
Requirement links: REQ-F-001 through REQ-F-010, REQ-NF-001, REQ-NF-002
Files/modules:
- Create: `src/components/relationship/RelationshipEntry.tsx`
- Create: `src/components/relationship/RelationshipProgress.tsx`
- Create: `src/components/relationship/RelationshipMvpResult.tsx`
- Modify: `src/App.tsx`, `src/components/PageShell.tsx`
- Test: colocated component tests with deterministic domain objects only

Steps:
1. Write component tests for state transitions, error retention and real-shaped transport parsing; do not add a demo result path.
2. Implement state machine with preserved inputs on back/retry.
3. Add an additive feature-flagged navigation entry.
4. Render computed evidence, all four status fields and no-score wording.
5. Add a method link explaining sampled uncertainty and DST warnings.

Acceptance criteria:
- The local component flow completes only after a valid transport response exists.
- No placeholder or demo result can be reached in product code.

Validation:
- Command: `npm test -- src/components/relationship`
- Expected result: relationship component suite passes.

Rollback note: Disable feature flag and remove additive navigation entry.

### TASK-013: Apply the pastel-Olive design tokens accessibly

Objective: Match the supplied palette without sacrificing contrast or focus visibility.
Requirement links: REQ-NF-001, REQ-NF-002
Files/modules:
- Create: `src/styles/relationship.css`
- Modify: `src/index.css` only for token import or scoped base rules
- Test: `src/__tests__/relationshipContrast.test.ts`

Steps:
1. Write token and contrast tests for text/background pairs.
2. Implement scoped relationship variables and responsive spacing.
3. Add reduced-motion behavior and visible focus rings.
4. Verify 44px touch targets and no color-only status.

Acceptance criteria:
- Core text/control pairs meet the agreed AA threshold.
- Existing app theme remains unchanged outside the new experience.

Validation:
- Command: `npm test -- src/__tests__/relationshipContrast.test.ts && npm run lint`
- Expected result: token and type checks pass.

Rollback note: Remove scoped stylesheet/import.

### TASK-014: Add the first real-boundary browser E2E

Objective: Prove the initial complete user flow with actual authenticated profile persistence and actual FuFirE responses.
Requirement links: REQ-F-001, REQ-F-006, REQ-F-008, REQ-S-004, REQ-S-005
Files/modules:
- Create: `tests/e2e/relationship-real-boundary.spec.ts`
- Update: staging runbook; keep it outside the default offline unit pipeline

Steps:
1. Require `RELATIONSHIP_REAL_BOUNDARY=1`, staging credentials and the feature flag.
2. Sign in through the supported test path and create or select an owned test profile through the real profile route.
3. Submit non-famous test birth inputs, consent attestation and a real partner request with no route interception.
4. Assert the response contains calculated bodies, provenance and at least one computed pattern or an honest Missing-State.
5. Exercise one exact and one approximate/unknown case; confirm visible sampled status.
6. Capture request ID and redacted command/browser evidence; never print birth payloads.
7. Delete the owned test profile when the staging environment supports cleanup.

Acceptance criteria:
- No mocked BFF, route interception, fixture response or demo profile is active.
- Evidence class is `real-boundary-smoke`.

Validation:
- Command: `RELATIONSHIP_REAL_BOUNDARY=1 npm run e2e -- tests/e2e/relationship-real-boundary.spec.ts`
- Expected result: real staging flow passes and request ID is recorded.

Rollback note: Disable the gated smoke and feature flag; no data migration exists.

### TASK-015: Run the MVP evidence and release gate

Objective: Decide whether the real-data through-line is honestly ready for usability testing.
Requirement links: REQ-F-010, REQ-NF-001, REQ-NF-002, REQ-O-001
Files/modules:
- Create: `docs/reality/western-synastry-mvp.evidence.jsonl`
- Create: `docs/reviews/western-synastry-mvp-gate.md`
- Update: runbook and decision log

Steps:
1. Run focused unit/route/component tests, typecheck and build.
2. Run the real-boundary Playwright test at a mobile and desktop viewport with no network interception.
3. Perform keyboard, focus, reduced-motion and no-horizontal-scroll checks on the real flow.
4. Record exact commands, results, request IDs, evidence class and limitations.
5. Gate result is `pass`, `revise` or `blocked`; never infer pass from unit-only evidence.

Acceptance criteria:
- `pass` requires green static/focused gates plus `real-boundary-smoke`.
- Any missing credential, failed upstream boundary or PII leak yields `blocked` or `revise`, not Done.

Validation:
- Command: `npm test && npm run lint && npm run build && RELATIONSHIP_REAL_BOUNDARY=1 npm run e2e -- tests/e2e/relationship-real-boundary.spec.ts`
- Expected result: evidence report records actual results; no result is preclaimed in this plan.

Rollback note: Keep `RELATIONSHIP_MVP_ENABLED=false` when the gate is not pass.

### TASK-016: Run the MVP usability gate

Objective: Test comprehension before building all depth features.
Requirement links: REQ-F-011
Files/modules:
- Create: `docs/research/western-synastry-mvp-usability.md`
- Modify: decision log after human review

Steps:
1. Prepare five tasks: profile, partner time, consent, result interpretation, evidence detail.
2. Run five moderated sessions without coaching unless the participant is blocked.
3. Record completion, intervention, misunderstood terms and trust concerns.
4. Do not average qualitative observations into a fake precision score.
5. Present findings and request Human Gate: proceed, revise or stop.

Acceptance criteria:
- Every issue links to a screen/requirement.
- No depth slice starts before the human decision is logged.

Validation:
- Command: `MISSING: human research execution; validate artifact by review checklist`
- Expected result: signed proceed/revise/stop decision.

Rollback note: No code rollback; revise prototype before continuation.

### TASK-017: Expand to all six dimensions after the gate

Objective: Add the complete dimension portfolio only after user evidence supports the flow.
Requirement links: REQ-F-011, REQ-A-003
Files/modules:
- Modify: `src/content/relationship/dimensions.ts`
- Modify: `src/utils/relationship/relationshipAnalyzer.ts`
- Create: `src/components/relationship/DimensionCard.tsx`, `DimensionDetail.tsx`
- Tests: analyzer and component suites

Steps:
1. Start only with a recorded `proceed` or approved revision.
2. Write failing tests for each accepted dimension and counter-reading.
3. Implement mapping changes as versioned configuration.
4. Keep every paragraph evidence-linked and status-bounded.

Acceptance criteria:
- Six accepted dimensions render or display honest Missing.
- No dimension contract is added to FuFirE.

Validation:
- Command: `npm test -- src/utils/relationship/relationshipAnalyzer.test.ts src/components/relationship`
- Expected result: accepted dimension set passes.

Rollback note: Revert config version and affected components.

### TASK-018: Add explorer, method, print and rollout hardening

Objective: Complete the full product experience without weakening the verified MVP core.
Requirement links: REQ-F-008, REQ-NF-001, REQ-NF-002, REQ-O-001
Files/modules:
- Create: `AspectExplorer.tsx`, `RelationshipMethod.tsx`, `RelationshipPrintView.tsx`
- Modify: scoped CSS and `tests/e2e/relationship-real-boundary.spec.ts`
- Update: rollout/runbook docs

Steps:
1. Add feature-level tests before each component.
2. Implement explorer filters using existing evidence only.
3. Implement method/provenance view and browser print.
4. Run accessibility, responsive, build and real-boundary regression.
5. Retain old Synastry tab until user acceptance.

Acceptance criteria:
- Full app remains no-score, evidence-linked and precision-aware.
- Feature flag rollback is documented and tested.

Validation:
- Command: `npm test && npm run lint && npm run build && RELATIONSHIP_REAL_BOUNDARY=1 npm run e2e -- tests/e2e/relationship-real-boundary.spec.ts`
- Expected result: full New_Bazi gates pass.

Rollback note: Disable feature flag; do not delete old route or tab.

## Validation strategy

### Evidence classes
- `unit-only`: pure validators, time bands, aspect aggregation and components.
- `integration`: BFF/client tests with controlled process-local doubles; useful for contracts, not a real external-boundary claim.
- `real-boundary-smoke`: authenticated browser/BFF against real profile persistence and real FuFirE.
- `user-confirmed`: usability and product acceptance.

There is deliberately no mocked browser-E2E milestone in the MVP. Unit and route doubles remain allowed because they isolate failure paths, but they cannot support the product-through-line claim.

### Focused test commands
```bash
npm test -- src/utils/relationship
npm test -- src/server/app.relationship.test.ts src/server/app.ratelimit.test.ts
npm test -- src/components/relationship
```

### Broader regression commands
```bash
npm test
npm run lint
npm run build
```

### Real-boundary command
```bash
RELATIONSHIP_REAL_BOUNDARY=1 npm run e2e -- tests/e2e/relationship-real-boundary.spec.ts
```

### Manual review checklist
- Consent copy says confirmation, not verification.
- Profile ID is owner-filtered server-side; foreign IDs produce 404 and zero upstream calls.
- No score or relationship verdict.
- Midpoint time is never presented as exact.
- Provisional signals satisfy the declared coverage threshold.
- DST policy/adjustment remains visible.
- Partner data are not silently saved.
- Names and birth data do not appear in logs.
- The real flow works without route interception at mobile and desktop widths.
- Keyboard, focus, reduced motion and screen-reader labels are checked.

## Rollback and safety

- Ship behind `RELATIONSHIP_MVP_ENABLED`.
- Preserve current Synastry tab and route until Human Acceptance.
- No DB migration is required for the MVP; reuse existing profile table/rules.
- Partner data remain request-scoped.
- BFF call fan-out is capped at six Western requests total and the route participates in the compute-rate-limiter.
- Timeout or partial sample failure produces an explicit degraded state; it does not fabricate missing samples.
- If real-boundary smoke fails, keep feature disabled and record request ID, upstream status and limitation.
- No direct commit to `main`, no force push, no bypassing tests.

## Options considered

### Option A — New FuFirE match endpoint now
Benefit: central contract and cross-client consistency. Cost: standardizes untested dimensions and time-window rules before user learning. Rejected for MVP; retained as `API-001`.

### Option B — Keep all comparison logic in the BFF
Benefit: consistent server output. Cost: slower product experimentation and conflicts with the chosen frontend ownership. Rejected for MVP.

### Option C — BFF transport plus frontend product analyzer
Benefit: real server-side secret/consent boundary with reversible product experimentation. Cost: browser bundle contains product rules and a second client could diverge. Selected, with explicit API-promotion gate.

## Execution handoff

### Start with
1. Read `docs/decisions/2026-07-19-western-synastry-decisions.md`.
2. Run and record the current New_Bazi baseline commands.
3. Execute TASK-001 through TASK-003 before UI work.
4. Implement vertical slices in order; do not begin TASK-017 before Human Gate.

### Allowed scope
- New files and additive changes named in this plan.
- Existing profile, BFF, FuFirE client and InterAspect modules only as bounded dependencies.

### Stop and ask if
- Existing profile routes or owner-filter semantics differ from the inspected contract.
- A change requires a database migration or partner persistence.
- FuFirE `/v1/calculate/western` lacks a field required by the transport contract.
- Sampling exceeds three calls per person.
- Consent wording changes legal meaning.
- Product rules require a score or deterministic relationship verdict.
- Full dimension work is requested before Usability Gate.

### Commit strategy
- One coherent commit per task or tightly coupled TDD pair.
- Prefix: `test(relationship)`, `feat(relationship)`, `fix(relationship)`, `docs(relationship)`.
- No direct commit or push to protected branches.

### Completion report
For each task report:
- changed files;
- tests executed and exact result;
- evidence class;
- unresolved Missing/Blocker;
- rollback path;
- next gated task.

## Plausibility and truth self-check

- Goal length: validated below 4000 characters by `writing-plans` validator.
- Unsupported claims removed or labeled: yes.
- Strongest counterargument: building the FuFirE endpoint now would reduce future drift; the plan defers it because the product dimensions and uncertainty model have no user evidence yet.
- Failure-mode chain: If frontend rules are treated as permanent truth, then another client diverges, then results become inconsistent. Mitigation: version rules, keep transport evidence explicit, and execute API-001 only after a second consumer or validated stable rules exist.
- Bias risks: sunk-cost bias toward existing local synastry code; overengineering through premature API standardization; visual bias equating pastels with usability; completion pressure to skip the real-boundary and user gates.
- Final readiness: ready-for-execution for TASK-001 through TASK-015, provided staging credentials are supplied before TASK-014; later depth remains human-gated.
