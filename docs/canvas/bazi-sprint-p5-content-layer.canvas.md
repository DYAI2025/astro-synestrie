# Product Canvas: BaZi Sprint P5 — Content Layer

**Feature-Slug:** `bazi-sprint-p5-content-layer`
**Status:** user-confirmed
**Erstellt:** 2026-06-12
**Bestätigungsphrase:** "Canvas P5 bestätigt"

---

## 1. Problem

**Explicit** (Sprint-Plan P5, Task-Präambel):
New_Bazi zeigt in der Overview Karten für Sternzeichen, Mond, Aszendent, BaZi-Tier, Säulen, Himmelsstämme, Erdzweige und dominantes Element — aber jede Karte ist eine abgeschlossene Zahl oder ein Label ohne Erklärung. Nutzerinnen, die nicht wissen was „辛 Metall–" bedeutet oder warum das 2. Haus relevant ist, erhalten keinerlei Einordnung. Die Häuser-Sektion in WesternAstrology und die BaZi-Säulen-Ansicht liefern Rohdaten, aber keine Substanz: was dieser Himmelsstamm im Kontext der eigenen Geburt bedeutet, wird nirgends erklärt. Das Ergebnis ist eine App, die dem Nutzerprofil nur dann Sinn ergibt, wenn man die Symbolsysteme bereits kennt — genau das Gegenteil des Entertainment/Reflexion-Anspruchs.

## 2. Zielnutzer/Kundin

**Explicit** (aus Canvas P1/P2, user-confirmed 2026-06-11):
Neugierige Erwachsene 25–45, keine tiefen BaZi-Vorkenntnisse, nutzen New_Bazi zum Erkunden von Mustern — Entertainment/Reflexion-Positionierung. Nutzerinnen wollen verstehen, was die angezeigte Symbolik für ihr konkretes Profil bedeutet, ohne vorher ein Studium abschließen zu müssen.

## 3. Bisheriger Workaround

**Explicit** (Sprint-Plan P5, Kontext):
Kein Workaround vorhanden. Nutzerinnen verlassen die App oder öffnen eine externe Suche (Wikipedia, Horoskop-Sites), wenn sie verstehen wollen, was ein angezeigte Erdbranch oder ein Haus bedeutet. Kein In-App-Erklär-Angebot existiert; die Häuser-Sektion ist eine unkommentierte Liste von Zeichen und Planeten.

## 4. Value Proposition

**Explicit** (Sprint-Plan P5, Goal + Architecture):
- Jede Overview-Karte wird klickbar und öffnet einen Erklär-Layer — ein Drawer im Glass-Card-Stil, der das Symbol, den Titel und einen 60–120 Wörter langen Erklärtext mit konkretem Datenanker zeigt (z. B. „— in deinem Profil: Sonne 24.1° Zwillinge").
- Alle 55 Einträge (12 Tierkreiszeichen, 10 Himmelsstämme, 12 Erdzweige + Tiere, 5 Elemente, 4 Säulen, 12 Häuser) werden in einer typengesicherten Content-Registry (`src/content/registry/`) als Build-Time-Content hinterlegt — kein CMS, kein Fetch, kein Laufzeit-Risiko.
- Texte stammen aus dem Astro-Noctum-Ersatzteillager (READ-ONLY) und werden bei Lücken nach festen Stil-Regeln kuratiert (markiert als `source: "curated"`).
- Häuser-Sektion erhält Substanz: Thema, Spitzen-Zeichen und kombinierte Interpretation pro Haus.
- BaZi-Säulen-Tab erhält Tiefe: Lebensbereich, Stamm-Erklärung mit Element und Polarität, Zweig-Erklärung mit Tier und Hidden Stems.
- Anti-Reification durchgehend: kein Schicksal-, Diagnose-, Coaching- oder Heilungswording; Ton edel, ruhig, präzise.

## 5. Erfolgssignal

**Explicit** (Sprint-Plan P5, Task 2 Tests + Task 6 Gates):
1. `registry.test.ts` vollständig grün: 55 Einträge vollständig (12+10+12+5+4+12), jede `long`-Eigenschaft 60–120 Wörter, Anti-Reification-Regex (kein „Du bist", „Schicksal", „musst") schlägt für keinen Eintrag an, `source` für jeden Eintrag gesetzt.
2. Chinesische Tabellen konsistent mit `src/utils/` (HEAVENLY_STEMS / EARTHLY_BRANCHES) — Pinyin/Element/Polarität/Tier stimmen überein, keine duplizierten Felder.
3. e2e-Tests grün: Klick auf Sonnen-Karte öffnet Layer mit Zwillinge-Text und Anker-Grad; Klick auf Tagessäule öffnet Stamm+Zweig-Erklärung; Esc schließt Layer; `data-testid="explanation-layer"` präsent.
4. Aszendent `null` (P4-Integration): Layer öffnet sich und zeigt „Aszendent nicht berechenbar"-Erklärung statt einem Fehler.
5. `npm run lint && npm test && npm run build && npx playwright test` — Zahlen vorher/nachher, keine Regressionen, P1-Regressionstests bleiben grün.
6. Live-Smoke mit Screenshot zweier geöffneter Layer nach Deploy.
7. `docs/contracts/content-sources.md` existiert (Task 1 Output: Tabelle Content-Typ → Quelldatei → Qualität).

## 6. Kern-Use-Case

**Explicit** (Sprint-Plan P5, Task 3):
Nutzerin berechnet ihr Profil → sieht Overview-Karte „Sonne: Zwillinge ♊" → klickt → ExplanationLayer fährt von rechts ein → zeigt Symbol groß, Titel „Zwillinge", 60–120-Wörter-Erklärtext, darunter den Datenanker „— in deinem Profil: Sonne 24.1° Zwillinge" → versteht, was das Symbol im Kontext ihres Profils bedeutet → schließt per Esc oder Klick auf Backdrop. Gleiches Muster für BaZi-Säule Tag: Layer zeigt Himmelsstamm-Erklärung, Erdzweig-Erklärung, Hidden Stems, Deep-Link zum BaZi-Tab.

**Assumption (aus Plan abgeleitet):**
Die Nutzerin wechselt nach dem Lesen des Layers in den BaZi-Tab und findet dort die vertiefte Säulen-Ansicht mit Lebensbereichen — der Layer fungiert als Einstieg, der Tab als Vertiefung.

## 7. Non-Goals (explizit)

**Explicit** (Sprint-Plan P5, Risiken + YAGNI-Markierungen):
- Keine volle house×sign-Matrix (12×12 Kombinationstexte) — MVP ist Haus-long + Zeichen-short kombiniert; vollständige Matrix ist als MISSING im PR zu listen.
- Keine Planet-in-Haus-Einzeltexte — Folge-Iteration.
- Kein CMS oder API-Fetch — Build-Time-Content ausschließlich.
- Keine Dayun-Erklärungen — folgt mit P2/B-012.
- Kein Scope-Creep in andere Komponenten außerhalb des erlaubten Änderungs-Scopes.
- Kein Neuschreiben von A14-Fix-Texten aus P1 (Tagesmeister-Vertiefung wiederverwendet bestehende Texte — kein Duplikat).
- Kein Commit in das Astro-Noctum-Repo (READ-ONLY).

## 8. Risiken / Widersprüche

**Explicit** (Sprint-Plan P5, Risiken-Abschnitt):
- **GRÖSSTES RISIKO — Text-Qualität:** 55 Texte à ~90 Wörter sind der größte Einzelaufwand des Sprints. Der Review-Agent (Master §6) MUSS alle Registry-Texte vollständig lesen (Stilregeln + fachliche Plausibilität). Bei vorhandenen Astro-Noctum-Quelltexten gilt: 1:1 übernehmen schlägt Umformulieren. Kein Text wird „aus dem Kopf" des Executors übernommen, ohne ihn als `curated` zu markieren.
- **Quell-Pfade unverifiedt:** Die Astro-Noctum-Kandidaten-Pfade in Task 1 sind Suchvorschläge — der Executor MUSS die Pfade vor jedem Portieren verifizieren (`grep -rln`). Falls Quelltexte nicht gefunden werden, ist Kuratierung Pflicht; fehlt ein ganzer Domänen-Typ, ist das als MISSING in `docs/contracts/content-sources.md` festzuhalten. **OPEN QUESTION:** Liegen Erdzweig- und Häuser-Texte in Astro-Noctum vollständig vor? (Task 1 klärt das — vor Task 2/3 obligatorisch.)
- **P4-Abhängigkeit (Aszendent null):** P5 kann parallel zu P4 entwickelt werden. ExplanationLayer braucht nur einen Null-Check (`if (viewModel.western.ascendant === null)`). Kein Blocker, aber der e2e-Test für den null-Aszendent-Layer setzt P4-Fixture voraus.
- **BaZi-ViewModel-Felder (Hidden Stems):** Task 5 setzt voraus, dass `bazi.pillars[]` Hidden-Stems-Daten trägt. **OPEN QUESTION:** Welche Felder liefert das ViewModel für Hidden Stems — verifiziert der Executor in `src/utils/` vor Beginn von Task 5. Dieses Risiko darf nicht als Assumption forwarded werden.
- **Konsistenz chinesischer Tabellen:** Registry darf keine Astro-Logik duplizieren — IDs müssen mit `HEAVENLY_STEMS`/`EARTHLY_BRANCHES` in `src/utils/` übereinstimmen. Diakritik-Toleranz (Pinyin mit/ohne Diakritika) ist bereits in `src/utils/` vorhanden; Registry nutzt diese Mapping-Logik, schreibt sie nicht neu.
- **Anti-Reification-Regression:** P1-Texte wurden bereits bereinigt. P5 darf keine neuen Stil-Regelverstöße einführen — `registry.test.ts`-Regex ist die Absicherung.
- **Split-PR-Option:** Bei Zeitdruck können Domänen auf zwei PRs aufgeteilt werden (zodiac+houses zuerst, BaZi-Domänen zweiter PR). Dies ist ein explizites Ventil, kein Qualitätsverzicht.

## 9. Evidence Needed

**Explicit** (Sprint-Plan P5, Tasks 1–6):
- Task 1: `docs/contracts/content-sources.md` mit Quell-Mapping-Tabelle (Content-Typ → Datei → Qualität vollständig/lückenhaft/fehlt) als Pflicht-Gate vor Task 2.
- Task 1: Verifizierter Befund zu Hidden-Stems-Feldern im ViewModel (schriftlich im contracts-Dokument oder als Kommentar im PR).
- Task 2: TDD-Beweise (RED/GREEN) für `registry.test.ts` je Domänen-Datei; Wortanzahl-Check-Output.
- Task 3: e2e-Spec-Output (Playwright): Layer öffnet/schließt, Aszendent-null-Fall.
- Task 4: Häuser-Sektion mit substanziellen Deutungen live — Screenshot im PR oder Smoke-Nachweis.
- Task 5: BaZi-Säulen-Tab mit Lebensbereichen, Stamm/Zweig/Hidden-Stems-Erklärungen — Playwright-Output oder Screenshot.
- Task 6: `npm run lint && npm test && npm run build && npx playwright test` Zahlen vorher/nachher. Live-Smoke mit Screenshot zweier geöffneter Layer auf `newbazi-production.up.railway.app`.

## 10. Traceability

- MASTER: `docs/plans/2026-06-11-MASTER-fullfeature-roadmap.md`
- P5-Plan: `docs/plans/2026-06-11-sprint-p5-content-layer.md`
- Astro-Noctum-Quelle (READ-ONLY): `/Users/benjaminpoersch/Projects/codebase/Bazodiac-WebApp/Astro-Noctum` und `/Users/benjaminpoersch/Projects/Astro-Noctum`
- canvas-link: `docs/canvas/bazi-sprint-p5-content-layer.canvas.md`
- Erlaubter Änderungs-Scope:
  - `src/content/registry/types.ts` (neu)
  - `src/content/registry/zodiacSigns.ts` (12 Einträge)
  - `src/content/registry/stems.ts` (10 Einträge)
  - `src/content/registry/branches.ts` (12 Einträge)
  - `src/content/registry/elements.ts` (5 Einträge)
  - `src/content/registry/pillars.ts` (4 Einträge)
  - `src/content/registry/houses.ts` (12 Einträge)
  - `src/content/registry/registry.test.ts` (neu)
  - `src/components/ExplanationLayer.tsx` (neu)
  - `src/components/Overview.tsx` (modifiziert — Karten klickbar)
  - `src/components/WesternAstrology.tsx` (Häuser-Sektion Vertiefung)
  - `src/components/BaZiDetail.tsx` (Säulen-Vertiefung)
  - `docs/contracts/content-sources.md` (neu, Task 1 Output)
  - `tests/e2e/` (neue Spec für click-to-open)
- Abhängige Canvases: `docs/canvas/bazi-sprint-p1-p2-ehrlichkeit.canvas.md` (Zielnutzer, Anti-Reification), `docs/canvas/bazi-sprint-p3-supabase-foundation.canvas.md` (Profil-Kontext)
- P4-Schnittstelle: ExplanationLayer null-Aszendent-Handling setzt P4-Fixture voraus (nicht Blocker, aber e2e-Abhängigkeit dokumentiert)
