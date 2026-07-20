<!-- Status: user-confirmed -->
<!-- Confirmed by user: yes (2026-07-20, Amendment 2) -->

# Product Canvas — Western Synastry MVP (astro-synestrie)

**Feature slug:** `western-synastry`
**Status:** user-confirmed (Amendment 2) · **Confirmed by user:** yes (2026-07-20)
**Vorherige Bestätigung:** 2026-07-20 (Amendment 1) — durch Council- und Audit-Befunde überholt
**Autor des Entwurfs:** Orchestrator (`/agileteam`)
**Repo:** `DYAI2025/astro-synestrie` (Fork von `DYAI2025/New_Bazi`, `upstream` erhalten)

**Quellartefakte:**
- PRD: `docs/prd/prd_report.md` / `.json`
- Entscheidungen: `docs/decisions/2026-07-19-western-synastry-decisions.md` (DEC-01…08, TECH-INV-01…04)
- Plan: `docs/plans/2026-07-19-western-synastry-mvp-throughline.md` — **wird gemäß D9 neu geschrieben**
- Vorreviews (nicht unabhängig): `docs/reviews/ULTRATHINK_CRAFTSMANSHIP_REVIEW.md`, `docs/reviews/EVIDENCE_DIALECTIC_VALIDATION.md`
- **Unabhängiger Audit: `docs/reviews/2026-07-20-independent-blindspot-audit.md` (30 bestätigte Befunde)**

> Erlaubte Status-Werte: `draft` | `user-confirmed` | `blocked`. **Kein Agent darf selbst
> bestätigen.** Diese Fassung ist geändert und daher zurück auf `draft`.

---

## Was sich in Amendment 2 geändert hat

| Auslöser | Änderung |
|---|---|
| Council-Konvergenz (alle 3 Rollen) | §5 Success Signal neu: Lernen kommt **vor** Infrastruktur (D6) |
| Council Punkt 1 | §4 um sichtbare Auswahlregel ergänzt (D7) |
| Council Punkt 3 | §8 R13 + §9: synthetische Zweitpersonen bis zur Rechtsprüfung (D8) |
| Audit **F-07** | §1 sachlich **korrigiert** — mein Fehler, siehe unten |
| Audit **F-01** | §8 R10 + §9: Engine-Spike als Pflichtbeleg |
| Audit **F-26** | §8 R11 — der Real-Boundary-Befehl ist heute ein Mock-Lauf |
| D9 | Plan wird neu geschrieben statt geflickt |
| D10 | Allowed change scope gezielt geöffnet |

---

## 1. Problem

Status: **CONFIRMED** (in Amendment 2 sachlich korrigiert)

Die bestehende Synastrie erzeugt Scheinobjektivität — aber **nicht überall dort, wo
Amendment 1 das behauptet hat.** Die Korrektur steht bewusst hier und nicht in einer Fußnote:

1. **Der Score — belegt.** `compareProfiles()` (`src/utils/synastry.ts:47`) verrechnet eine
   Day-Master-Relation und einen Sonnenzeichen-Element-Bucket zu einer Zahl. Aufgerufen in
   `src/server/app.ts:32,688`, gerendert als „Primus-Aspectus (PA)"
   (`src/components/Synastry.tsx:242`). Eine Zahl, die wie ein Urteil aussieht, ruht auf zwei
   Datenpunkten.
2. **Die stille 12:00 — teilweise belegt, teilweise widerlegt.**
   `src/utils/birthInputValidation.ts:97` setzt bei unbekannter Zeit hart `12:00`.
   **Amendment 1 behauptete, Häuser und Achsen würden dadurch als exakt behandelt. Das ist
   falsch.** `src/utils/fufireNormalizer.ts:229-238` implementiert bereits die
   `BIRTH-TIME-01`-Invariante: `ascendantProvisional = !timeKnown || …`, mit dem expliziten
   Kommentar, `provisional_fields` der Engine sei *„an ADDITIONAL trigger, never the sole
   one"*. Häuser und Aszendent sind also lokal geschützt.
   **Was stehen bleibt:** für den **Mond** existiert dieser Schutz nicht. Er ist das
   zeitempfindlichste Signal (~13°/Tag) und wird ohne Provisorik-Markierung durchgereicht.
   Genau darauf zielt DEC-03.
3. **Keine Einwilligung — belegt.** Die Daten der zweiten Person werden erfasst, ohne dass der
   Nutzer je erklärt, dass diese Person zugestimmt hat. Darüber hinaus (Council/Audit): es gibt
   **keine dokumentierte Rechtsgrundlage und keinen Art.-14-Hinweis** — siehe R13.

---

## 2. Target user / customer

Status: **CONFIRMED**

Eine **angemeldete Person, die Beziehungsmuster reflektieren will, ohne ein Urteil zu
bekommen** (PRD `INFO-004`).

*Offene Gegenevidenz, ehrlich geführt (Challenger):* die einzige real dokumentierte
Nutzerentscheidung in diesem Repo ging in die andere Richtung — D-SCORE (2026-06-14) hat den
Score **behalten**. `INFO-004` beschreibt damit möglicherweise den Wunschnutzer, nicht den
belegten. Das aufzulösen ist der Zweck von D6.

Nicht adressiert: Ratsuchende in Beziehungskrisen · anonyme Nutzer ohne Konto · B2B-Consumer
der Regeln (→ `API-001`).

---

## 3. Current workaround

Status: **CONFIRMED**

Nutzer öffnen den bestehenden Synastry-Tab, lesen den PA-Wert und die Paar-Sektionen und
interpolieren den Rest. Zeitunsicherheit ist beim Mond unsichtbar. Westliche Inter-Aspekte
existieren als Modul (`src/utils/interAspects.ts`), speisen aber keinen evidenzgebundenen
Beziehungsblick.

---

## 4. Value proposition

Status: **CONFIRMED** (um D7 ergänzt)

- **Echte Berechnung statt Demo.** Jeder Samplepunkt geht durch das BFF an das reale FuFirE
  `POST /v1/calculate/western` (DEC-08).
- **Unsicherheit sichtbar statt still.** `exact`/`approximate`/`unknown` getrennt; ungenaue
  Zeit erzeugt Start/Mitte/Ende-Samples mit sichtbarem Status. Der Mittelpunkt heißt nie
  „Geburtszeit" (DEC-02/03).
- **Substanz statt Umfang.** Wenige Muster, jedes mit beiden Körperrollen, Aspekt, Orb-Spanne
  und Sampleabdeckung — oder ehrlicher Missing-State.
- **Kein verstecktes Urteil (D7, neu).** Die Note fällt weg *und* die **Auswahlregel wird im
  UI offengelegt**. Der Council hat belegt: Ranking plus Trunkierung auf drei Muster **ist**
  ein Urteil, auch ohne Zahl (`plan:790-792`). Ein Produkt, das Evidenz verlangt, muss die
  eigene Selektionsregel als Evidenz behandeln. Sie wird gerendert und getestet, nicht
  wegdefiniert.
- **Einwilligung als Erklärung, nicht als Prüfung** (DEC-01) — mit dem offenen Rechtsproblem
  aus R13 daneben, nicht darunter.

---

## 5. Success signal

Status: **CONFIRMED** (durch D6 neu geordnet — Lernen vor Infrastruktur)

Amendment 1 hatte die Reihenfolge falsch: Realitätsnachweis zuerst, Verständnisnachweis
danach. Der Council hat gezeigt, dass diese Reihenfolge im gewählten Lauf-Scope **null
Marktsignal** erzeugt — TASK-016 lag hinter zwei Blockern. Neue Ordnung:

**Stufe 0 — Engine-Wahrheit (neu, Pflicht vor allem anderen).** FuFirE wird mit **drei
verschiedenen Uhrzeiten** und `birth_time_known:false` live aufgerufen; die Responses werden als
Fixtures committet. Erfolg = die drei Charts unterscheiden sich nachweislich. Schlagen sie
nicht auseinander, ist DEC-03 als Ganzes hinfällig und der Lauf stoppt mit User-Report.
Präzedenz im eigenen Repo: `REQ-P4-001` in `docs/prd/bazi-sprint-p4-unknown-time.prd.md:28`.

**Stufe 1 — Verständnis- und Wollen-Nachweis (vorgezogen, D6).** Fixture-Prototyp, fünf
moderierte Sessions. Beobachtet wird nicht nur Verständnis, sondern **Nachfrage**: Würden sie
das auf eine zweite Person anwenden? Kommen sie unaufgefordert zurück? Zusätzlich A/B
**ranked-three gegen unranked-all**, sonst beantwortet der Test D7 nicht. Qualitative
Beobachtungen werden **nicht** zu einer Kennzahl gemittelt.

**Stufe 2 — Realitätsnachweis (nachgelagert).** Flow gegen echte Auth-, Profil- und
FuFirE-Grenzen, ohne Route-Interception, Evidenzklasse `real-boundary-smoke`.
**Voraussetzung: R11 ist behoben** — der heutige Befehl beweist das nicht.

---

## 6. Core use case

Status: **CONFIRMED**

> Angemeldeter Nutzer wählt oder erstellt sein eigenes Profil (bei unbekannt gespeicherter Zeit
> optional transient auf ein Zeitfenster präzisiert) → erfasst die zweite Person mit Zeitmodus
> → prüft beide Datensätze und bestätigt die Zustimmungserklärung → es wird real gerechnet →
> er liest wenige evidenzgebundene Muster mit sichtbarer Stabilität, sichtbarer Auswahlregel
> und einer Reflexionsfrage.

Im Prototyp der Stufe 1 ist die zweite Person **synthetisch** (D8) und die Berechnung kommt aus
einem echten, in Stufe 0 aufgezeichneten Fixture.

---

## 7. Non-goals

Status: **CONFIRMED**

- Kein neuer FuFirE-Endpunkt; FuFirE wird nicht geändert.
- Kein Payment, Subscription, Entitlement, Marketplace.
- Keine automatische Persistenz von Partnerdaten oder Ergebnis; keine DB-Migration.
- Kein LLM-generierter Beziehungstext.
- Keine Composite-, Davison-, Transit-, Progressions-, BaZi- oder Wu-Xing-Analyse.
- Kein serverseitiges PDF vor dem Usability-Gate.
- Kein Ausbau auf sechs Dimensionen / Explorer / Print vor dem Human Gate.
- **Keine öffentliche Produktfreigabe** (`SEC-005`, `AC-013`).
- Der alte Synastry-Tab wird **nicht** entfernt (`ROLLBACK-002`).
- **Keine Verarbeitung echter Zweitpersonendaten** vor der Rechtsprüfung (D8, neu).

---

## 8. Risks / contradictions

Status: **CONFIRMED**

**R1 — Consent wird als geprüfte Zustimmung gelesen** (`RISK-001`). Attestierungs-Formulierung,
422-Gate, `verificationStatus: user_attested_not_independently_verified`. *Audit F-11: bis heute
prüft kein Test die Formulierung — nur der Statuscode. Der neue Plan muss das schließen.*

**R2 — Diskretes Sampling ist kein Intervallbeweis** (`RISK-002`). *Audit F-12: die beiden
konkret benannten Wording-Fehler („gilt im ganzen Zeitfenster", Mittelpunkt als gemessene Zeit)
haben ebenfalls keinen Test.*

**R3 — Frontend-Regeln divergieren bei einem zweiten Consumer** (`RISK-003`). → `API-001`.

**R4 — Credentials — in Amendment 2 aufgeschlüsselt und deutlich entschärft.** `OPEN-002`
führte „Staging-Credentials" als **einen** monolithischen p0-Blocker. Gemessen am 2026-07-20
zerfällt das:
- `https://api.fufire.space/health` → **HTTP 200** (0,47 s); `/v1/calculate/western` → **401**.
  Die Engine **lebt**, der Endpunkt existiert und verlangt nur einen Schlüssel.
- **Stufe 0** braucht damit ausschließlich `FUFIRE_API_KEY` — ein Secret, keine Umgebung.
- **Stufe 1** braucht **gar nichts**: sie läuft auf den in Stufe 0 aufgezeichneten Fixtures.
- **Stufe 2** braucht weiterhin FuFirE-Key + `SUPABASE_SERVICE_ROLE_KEY` + Testnutzer +
  laufende App + den R11-Fix.
Weder `FUFIRE_API_KEY` noch `SUPABASE_SERVICE_ROLE_KEY` sind aktuell in der Umgebung gesetzt;
es existiert nur `.env.example` mit `replace_me`-Platzhaltern. Der PRD ließ den billigen,
klärenden Test dadurch so blockiert erscheinen wie den teuren.

**R5 — Score-Kollision mit dem P7-Bestand — aufgelöst (D4).** Der No-Score-Nachweis entsteht als
neue Datei `src/__tests__/relationshipNoScore.test.ts`, gescopt auf den neuen Flow, plus
Static-Import-Guard gegen `compareProfiles`. P7-Bestand unberührt, `ROLLBACK-002` intakt.
*Verbleibende Grenze:* der Nachweis gilt für den neuen Flow, nicht für die App als Ganzes.

**R6 — Pastellästhetik verdeckt Verständnisprobleme** (`RISK-005`). *Audit F-21: der als „Fokus
und Interaktion" gesetzte Token `--rel-peach #BB8588` erreicht gegen `--rel-bg` nur **2,56:1** —
er verletzt die Designregel elf Zeilen weiter unten im selben Plan.*

**R7 — Fremdes Profil verarbeitet fremde Geburtsdaten** (`RISK-006`, p0). `requireUserAuth` +
`id + user_id`, 404, null Upstream. *Audit F-04: das BFF verbindet mit
`SUPABASE_SERVICE_ROLE_KEY` (`src/server/supabase.ts:10,16`) — RLS-Policies `to authenticated`
greifen dabei **nicht**. Der Owner-Filter ist reiner Anwendungscode, ohne DB-Netz darunter.*

**R8 — DST-Kanten** (`RISK-007`). *Audit F-03: die aufgezeichnete Live-Response hat **kein
Feld**, das eine Anpassung meldet — `timeResolution.adjusted` im geplanten Transport ist damit
eine Erfindung des BFF, keine Weitergabe.*

**R9 — Vollständigkeitsdruck.** Reality Ledger; `integration` gilt nie als MVP-Akzeptanz.

**R10 — Die Abtastung könnte ein No-op sein (NEU, Audit F-01, unbewiesen).**
`birth_time_known` kommt in PRD, Plan, Entscheidungen und beiden Vorreviews **null Mal** vor,
ist aber der steuernde Parameter (`src/utils/fufirePayloadMappers.ts:133,149,164,187`).
Ob FuFirE bei `birth_time_known:false` die übergebene Uhrzeit **ehrt** oder intern 12:00
einsetzt, ist nicht belegt: der einzige vorhandene Spike
(`scripts/fufire-unknown-time-spike.mts`) sendet ausgerechnet **12:00** und kann die beiden
Fälle deshalb nicht unterscheiden. Ehrt die Engine die Uhr nicht, kollabieren alle drei Samples
auf einen Chart und **jeder** Aspekt wird trivial `stable` — das Unsicherheitsfeature wäre ein
No-op, der maximale Sicherheit anzeigt. Mitigation: **Stufe 0 Engine-Spike, vor allem anderen.**

**R11 — Der Real-Boundary-Nachweis ist heute ein Mock-Lauf (NEU, Audit F-26, belegt).**
`playwright.config.ts:36,40` setzt in `webServer.env` hart
`FUFIRE_API_URL: http://localhost:${MOCK_PORT}` und `ENABLE_DEMO_PROFILES: "true"`.
`RELATIONSHIP_REAL_BOUNDARY=1` ist eine Variable des Runner-Prozesses und erreicht dieses `env`
nie. Der in Handoff, Plan, `TASK-014/015`, `AC-005`, `AC-007` und `DOD-002` als Realitätsbeleg
benannte Befehl läuft folglich gegen `tests/e2e/mock-fufire.mjs` mit Demo-Profilen — und wäre
grün geworden. Das ist exakt die Fehlerklasse, gegen die DEC-07/08 geschrieben wurden. Beide
Vorreviews haben sie nicht gefunden. Mitigation: Config-Fix (D10 öffnet die Datei) **plus** ein
Test, der beweist, dass der Real-Boundary-Lauf den Mock nicht erreicht.

**R12 — Ranking ist ein Urteil — mitigiert (D7).** Siehe §4. Ohne offengelegte Auswahlregel
wäre „kein Urteil" eine unbelegte Kernwertaussage.

**R13 — Keine Rechtsgrundlage, keine Art.-14-Information (NEU, belegt).** grep über `docs/`
nach legal basis / Art. 14 / DSGVO / GDPR: **null Treffer**. Eine von Person A angeklickte
Checkbox ist keine Einwilligung von Person B. `RISK-001` behandelt das rein als Wording.
Mitigation (D8): bis zur dokumentierten Rechtsprüfung ausschließlich **synthetische**
Zweitpersonen — in Prototyp, Fixtures und Tests. Damit fallen Drittdaten weg und die Lücke
liegt nicht auf dem kritischen Pfad zum Lernen.

**R14 — Der Plan selbst ist defekt (NEU, D9).** Der unabhängige Audit hat **30** bestätigte
Befunde erhoben, darunter widersprüchliche Musteranzahl (F-18: „mindestens drei" / „up to
three" / „zero to three"), doppelt vergebene AC-IDs mit unterschiedlicher Bedeutung in PRD und
Plan (F-16), `unknown`-Center = ausgerechnet 12:00 (F-17) und eine Kollision von `TASK-001` mit
dem bestätigten Scope (F-23). Der Plan wird deshalb **neu geschrieben**, nicht geflickt.
Die Diagnose lautet ausdrücklich *Nachweisführung defekt*, **nicht** *Produktidee falsch*.

---

## 9. Evidence needed

Status: **CONFIRMED**

**Belegt (Repo-Inspektion 2026-07-20):**
- `FuFirEClient.postWestern()` — `src/utils/fufireClient.ts:223`.
- `requireUserAuth` schützt `/api/me/profiles` — `src/server/app.ts:5,820`.
- Compute-Limiter — `src/server/app.ts:455` (`["/api/azodiac","/api/gemini"]`, Default 20).
- `compareProfiles` — `src/server/app.ts:32,688`; PA-Label `Synastry.tsx:242`.
- `BIRTH-TIME-01`-Invariante bereits implementiert — `src/utils/fufireNormalizer.ts:229-238`.
- Echte Live-Fixtures vorhanden — `src/__fixtures__/fufire/western.json` und
  `src/__fixtures__/fufire/unknown-time/western.json` (letzteres mit
  `provisional_fields: ["ascendant","houses","mc"]`). **In keinem Planungsartefakt zitiert.**
- Nichts vom neuen Flow existiert; TASK-001…015 unbegonnen.
- Baseline gemessen: `npm run lint` exit 0; `npm test` **57 Files / 783 Tests passed**, 8,54 s.
  Die `DOMException`-Zeilen stammen aus happy-dom, das ein externes Script nicht lädt
  (`AgentWidget.tsx:64`) — Rauschen, kein Failure.
- Toolchain: node v24.16.0, npm 11.13.0, `npm ci` erfolgreich.

**Pflichtbelege, bevor Feature-Code entsteht:**
1. **Engine-Spike (Stufe 0):** drei **verschiedene** Uhrzeiten × `birth_time_known:false` →
   Fixtures committen → belegen, dass die Body-Positionen auseinanderlaufen. Löst R10.
2. **Mock-Dichtigkeitstest:** beweisen, dass der Real-Boundary-Lauf `mock-fufire.mjs` nicht
   erreichen kann. Löst R11.
3. `npm run build` auf HEAD — bisher **ungeprüft**.

**Ausdrücklich ungeprüft (nicht als Prämisse weiterreichen):**
- Dass Nutzer evidenzgebundene Muster ohne Note als wertvoll erleben — die D3-Hypothese selbst.
- Dass FuFirE alle für den Transportvertrag nötigen Felder liefert. *Audit F-02: `EVD-004`
  zitiert dafür „FuFirE routers/western.py" mit Konfidenz 5/5 — eine Quelle, die in diesem Repo
  gar nicht existiert, während die echten Fixtures ungenutzt danebenliegen.*
- Dass fünf moderierte Sessions als erstes qualitatives Gate ausreichen (`INFO-008`).

---

## Allowed change scope

- src/types/relationship.ts
- src/utils/relationship/**
- src/api/relationshipClient.ts
- src/api/relationshipClient.test.ts
- src/components/relationship/**
- src/content/relationship/**
- src/styles/relationship.css
- src/server/relationshipTransport.ts
- src/server/app.relationship.test.ts
- src/__tests__/relationshipNoScore.test.ts
- src/__tests__/relationshipContrast.test.ts
- tests/e2e/relationship-real-boundary.spec.ts
- scripts/**
- playwright.config.ts
- src/__fixtures__/**
- docs/**

## Scope-Erläuterung (nicht maschinengelesen)

Status: **CONFIRMED** (D5 eng, durch **D10** gezielt geöffnet)

Fail-closed (Phase 0.6). Die Liste oben enthält **nur** Pfade, ohne Backticks und ohne Prosa —
`plumbline-scope-check` parst sie zeilenweise, und formatiertes Markdown macht sie unlesbar.
Ein maschinenlesbares Spiegelbild liegt in `docs/scope/western-synastry.scope.json`.

`scripts/**`, `playwright.config.ts` und `src/__fixtures__/**` sind durch **D10** geöffnet,
ausschließlich für Diagnose (Engine-Spike, R10) und Nachweis-Reparatur (R11).

**Weiterhin harter Stop mit Rückfrage** — bewusst **nicht** in der Liste oben:

| Datei | Wofür |
|---|---|
| `src/server/app.ts` | Route registrieren + `/api/relationships` in den Limiter (`:455`) |
| `src/App.tsx`, `src/components/PageShell.tsx` | Navigationseintrag. *Audit F-28: `renderTab()` bricht bei `!viewModel \|\| !birthData` vorher ab — der Eingriff ist größer als „additiv"* |
| `src/index.css` | Token-Import. *Audit F-29: ohne ihn wird `relationship.css` nie geladen* |
| `src/api/bazodiacClient.ts` | vermutlich vermeidbar |

**Nicht im Scope:** `src/utils/synastry.ts` · `src/components/Synastry.tsx` ·
`src/__tests__/synastryWording.test.ts` (P7-Bestand, D4) · `src/utils/interAspects.ts` und
`src/utils/fufireClient.ts` (nur lesend) · `src/server/app.ratelimit.test.ts` · `supabase/` ·
`package.json` · alles unter FuFirE.

---

## 10. Traceability links

- **PRD:** `docs/prd/prd_report.md` — Canvas-Link + AC-ID-Kollision (F-16) beim Neuschnitt nachzutragen
- **Product Vision:** `docs/vision/western-synastry.vision.md` — **noch nicht erstellt**
- **Traceability Matrix:** `docs/traceability.md` — Canvas-Felder in Phase 1 nach GO
- **Audit:** `docs/reviews/2026-07-20-independent-blindspot-audit.md`
- **True-Line status:** `draft`

---

## User confirmation

**Confirmed by user:** yes
**Confirmation date:** 2026-07-20 (Amendment 2)
**Confirmed by:** Benjamin Poersch (Product Owner)
**Confirmation note:** Erneute Bestätigung nach Council und unabhängigem Audit, ausdrücklich
einschließlich der Korrektur in §1 (Häuser/Achsen sind durch `BIRTH-TIME-01` bereits
geschützt — Amendment 1 hatte das falsch behauptet und war in dieser falschen Fassung
bestätigt worden), der neuen Stufenfolge D6 und der Zusage, bei negativem Engine-Spike (R10)
zu stoppen und zu berichten statt weiterzubauen.

### Entscheidungsprotokoll dieses Laufs

| # | Entscheidung | Wirkung |
|---|---|---|
| D1 | Zielrepo `astro-synestrie`, Fork mit voller New_Bazi-Historie | Repo umgebaut, `upstream` erhalten |
| D2 | Lauf-Scope TASK-001…013 | durch D6 überholt — neuer Schnitt folgt |
| D3 | Warum jetzt: **Marktvalidierung vor Investment** | trägt D6 |
| D4 | R5 = Score-Scan auf neuen Flow begrenzen | P7-Bestand unberührt |
| D5 | Allowed change scope eng | Bestandsdateien = harter Stop |
| D6 | **Fixture-Prototyp zuerst, dann Usability-Gate** | §5 neu geordnet |
| D7 | **Auswahlregel im UI sichtbar machen** | §4 ergänzt, R12 mitigiert |
| D8 | **Synthetische Zweitpersonen bis zur Rechtsprüfung** | R13 vom kritischen Pfad |
| D9 | **Plan wird neu geschrieben** | R14 |
| D10 | **Scope geöffnet für `scripts/`, `playwright.config.ts`, `src/__fixtures__/`** | Stufe 0 + R11-Fix möglich |

### Was du mit dem Re-Confirm mitbestätigst

1. **§1 war sachlich falsch und ist korrigiert.** Häuser und Aszendent sind bereits durch
   `BIRTH-TIME-01` geschützt; nur der Mond ist ungeschützt. Amendment 1 hatte das zu breit
   behauptet — und du hattest es in dieser falschen Fassung bestätigt.
2. **R10 kann das Feature kippen.** Ergibt der Engine-Spike, dass FuFirE die übergebene Uhrzeit
   bei `birth_time_known:false` ignoriert, ist DEC-03 hinfällig und der Lauf stoppt mit Report —
   kein Weiterbauen auf einer toten Annahme.
3. **R11 bleibt offen, bis der Config-Fix und sein Dichtigkeitstest stehen.** Bis dahin darf
   kein Ergebnis als `real-boundary-smoke` bezeichnet werden.
4. **Keine öffentliche Freigabe**, keine echten Zweitpersonendaten.

**Original Goal Status:** NOT DONE — der Real-Data-Durchstich (DEC-08) ist nicht erreicht.
**Current Iteration Status:** Intake abgeschlossen, Nachweis-Apparat als defekt erkannt,
Neuplanung freigegeben. Die beiden Zeilen bleiben getrennt.
