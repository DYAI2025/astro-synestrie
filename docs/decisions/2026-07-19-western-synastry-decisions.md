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

## Offene, nicht blockierende Produktfragen

- Finaler Produktname und URL-Pfad.
- Preis, Kauf- und Freischaltungsweg; nicht Teil dieses MVPs.
- Finale redaktionelle und astrologische Fachabnahme vor öffentlicher Veröffentlichung.
- Exakte Größe und Rekrutierung der Usability-Stichprobe; Planannahme: fünf moderierte Sessions.
