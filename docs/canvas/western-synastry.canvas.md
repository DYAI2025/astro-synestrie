<!-- Status: draft -->
<!-- Confirmed by user: no -->

# Product Canvas — Western Synastry MVP (astro-synestrie)

**Feature slug:** `western-synastry`
**Status:** draft · **Confirmed by user:** no
**Autor des Entwurfs:** Orchestrator (`/agileteam`), abgeleitet aus PRD + Entscheidungsprotokoll + Repo-Inspektion
**Repo:** `DYAI2025/astro-synestrie` (Fork von `DYAI2025/New_Bazi`, upstream-Remote erhalten)

**Quellartefakte:**
- PRD: `docs/prd/prd_report.md` / `docs/prd/prd_report.json`
- Entscheidungen: `docs/decisions/2026-07-19-western-synastry-decisions.md` (DEC-01…08, TECH-INV-01…04)
- Plan: `docs/plans/2026-07-19-western-synastry-mvp-throughline.md` (TASK-001…018)
- Handoff: `docs/handoff/CODING_AGENT_HANDOFF.md`

> Erlaubte Status-Werte: `draft` | `user-confirmed` | `blocked`. **Kein Agent darf selbst
> bestätigen.** Bis `user-confirmed` bleiben Planning und Coding gesperrt
> (`plumbline-start-check` → `VISION_MISSING`).

---

## 1. Problem

Status: **CONFIRMED**

Die bestehende Synastrie erzeugt Scheinobjektivität an drei Stellen — alle **belegt** im
aktuellen Code:

1. **Der Score.** `compareProfiles()` (`src/utils/synastry.ts:47`) verrechnet eine
   Day-Master-Relation und einen Sonnenzeichen-Element-Bucket zu einer Zahl. Das BFF ruft
   sie in `/api/azodiac/synastry` auf (`src/server/app.ts:32,674,688`), die UI rendert sie
   als „Primus-Aspectus (PA)" (`src/components/Synastry.tsx:242`). Eine Zahl, die wie ein
   Urteil über die Beziehung aussieht, ruht auf zwei Datenpunkten.
2. **Die stille 12:00.** Unbekannte Geburtszeit wird auf `12:00` gesetzt
   (`src/utils/birthInputValidation.ts`). Zeitabhängige Signale — Mond, Häuser, Achsen —
   werden damit als exakt behandelt, obwohl sie geraten sind.
3. **Keine Einwilligung.** Die Daten der zweiten Person werden erfasst, ohne dass der Nutzer
   je erklärt, dass diese Person zugestimmt hat.

Der Nutzer bekommt eine Note statt nachvollziehbarer Substanz — und die App behauptet
implizit Präzision und Legitimation, die sie nicht hat.

---

## 2. Target user / customer

Status: **CONFIRMED**

Eine **angemeldete Person, die Beziehungsmuster reflektieren will, ohne ein Urteil zu
bekommen** (PRD `INFO-004`). Sie hat ein eigenes Profil oder legt eines an, und bringt die
Geburtsdaten einer zweiten Person mit, deren Zustimmung sie erklären kann.

Explizit **nicht** adressiert: Ratsuchende in Beziehungskrisen (kein Therapie-/Beratungs-
kontext), anonyme Nutzer ohne Konto (kein Demo-Profil-Fallback), B2B-Consumer der Regeln
(→ `API-001`).

---

## 3. Current workaround

Status: **CONFIRMED**

Nutzer öffnen den bestehenden Synastry-Tab, lesen den PA-Wert und die Paar-Sektionen und
interpolieren den Rest selbst. Unsicherheit aus unbekannter Zeit ist unsichtbar — sie
verschwindet hinter der 12:00-Ersetzung. Westliche Inter-Aspekte existieren zwar als Modul
(`src/utils/interAspects.ts`), speisen aber keinen evidenzgebundenen, unsicherheits-
bewussten Beziehungsblick.

---

## 4. Value proposition

Status: **CONFIRMED**

Ein **echt gerechneter, evidenzgebundener Beziehungsblick ohne Note**:

- **Echte Berechnung statt Demo.** Jeder Samplepunkt geht durch das BFF an das reale FuFirE
  `POST /v1/calculate/western`. Kein Placeholder, kein Fixture, kein gemockter Upstream darf
  den Durchstich belegen (DEC-08).
- **Unsicherheit sichtbar statt still.** `exact` / `approximate` / `unknown` sind getrennte
  Modi; ungenaue Zeit erzeugt Start/Mitte/Ende-Samples und einen sichtbaren Status
  `stable` / `provisional` / `unavailable` — der Mittelpunkt heißt nie „Geburtszeit" (DEC-02/03).
- **Substanz statt Umfang.** Bis zu drei Muster, jedes mit beiden Körperrollen, Aspekt,
  Orb-Spanne und Sampleabdeckung — oder ein ehrlicher Missing-State (DEC-06).
- **Kein Urteil.** Kein Prozentwert, keine Kompatibilitätsaussage, kein `confidence`-Feld
  das Präzision verwischt (TECH-INV-02).
- **Einwilligung als Erklärung, nicht als Prüfung.** Der Nutzer bestätigt; die App behauptet
  nirgends, das geprüft zu haben (DEC-01).

---

## 5. Success signal

Status: **CONFIRMED** (zweistufig — die Stufen dürfen nicht vermischt werden)

**Stufe 1 — Realitätsnachweis (TASK-015).** Der Flow Profil → Partner → Consent → echte
FuFirE-Berechnung → Ergebnis läuft browser-live gegen echte Auth-, Profil- und FuFirE-
Grenzen, ohne Route-Interception. Evidenzklasse `real-boundary-smoke`, Request-ID
protokolliert, ohne PII. **Grüne Unit-/Route-Tests sind kein Ersatz** — sie belegen interne
Korrektheit, nicht Auslieferung des Nutzwerts.

**Stufe 2 — Verständnisnachweis (TASK-016).** Fünf moderierte Sessions. Beobachtet wird:
Schließen Nutzer die Aufgaben ohne Hilfe ab; lesen sie die Muster, statt nach einer
Gesamtnote zu fragen; verstehen sie, was `provisional` bedeutet; halten sie die Consent-
Formulierung für eine Prüfung. Qualitative Beobachtungen werden **nicht** zu einer Kennzahl
gemittelt.

---

## 6. Core use case

Status: **CONFIRMED**

> Angemeldeter Nutzer wählt oder erstellt sein eigenes Profil (bei unbekannt gespeicherter
> Zeit optional transient auf ein Zeitfenster präzisiert) → erfasst die zweite Person mit
> Zeitmodus → prüft beide Datensätze und bestätigt die Zustimmungserklärung → das BFF
> rechnet real → er liest bis zu drei evidenzgebundene Muster mit sichtbarer Stabilität und
> eine Reflexionsfrage.

Kleinster sinnvoller Ausschnitt. Alles darunter (nur Validator, nur Route) erzeugt keinen
beobachtbaren Nutzerwert; alles darüber (sechs Dimensionen, Explorer, Print) ist erst nach
dem Usability-Gate zulässig.

---

## 7. Non-goals

Status: **CONFIRMED**

- Kein neuer FuFirE-Synastrie-/Match-Endpunkt; FuFirE wird in diesem MVP **nicht geändert**.
- Kein Payment, Subscription, Entitlement, Marketplace.
- Keine automatische Persistenz von Partnerdaten oder Analyseergebnis; keine DB-Migration.
- Kein LLM-generierter Beziehungstext.
- Keine Composite-, Davison-, Transit-, Progressions-, BaZi- oder Wu-Xing-Analyse.
- Kein serverseitiges Premium-PDF vor dem Usability-Gate.
- Kein Ausbau auf sechs Dimensionen / Explorer / Methodikansicht / Print vor dem Human Gate.
- **Keine öffentliche Produktfreigabe** in diesem Lauf (PRD `INFO-001`, `SEC-005`, `AC-013`).
- Der alte Synastry-Tab wird **nicht** entfernt (`ROLLBACK-002`).

---

## 8. Risks / contradictions

Status: **OPEN QUESTION** — R5 und R4 brauchen eine Nutzerentscheidung.

- **R1 — Consent wird als geprüfte Zustimmung gelesen** (PRD `RISK-001`, *belegt als Risiko,
  Wirksamkeit ungeprüft*). Mitigation: explizite Attestierungs-Formulierung, 422-Gate,
  `verificationStatus: "user_attested_not_independently_verified"` im Transport. Ob echte
  Nutzer die Unterscheidung *lesen*, ist erst nach TASK-016 bekannt.
- **R2 — Diskretes Sampling ist kein Intervallbeweis** (PRD `RISK-002`, *belegt*). Drei
  Samplepunkte können Verhalten zwischen den Punkten verfehlen. Mitigation: Center-plus-
  Majority-Schwelle, sichtbare Kennzeichnung als *sampled*, keine Kernaussage aus
  `unavailable`. Der Text darf nie „gilt im ganzen Zeitfenster" behaupten.
- **R3 — Frontend-Regeln divergieren bei einem zweiten Consumer** (PRD `RISK-003`).
  Mitigation: Regelversionierung + `API-001` als Promotions-Gate.
- **R4 — Staging-Credentials fehlen** (PRD `OPEN-002`, Priorität **p0**, *belegt*).
  Ohne Staging-URL und Test-Credentials für FuFirE und Supabase sind TASK-014/015 nicht
  ausführbar. **Konsequenz für diesen Lauf:** die MVP-Akzeptanz (`real-boundary-smoke`) ist
  nicht erreichbar. Der Lauf endet nach TASK-013 mit Evidenzklasse `integration` und
  **darf nicht als MVP-Done berichtet werden.** Das ist die vom Nutzer gewählte
  Lauf-Scope-Entscheidung, nicht eine Herabstufung durch einen Agenten.
- **R5 — Score-Kollision mit dem ausgelieferten P7-Stand (NEU, *belegt*, nicht im PRD).**
  Der Vorgänger-Sprint `bazi-sprint-p7-partner-journey` hat mit Nutzerentscheidung
  D-SCORE (2026-06-14) den Score **behalten** und in „Primus-Aspectus (PA)" umbenannt — er
  steht heute in `src/components/Synastry.tsx:242`. Der neue PRD verbietet jeden Score
  (`FR-007`, `AC-006`, `ARCH-004`) und `TEST-007` soll das per DOM-/Wording-Scan beweisen.
  Gleichzeitig verlangt `ROLLBACK-002`, den alten Tab bis zur Human Acceptance zu behalten.
  Ein repo-weiter Scan trifft damit zwangsläufig den Altbestand. Zwei Auflösungen sind
  möglich, und **nur der Nutzer darf wählen** — die eine hält den Nachweis scharf, die
  andere macht ihn wertlos:
  - **(a) Scan auf den neuen Flow begrenzen** (`src/utils/relationship/**`,
    `src/components/relationship/**`, `src/api/relationshipClient.ts`, neue Route) —
    Nachweis bleibt scharf, Altbestand bleibt unberührt und dokumentiert bestehen.
  - **(b) Score repo-weit entfernen** — widerspricht `ROLLBACK-002` und der bestätigten
    P7-Entscheidung; wäre eine Rücknahme einer früheren Nutzerentscheidung.
  Solange offen, ist dies eine `CONTRA`-Kandidatin, keine stillschweigende Annahme.
- **R6 — Pastellästhetik verdeckt Verständnisprobleme** (PRD `RISK-005`). Mitigation:
  Usability-Gate vor Tiefenausbau; Kontrast-/Fokus-Tests statt Geschmacksurteil.
- **R7 — Fremdes Profil würde fremde Geburtsdaten verarbeiten** (PRD `RISK-006`, p0).
  Mitigation: `requireUserAuth` + Lookup über `id + user_id`, 404 und **null** FuFirE-Aufrufe
  bei fremder/fehlender ID (TECH-INV-03).
- **R8 — DST-Kanten verschieben oder verdoppeln generierte Samples** (PRD `RISK-007`,
  Status *assumption*). Mitigation: exakte nicht existente Zeit ablehnen; generierte Samples
  `shift_forward` / ambige `earlier`, beides als Warning im Transport sichtbar.
- **R9 — Vollständigkeitsdruck** (Prozessrisiko, aus dem Plan-Selbstcheck übernommen). Der
  Anreiz, nach grünen Unit-Tests „fertig" zu melden, ist genau der Fehler, den DEC-07/08
  adressieren. Mitigation: Reality Ledger; `integration` wird nie als MVP-Akzeptanz gemeldet.

---

## 9. Evidence needed

Status: **CONFIRMED**

**Bereits verifiziert (belegt, Repo-Inspektion 2026-07-20, HEAD `95c85c0`):**
- `FuFirEClient.postWestern()` existiert — `src/utils/fufireClient.ts:223`.
- `requireUserAuth` existiert und schützt bereits `/api/me/profiles` — `src/server/app.ts:5,820`.
- Compute-Rate-Limiter existiert als `app.use(["/api/azodiac","/api/gemini"], …)` —
  `src/server/app.ts:455`. `REQ-S-005` / TECH-INV-04 = `/api/relationships` in dieses Array.
- `compareProfiles` wird in `src/server/app.ts:32,688` importiert und benutzt; Score-Label
  „Primus-Aspectus (PA)" in `src/components/Synastry.tsx:242` (→ R5).
- Ein Anti-Reifikations-Scanner existiert bereits (`src/__tests__/synastryWording.test.ts`)
  und scannt auch UI-Chrome inkl. `src/components/synastry/` — er ist die vorhandene Basis
  für `TEST-007`, muss aber gemäß R5-Entscheidung gescopt werden.
- `src/utils/interAspects.ts`, `fufirePayloadMappers.ts`, `PlaceAutocomplete.tsx`,
  `AccountMenu.tsx`, `birthInputValidation.ts` vorhanden; Playwright konfiguriert.
- **Nichts vom neuen Flow existiert**: `src/types/relationship.ts`,
  `src/utils/relationship/`, `src/components/relationship/`, `/api/relationships`,
  `tests/e2e/relationship-real-boundary.spec.ts` — alle abwesend. TASK-001…015 unbegonnen.
- Toolchain: node v24.16.0, npm 11.13.0, `npm ci` erfolgreich. `lint` = `tsc --noEmit`,
  `test` = `vitest run`, `e2e` = `playwright test`.
- **Baseline gemessen (2026-07-20, HEAD `95c85c0`), nicht angenommen:** `npm run lint`
  → exit 0. `npm test` → **57 Test-Files, 783 Tests passed**, Dauer 8,54 s. Die im Log
  sichtbaren `DOMException: Failed to load script "https://elevenlabs.io/convai-widget/index.js"`
  stammen aus `src/components/AgentWidget.tsx:64` unter happy-dom (externes Script wird im
  Testlauf nicht geladen) — Rauschen, kein Testfehler. Die Prämisse des Plans, auf einem
  grünen Bestand aufzusetzen, ist damit **belegt**.

**Noch zu erbringen, bevor Implementierung als real gilt:**
- `npm run build` auf HEAD — bisher nicht ausgeführt (**ungeprüft**), wird in TASK-001
  gemessen.
- Pro Task: fokussierte Tests test-first (rot vor grün), Evidenzklasse pro REQ.
- `real-boundary-smoke` (TASK-014/015) — **blockiert durch R4**.
- `user-confirmed` (TASK-016) — nach dem Usability-Gate.

**Ausdrücklich ungeprüft (dürfen nicht als Prämisse weitergereicht werden):**
- Dass Nutzer evidenzgebundene Muster ohne Note überhaupt als wertvoll erleben (`R5` des
  PRD-Risikoregisters, Marktvalidierungs-Hypothese dieses MVP).
- Dass FuFirE `/v1/calculate/western` alle für den Transportvertrag nötigen Felder liefert —
  laut Plan eine Stop-and-ask-Bedingung, nicht verifiziert.
- Dass fünf moderierte Sessions als erstes qualitatives Gate ausreichen (PRD `INFO-008`).

---

## Allowed change scope

Status: **OPEN QUESTION** — Liste ist der Vorschlag; sie wird mit dem Canvas bestätigt.

Fail-closed (Phase 0.6). `plumbline-scope-check` prüft jede Increment-Dateiliste gegen diese
Muster. Abgeleitet aus der Dateiliste des Plans plus den zwei verifizierten Anker-Dateien.

- `src/types/relationship.ts`
- `src/utils/relationship/`
- `src/api/relationshipClient.ts`
- `src/api/relationshipClient.test.ts`
- `src/components/relationship/`
- `src/content/relationship/`
- `src/styles/relationship.css`
- `src/server/relationshipTransport.ts`
- `src/server/app.relationship.test.ts`
- `src/server/app.ratelimit.test.ts`
- `src/server/app.ts`
- `src/App.tsx`
- `src/components/PageShell.tsx`
- `src/index.css`
- `src/api/bazodiacClient.ts`
- `src/__tests__/synastryWording.test.ts`
- `src/__tests__/relationshipContrast.test.ts`
- `tests/e2e/relationship-real-boundary.spec.ts`
- `docs/`

**Nicht im Scope** (Änderung erfordert Rückfrage): `src/utils/synastry.ts`,
`src/components/Synastry.tsx`, `src/utils/interAspects.ts` (nur lesend wiederverwenden),
`src/utils/fufireClient.ts`, `supabase/`, `package.json`, alles unter FuFirE.

---

## 10. Traceability links

- **PRD:** `docs/prd/prd_report.md` · `docs/prd/prd_report.json` (Status: accepted; Canvas-Link wird beim Confirm nachgetragen)
- **Product Vision:** `docs/vision/western-synastry.vision.md` — **noch nicht erstellt**, folgt nach Canvas-Confirm
- **Traceability Matrix:** `docs/traceability.md` — Canvas-Felder für `western-synastry` werden in Phase 1 nach GO ergänzt
- **Related REQ IDs:** `REQ-F-001`…`REQ-F-011`, `REQ-D-001`…`REQ-D-004`, `REQ-A-001`…`REQ-A-005`, `REQ-NF-001`…`REQ-NF-005`, `REQ-S-001`…`REQ-S-005`, `REQ-O-001`, `REQ-DOC-001`
- **True-Line status:** `draft`

---

## User confirmation

**Confirmed by user:** no
**Confirmation date:** —
**Confirmation note:** —

Offene Punkte, die vor dem Confirm entschieden werden müssen:
1. **R5** — Score-Scan auf den neuen Flow begrenzen (a) oder Score repo-weit entfernen (b)?
2. **Allowed change scope** — Liste so bestätigen oder anpassen?
3. **R4** wird als bekannte Grenze mitbestätigt: dieser Lauf endet nach TASK-013 mit
   Evidenzklasse `integration` und **nicht** als MVP-Done.
