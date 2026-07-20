# Traceability Matrix — Western Synastry

**Feature-Slug:** `western-synastry`
**Status:** `intake-baseline` — Stand 2026-07-21
**Erstellt:** 2026-07-21 aus `docs/prd/prd_report.json` (`traceability_matrix`, 27 Zeilen)
**Canvas:** [western-synastry.canvas.md](../canvas/western-synastry.canvas.md) (user-confirmed, Amendment 2)
**Vision:** [western-synastry.vision.md](../vision/western-synastry.vision.md) (user-confirmed, 2026-07-21)

> **Implementierungsstand: null.** Keine Anforderung ist umgesetzt. Jede Zeile steht auf
> Evidenzklasse `not-implemented`. Diese Matrix ist die Ausgangsaufnahme, kein Fortschrittsbericht.
> `TASK-*` und `TEST-*` verweisen auf den **alten** Plan, der nach D9 neu geschrieben wird —
> die Spalten bleiben, damit die Neuschrift nachweisen muss, wo jede Anforderung landet.

---

## Die sechs Canvas-Wertfelder

| Kürzel | Canvas-Feld |
|---|---|
| **C1** | Problem — Score als Scheinurteil · stille 12:00 beim Mond · fehlende Einwilligung |
| **C2** | Zielnutzer — angemeldete Person, die Muster reflektieren will, ohne Urteil |
| **C3** | Heutiger Workaround — alter Synastry-Tab, PA-Wert, Rest interpoliert |
| **C4** | Wertversprechen — echte Berechnung · Unsicherheit sichtbar · Substanz statt Umfang · kein verstecktes Urteil · Einwilligung als Erklärung |
| **C5** | Erfolgssignal — Stufe 1 Verständnis/Nachfrage, Stufe 2 Realitätsnachweis |
| **C6** | Kern-Use-Case — Profil → Partner → Prüfung/Zustimmung → echte Rechnung → wenige Muster |

Eine Anforderung ohne Canvas-Bezug ist ein Kandidat zum Streichen. Zwei sind unten markiert.

---

## Matrix

| Requirement | Canvas | Acceptance | Tests | Tasks (alt) | Risks | Evidenzklasse |
|---|---|---|---|---|---|---|
| `FR-001` Eigenes Profil serverseitig über Eigentum auflösen | C6, C2 | AC-002, AC-005 | TEST-003, TEST-004, TEST-006 | TASK-004, 007, 008, 014 | RISK-006 | `not-implemented` |
| `FR-002` Partnerdaten ohne automatische Persistenz | C6 | AC-012 | TEST-011 | TASK-005, 008, 012, 015 | — | `not-implemented` |
| `FR-003` Zustimmungserklärung + Textversion vor Upstream | C1, C4 | AC-001 | TEST-001 | TASK-003, 006, 007, 008 | RISK-001 | `not-implemented` |
| `FR-004` Zeitmodi exact/approximate/unknown, transiente Präzisierung | C1, C4 | AC-002, AC-003, AC-004 | TEST-002 | TASK-002, 003, 005 | RISK-002 | `not-implemented` |
| `FR-005` Reale Western-Samples, Coverage-Schwelle ⚠️ **D11** | C4, C5 | AC-003, AC-004, AC-005, AC-009 | TEST-002, 004, 005, 006, 009 | TASK-002, 007, 008, 010, 014 | RISK-002, RISK-004 | `not-implemented` |
| `FR-006` Inter-Aspekt-Evidenz, Stabilität, wenige Muster | C4 | AC-007 | TEST-005 | TASK-010, 011 | RISK-002, RISK-003 | `not-implemented` |
| `FR-007` Kein Score, kein Beziehungsurteil | C1, C4 | AC-006 | TEST-007 | TASK-001, 011, 012 | — | `not-implemented` |
| `FR-009` Tiefenausbau erst nach Human Gate | C5 | AC-008 | — | TASK-016, 017 | RISK-005 | `not-implemented` |
| `FR-010` Erster E2E über echte Auth/Profil/BFF/FuFirE-Grenzen | C4, C5 | AC-005 | TEST-006 | TASK-014, 015 | RISK-004 | `not-implemented` ⚠️ **R11** |
| `NFR-001` Responsiv bei 320/768/1440 | C6 | ❌ **siehe F-34** | TEST-008 | TASK-013, 014, 015 | RISK-005 | `not-implemented` |
| `API-001` Authentifizierter POST /api/relationships/western-synastry | C6 | AC-001…AC-005 | TEST-001…004, 006 | TASK-002, 003, 007, 008, 014 | RISK-001, 002, 006 | `not-implemented` |
| `API-002` Fehlende Zustimmung → 422 vor jedem FuFirE-Call | C4 | AC-001 | TEST-001 | TASK-007, 008 | RISK-001 | `not-implemented` |
| `API-003` Nur bestehender FuFirE-Endpunkt | C4 | AC-005 | TEST-004, TEST-006 | TASK-008, 014 | RISK-004 | `not-implemented` |
| `API-004` Antwort kennzeichnet Attestierung als nicht verifiziert | C4 | AC-001 | TEST-001 | TASK-006, 007, 008 | RISK-001 | `not-implemented` |
| `API-005` BFF liefert kein Dimensionsprofil / View-Model | C4 | AC-009 | TEST-004, TEST-005 | TASK-008, 009, 010, 011 | RISK-003 | `not-implemented` |
| `API-006` Fremde/fehlende Profil-ID → 404, null Upstream | C6 | AC-002 | TEST-003, TEST-004 | TASK-007, 008 | RISK-006 | `not-implemented` |
| `API-007` Rate-Limit-Gruppe, 429 vor Fan-out | — ⚠️ **F-35** | AC-010 | TEST-010 | TASK-007, 008, 015 | — | `not-implemented` |
| `ARCH-001` FuFirE bleibt Rechenquelle, unverändert | C4 | AC-005 | TEST-004, TEST-006 | TASK-008, 014 | RISK-003 | `not-implemented` |
| `ARCH-002` BFF besitzt Auth, Owner-Filter, Consent, Sampling, Redaction | C6 | AC-001, 002, 006, 010 | TEST-001, 003, 004, 009, 010 | TASK-002, 003, 007, 008 | RISK-001, 002, 006, 007 | `not-implemented` |
| `ARCH-003` Frontend besitzt Produktanalyse | C4 | AC-007 | TEST-005 | TASK-010, 011, 017 | RISK-003 | `not-implemented` |
| `ARCH-004` `compareProfiles` im neuen Flow verboten | C1, C4 | ❌ **siehe F-34** | TEST-007 | TASK-001, 011, 012 | — | `not-implemented` |
| `SEC-001` Zustimmung nie als extern verifiziert dargestellt | C1, C4 | AC-001 | TEST-001 | TASK-003, 006, 007, 008 | RISK-001 | `not-implemented` |
| `SEC-002` Namen/Daten/Orte aus Logs redigiert | — ⚠️ **F-35** | AC-005 | TEST-004, TEST-006 | TASK-008, 015 | RISK-004 | `not-implemented` |
| `SEC-003` FuFirE- und Supabase-Secrets bleiben serverseitig | — ⚠️ **F-35** | AC-005 | TEST-012 | TASK-008, 013, 015 | — | `not-implemented` |
| `SEC-004` Route verlangt Auth, löst `id + user_id` auf | C6 | AC-002, AC-005 | TEST-003, 004, 006 | TASK-004, 007, 008, 014 | RISK-006 | `not-implemented` |
| `SEC-005` BLOCKER: öffentliche Freigabe erst nach Textprüfung | C5 | AC-013 | TEST-013 | TASK-016 | RISK-001, RISK-005 | `not-implemented` |
| `SEC-006` Endpunkt in Rate-Limit-Gruppe, Ablehnung vor Fan-out | — ⚠️ **F-35** | AC-010 | TEST-010 | TASK-007, 008, 015 | — | `not-implemented` |

---

## Beim Aufbau dieser Matrix gefundene Defekte

Nicht stillschweigend repariert. Die Neuschrift (D9) muss sie schließen.

### F-33 — `AC-011` existiert nur im Plan, nicht im PRD

`docs/plans/2026-07-19-western-synastry-mvp-throughline.md:260` definiert `AC-011 — Usability
gate`. Die PRD-Liste `acceptance_criteria` springt von `AC-010` auf `AC-012`; ein `AC-011`
existiert dort **nicht**. Das ist `F-16` (kollidierende AC-Namensräume) in konkreter Form: eine
Plan-Akzeptanz ohne PRD-Gegenstück. Zu entscheiden ist, ob das Usability-Gate ein AC ist oder
ein Gate — beides zugleich geht nicht.

### F-34 — Die PRD-Matrix mappt zwei Anforderungen auf ein unpassendes AC

Beide Zeilen zeigen im Original auf `AC-008` (*„Depth work begins only after the real MVP
evidence gate and a recorded usability decision"*):

- `ARCH-004` (`compareProfiles` im neuen Flow verboten) → gehört zu **`AC-006`**
  (*„New flow contains no score or relationship verdict"*). Oben korrigiert markiert, nicht
  ersetzt. **Wirkung:** die Score-Verbots-Anforderung war an ein Gate gehängt, das mit ihr
  nichts zu tun hat — der wichtigste Nachweis des Produkts hing an der falschen Prüfung.
- `NFR-001` (responsiv bei 320/768/1440) → hat **gar kein passendes AC**. Im PRD existiert
  keine Akzeptanz für responsives Verhalten. Entweder fehlt ein AC, oder `NFR-001` ist im MVP
  nicht abnahmerelevant. Zu entscheiden, nicht zu raten.

### F-35 — Vier Anforderungen ohne Bezug zu einem Canvas-Wertfeld

`API-007`, `SEC-002`, `SEC-003`, `SEC-006` lassen sich keinem der sechs bestätigten Wertfelder
zuordnen. Das ist **kein** Streichvorschlag: es sind Sicherheits- und Kostenkontrollen, die
richtig und notwendig sind. Es zeigt eine Lücke im **Canvas**, nicht in den Anforderungen —
der bestätigte Canvas formuliert kein Wertversprechen zu Datensparsamkeit, Log-Hygiene und
Missbrauchsgrenzen, obwohl das Produkt fremde Geburtsdaten verarbeitet. Beim nächsten
Canvas-Amendment vorzulegen.

---

## Abdeckungslücken

| Lücke | Konsequenz |
|---|---|
| `FR-008` fehlt in der PRD-Matrix | Nummernsprung FR-007 → FR-009. Entweder gestrichen oder vergessen; nicht dokumentiert. |
| `FR-009` hat **keinen** Test | Das Gate „Tiefenausbau erst nach Human Gate" ist unprüfbar. |
| `FR-005` beschreibt `sampling-v1` | Durch **D11** überholt. Der Produktkern bleibt, der Mechanismus wird ersetzt; Formulierung in der Neuschrift anzupassen. |
| `FR-010` / `AC-005` | Der benannte Nachweis läuft heute gegen den Mock — **R11/F-26**. Bis zum Fix ist diese Zeile nicht abnahmefähig. |
| `REL-HONESTY-01` fehlt ganz | Die aus D11 entstehende Ehrlichkeitspflicht hat noch **keine** Anforderungs-ID. In der Neuschrift anzulegen. |

---

## Evidenzklassen-Vokabular

`not-implemented` → `unit-fake` → `integration-fake` → `real-boundary-smoke` → `production-verified`

Jedes I/O-, Remote- oder UI-Feature, das auf `*-fake` steht, gilt als **ROT** — unabhängig davon,
wie viele Tests grün sind. „Tests grün" und „das zusammengesetzte System liefert den Wert" sind
zwei verschiedene Aussagen und werden hier nie zu einer verschmolzen.
