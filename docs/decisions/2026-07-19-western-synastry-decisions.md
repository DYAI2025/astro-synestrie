# Western Synastry — Entscheidungsprotokoll

Status: accepted-for-MVP
Date: 2026-07-19
Scope: New_Bazi Western-Synastry-MVP

## Acht bestätigte Produkt- und Umsetzungsentscheidungen

### DEC-20260719-01 | Einwilligung als Nutzerbestätigung, nicht als Verifikation

**Entscheidung.** Die Anwendung kann die tatsächliche Zustimmung der zweiten Person nicht verifizieren. Der Nutzer muss verbindlich bestätigen, dass die zweite Person der Verarbeitung ihrer Daten zugestimmt hat. Das BFF akzeptiert den Request nur mit `secondPersonConsentConfirmed: true` und einer versionierten Textkennung.

**Konsequenz.** Fehlendes oder falsches Flag führt zu HTTP 422. UI, API und Logs dürfen nicht behaupten, die Zustimmung sei unabhängig geprüft worden.

### DEC-20260719-02 | Grobe Zeitfenster statt erfundener Exaktheit

**Entscheidung.** Pro Person gibt es `exact`, `approximate` und `unknown`. Bei `approximate` wählt der Nutzer ein grobes Tageszeitfenster.

**Reversibler Produktstandard `time-band-v1`.** Nacht 00:00–05:59, Morgen 06:00–08:59, Vormittag 09:00–11:59, Nachmittag 12:00–17:59, Abend 18:00–23:59. Die Grenzen sind Produkttokens, kein FuFirE-Vertrag.

**Konsequenz.** Ein bestehendes eigenes Profil mit unbekannter Zeit darf für diese Analyse transient durch ein Zeitfenster präzisiert werden; das gespeicherte Profil wird dadurch nicht still verändert.

### DEC-20260719-03 | Sichtbarer Unsicherheitsbereich statt Weglassen des Mondes

**Entscheidung.** Zeitabhängige Signale werden bei ungenauer Zeit nicht pauschal entfernt. Die App zeigt einen begrenzten Unsicherheitsbereich und kennzeichnet die Aussage sichtbar.

**Reversible Implementierungsannahme `sampling-v1`.** Approximate und unknown werden an Start, Mittelpunkt und Ende des Bereichs abgetastet. `stable` verlangt denselben Aspekttyp in allen Sample-Paaren. `provisional` verlangt denselben Aspekttyp im kanonischen Mittelpunkt-Paar und in mindestens `ceil(totalPairs / 2)` aller Sample-Paare. Sonst gilt das Signal als `unavailable` und wird nicht als Kernaussage verwendet. Das ist eine diskrete Näherung, kein Beweis für jeden Zeitpunkt des Intervalls.

### DEC-20260719-04 | Beziehungsdimensionen bleiben vorerst in der Produktschicht

**Entscheidung.** Emotionale Resonanz, Kommunikation, Zuneigung und Anziehung, Nähe und Autonomie, Konflikt und Reparatur sowie gemeinsame Ressourcen werden in New_Bazi als versionierte Produktkonfiguration umgesetzt.

**Konsequenz.** FuFirE erhält im MVP keinen Dimensionsvertrag. Ein separates Backlog-Ticket `API-001` prüft später die Promotion stabiler Regeln.

### DEC-20260719-05 | Produktnormalisierung im Frontend, Trust Boundary im BFF

**Entscheidung.** Das BFF validiert, authentifiziert, prüft Profileigentum, begrenzt, orchestriert, redigiert und liefert einen Transportvertrag. Inter-Aspekte, Stabilität, Dimensionszuordnung und Priorisierung bleiben für dieses Produkt im Frontend.

**Konsequenz.** Das BFF liefert kein `RelationshipAnalysisViewModel`. Ein späterer zweiter Consumer löst eine erneute API-Entscheidung aus.

### DEC-20260719-06 | Vertikale, testbare Kundenwert-Slices mit TDD

**Entscheidung.** Stories werden weder in wertlose Mikroaufgaben noch in mehrwöchige Epics zerlegt. Jede Story endet in beobachtbarem Nutzerwert. Verträge und Domainlogik werden test-first entwickelt.

**Konsequenz.** Jede Story besitzt Akzeptanzkriterien, fokussierte Tests, einen Rückbauweg und eine Evidenzklasse.

### DEC-20260719-07 | E2E sobald der erste vollständige Flow steht

**Entscheidung.** Der erste Browser-End-to-End-Test entsteht, sobald Profil → Partner → Consent → reale Berechnung → Ergebnis durchläuft. Der MVP-E2E trifft die reale FuFirE- und Profilgrenze; ein gemockter Browserfluss ist kein MVP-Meilenstein.

**Konsequenz.** Testdoubles bleiben auf isolierte Unit- und Route-Vertragstests beschränkt und dürfen niemals den Real-Boundary-Claim tragen.

### DEC-20260719-08 | Real-Data-MVP-Durchstich vor Tiefenausbau und Usability-Gate

**Entscheidung.** Der erste Release-Slice nutzt ein echtes oder bestehendes Nutzerprofil, echte Nutzereingaben und echte FuFirE-Berechnungen. Er erzeugt einen vereinfachten, substanziellen Vergleich. Keine Demo-Profile, fest verdrahteten Ergebniswerte, Placeholder oder gemockten Upstream-Antworten dürfen den Durchstich belegen.

**Konsequenz.** Nach dem Durchstich folgt ein moderiertes Usability-Gate. Erst danach werden alle sechs Dimensionen, Explorer, Print und narrative Tiefe ausgebaut.

## Aus der Planprüfung übernommene technische Invarianten

### TECH-INV-01 | Geometrische Symmetrie und Rollenrichtung trennen

Ein Aspekt ist geometrisch symmetrisch, speichert aber Person-A-Körper und Person-B-Körper getrennt. Perspektivtexte dürfen die Rollen unterscheiden, ohne kausale Wirkung zu behaupten.

### TECH-INV-02 | Kein generisches `confidence`

Präzision wird in `dataPrecision`, `sampledStability`, `ruleStatus` und `interpretationStatus` getrennt. Sprachliche Flüssigkeit darf keine höhere Sicherheit suggerieren.

### TECH-INV-03 | Eigenes Profil wird serverseitig über Eigentum aufgelöst

Der neue BFF-Endpunkt ist authentifiziert und erhält `personAProfileId`. Er lädt das Profil mit `id + user_id`; ein fremdes oder fehlendes Profil ergibt 404 und null FuFirE-Aufrufe.

### TECH-INV-04 | Kosten- und Missbrauchsgrenze

Der neue Relationship-Endpunkt wird in den bestehenden Compute-Rate-Limiter aufgenommen. Maximal drei Samples pro Person und sechs FuFirE-Aufrufe pro Request.

---

# Nachtrag 2026-07-21 — Entscheidungen aus dem `/agileteam`-Durchlauf

Die Laufentscheidungen **D1–D10** sind in den Canvas-Amendments 1 und 2 dokumentiert
(`docs/canvas/western-synastry.canvas.md`). Hier stehen die beiden Entscheidungen, die den
obenstehenden Entscheidungsbestand **verändern**.

### D11 | `sampling-v2` — explizite Uhrzeiten statt `birth_time_known:false`

**Bestätigt durch Nutzer:** 2026-07-21. **Ersetzt** die reversible Implementierungsannahme
`sampling-v1` aus `DEC-20260719-03`. Der **Produktkern** von DEC-03 — sichtbarer
Unsicherheitsbereich statt Weglassen des Mondes — bleibt unverändert gültig; nur der
Mechanismus wird ausgetauscht.

**Auslöser.** `F-31` (`docs/reviews/2026-07-21-post-audit-findings.md`): bei `timeKnown:false`
überschreibt `src/utils/birthInputValidation.ts:97` die Uhrzeit hart mit `12:00`, und das
Typsystem lässt keinen Payload-Pfad daran vorbei. `sampling-v1` war auf dem Produktionspfad
nicht ausführbar. `F-32`: ein Flag kann nicht gleichzeitig „Zeit unbekannt" und „rechne genau
diese Uhrzeit" bedeuten.

**Entscheidung.** Abgetastet wird mit `birth_time_known:true` und **expliziten** Uhrzeiten an
Anfang, Mitte und Ende des angegebenen Zeitfensters. Die Unsicherheit wird vollständig in der
eigenen Aggregationsschicht ausgedrückt, nicht an die Engine delegiert.

**Folgen.**
- `R10a` ist geschlossen — der 12:00-Pfad wird nicht mehr benutzt.
- `R10b` (ehrt FuFirE die Uhrzeit bei `false`?) liegt **nicht mehr auf dem kritischen Pfad**.
  Der Spike `scripts/fufire-clock-honouring-spike.mts` bleibt als Diagnose erhalten, ist aber
  kein Gate mehr.
- **Canvas §5 „Stufe 0" ist damit überholt.** Der Live-Aufruf mit drei Uhrzeiten und
  `birth_time_known:false` entfällt als Pflichtvorstufe. Die Einarbeitung in den Canvas erfolgt
  **gemeinsam mit der Plan-Neuschrift (D9)**, damit der Nutzer einmal statt zweimal
  nachbestätigt. Bis dahin gilt dieser Absatz als die verbindliche Fassung — der bestätigte
  Canvas enthält an dieser Stelle wissentlich einen überholten Abschnitt, und das wird hier
  benannt statt stillschweigend gelassen.
- `src/utils/birthInputValidation.ts` bleibt ein Hard Stop und wird **nicht** geöffnet.

**Neue Pflicht, die aus dieser Entscheidung entsteht — `REL-HONESTY-01`.**
Mit `birth_time_known:true` markiert `fufireNormalizer` nichts als provisorisch, obwohl die Zeit
unsicher ist. Die Ehrlichkeitspflicht wandert damit von der Engine in unseren Code. Zwingend im
neuen Plan zu verankern und als Test zu führen:
1. Kein einzelner Sample-Chart darf je als „dein Chart" oder als Geburtszeit einer Person
   angezeigt werden.
2. Ein aus mehreren Samples aggregiertes Signal trägt seinen Stabilitätsstatus sichtbar.
3. Der Mittelpunkt des Zeitfensters heißt nie „Geburtszeit".

Diese Pflicht ist der **Preis** der Entscheidung und wird als solcher geführt, nicht als
Nebenbemerkung.

### D12 | Product Vision bestätigt

**Bestätigt durch Nutzer:** 2026-07-21. `docs/vision/western-synastry.vision.md` ist
`user-confirmed`. Damit fällt das Gate `VISION_MISSING`; Planung ist freigegeben, Coding bleibt
bis zur Traceability-Matrix gesperrt.

---

## Offene, nicht blockierende Produktfragen

- Finaler Produktname und URL-Pfad.
- Preis, Kauf- und Freischaltungsweg; nicht Teil dieses MVPs.
- Finale redaktionelle und astrologische Fachabnahme vor öffentlicher Veröffentlichung.
- Exakte Größe und Rekrutierung der Usability-Stichprobe; Planannahme: fünf moderierte Sessions.
