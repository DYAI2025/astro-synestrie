# Product Vision: Western Synastry — Beziehungsmuster ohne Urteil

**Feature-Slug:** `western-synastry`
**Status:** `draft` — **nicht bestätigt**
**Erstellt:** 2026-07-21
**Autor des Entwurfs:** Orchestrator (`/agileteam`). **Kein Agent darf selbst bestätigen.**
**Canvas-Link:** [docs/canvas/western-synastry.canvas.md](../canvas/western-synastry.canvas.md) (user-confirmed, Amendment 2)
**PRD-Link:** [docs/prd/prd_report.json](../prd/prd_report.json)
**Audit:** [2026-07-20](../reviews/2026-07-20-independent-blindspot-audit.md) · [2026-07-21](../reviews/2026-07-21-post-audit-findings.md)

> Diese Vision beschreibt **Wert**, nicht Mechanik. Sie ist bewusst so geschrieben, dass sie
> gültig bleibt, wie auch immer die offene Architekturfrage aus **F-32** entschieden wird.

---

## Vision Statement

Zwei Menschen wollen verstehen, was zwischen ihnen passiert. Was sie heute bekommen, ist eine
Zahl. Der Primus-Aspectus-Wert steht als Urteil da — verrechnet aus einer Day-Master-Relation
und einem Sonnenzeichen-Bucket, zwei Datenpunkten, die eine Zahl tragen sollen, die sie nicht
tragen können. Wer eine 73 liest, fragt nicht mehr, woraus sie besteht. Er fragt, ob 73 gut ist.

Und darunter liegt eine zweite, leisere Unehrlichkeit. Wer seine Geburtszeit nicht kennt,
bekommt trotzdem einen Mond auf dem Grad genau — obwohl der Mond sich rund 13° am Tag bewegt
und die Zeit, aus der er berechnet wurde, nie jemand angegeben hat.

Western Synastry dreht beides um. Statt eines Urteils: wenige Muster, jedes mit beiden
Körperrollen, dem Aspekt, der Orb-Spanne und der Angabe, wie sicher es angesichts der bekannten
Zeitgenauigkeit überhaupt ist. Statt einer Zahl: eine Reflexionsfrage. Statt einer verdeckten
Auswahl: die Auswahlregel selbst, sichtbar im Interface — denn wer drei aus vielen Mustern zeigt,
hat bereits geurteilt, auch ohne Note.

Ein Nutzer soll das Ergebnis verlassen und sagen können: *Ich weiß jetzt, worauf das beruht,
und ich weiß, wo es unsicher ist.* Nicht: *Wir haben 73 Punkte.*

---

## Value Promise (Must Not Break)

**Das eine Versprechen, das unter keinen Umständen gebrochen werden darf:**

Dieser Flow zeigt **niemals eine Beziehungsbewertung** — keine Punktzahl, keine Prozentangabe,
keine Sterne, kein Ranking-Label wie „hohe Übereinstimmung", keine Ampel. Auch nicht als
Nebenprodukt, auch nicht in einem Tooltip, auch nicht als Sortierschlüssel, der als Wertung
gelesen werden kann.

Was stattdessen erscheint, ist **Evidenz mit sichtbarer Herkunft**: welches Muster, zwischen
welchen Körpern in welcher Rolle, mit welchem Aspekt, in welcher Orb-Spanne — und wie stabil
das angesichts der bekannten Zeitunsicherheit ist.

**Zweite, gleichrangige Hälfte des Versprechens:** Zeitunsicherheit wird nie stillschweigend
weggerechnet. Wenn eine Geburtszeit ungenau oder unbekannt ist, darf kein daraus abgeleitetes
Ergebnis als exakt erscheinen — und keine intern verwendete Ersatzzeit darf je als die Zeit
dieses Menschen angezeigt werden. Ein Mittelpunkt eines Zeitfensters heißt nie „Geburtszeit".

**Dritte Hälfte — die unbequeme:** Die Auswahlregel ist Teil der Evidenz, nicht ihre Verpackung.
Ranking plus Trunkierung auf wenige Muster **ist** ein Urteil. Ein Produkt, das von seinen
Nutzern Evidenzdenken verlangt, muss die eigene Selektionsregel offenlegen, statt sie
wegzudefinieren.

Diese drei Sätze sind der Grund, warum dieses Feature existiert. Wer sie bricht, baut das
Produkt, das ersetzt werden sollte.

---

## Done Right Looks Like

Eine angemeldete Person wählt ihr eigenes Profil, erfasst eine zweite Person mit einem
ehrlichen Zeitmodus — genau, ungefähr, oder unbekannt — bestätigt ausdrücklich, dass diese
Person zugestimmt hat, und liest dann:

- **Wenige Muster.** Jedes benennt beide Körper *mit Rolle* — wessen Mond, wessen Venus, in
  welche Richtung. Nicht „Mond-Venus", sondern wer bei wem.
- **Orb-Spanne statt Punktwert.** Der Abstand zum exakten Aspekt ist sichtbar. Eine enge
  Konjunktion sieht anders aus als eine weite, ohne dass daraus eine Note wird.
- **Ein Stabilitätsstatus, der etwas bedeutet.** Bei ungenauer Zeit ist erkennbar, ob ein
  Muster über das gesamte angegebene Zeitfenster hält oder nur in einem Teil davon. Ein Status,
  der bei jeder Eingabe „stabil" sagt, wäre wertlos — er muss auch „instabil" sagen können und
  das nachweislich tun.
- **Die Auswahlregel, gerendert.** Warum diese Muster und nicht andere. Im Interface, getestet,
  nicht im Methodik-Anhang versteckt.
- **Ein ehrlicher Missing-State.** Wenn zu wenig Substanz da ist, erscheint das — nicht ein
  aufgefüllter Bildschirm.
- **Eine Reflexionsfrage** statt einer Schlussfolgerung. Das Produkt beendet den Gedanken nicht.

Und im Hintergrund, unsichtbar aber entscheidend: **echt gerechnet.** Jeder angezeigte Wert
stammt aus einem realen FuFirE-Aufruf über das BFF, nicht aus einem Demo-Profil und nicht aus
einem abgefangenen Request. Ein Beweis, der gegen einen Mock läuft, ist kein Beweis.

---

## Done Wrong Looks Like

**Produktionsfehler erster Ordnung — stoppt die Auslieferung:**

- Irgendwo im neuen Flow erscheint eine Beziehungszahl. Auch klein, auch grau, auch „nur zur
  Orientierung". Das Versprechen ist gebrochen.
- `compareProfiles()` wird in den neuen Flow importiert. Der alte Score kommt durch die
  Hintertür zurück.
- Der Stabilitätsstatus meldet bei jeder Eingabe „stabil", weil die zugrunde liegende
  Abtastung in Wahrheit dreimal dasselbe rechnet. Das Unsicherheitsfeature zeigt dann maximale
  Sicherheit an — die schlimmste Form von Unehrlichkeit, weil sie wie Sorgfalt aussieht.
  *(Genau dieses Risiko ist als R10 belegt offen — siehe F-31.)*
- Eine intern verwendete Ersatzzeit erscheint in der UI als Geburtszeit dieses Menschen.
- Die Zustimmungserklärung wird so formuliert, dass sie wie eine geprüfte Zustimmung der
  zweiten Person aussieht. Person A klickt eine Checkbox; das ist keine Einwilligung von
  Person B, und der Text darf nichts anderes suggerieren.
- Daten einer realen zweiten Person werden verarbeitet, bevor eine dokumentierte
  Rechtsgrundlage und ein Art.-14-Hinweis existieren.
- Ein fremdes Profil wird über eine manipulierte Profil-ID gelesen.

**Fehler zweiter Ordnung — falsche Fertigmeldung:**

- Der Durchstich wird als „real" abgenommen, während die Testkonfiguration in Wahrheit gegen
  `mock-fufire.mjs` mit Demo-Profilen läuft. *(Heute belegt der Fall — R11/F-26.)*
- Grüne Unit-Tests werden als Beleg dafür gelesen, dass das zusammengesetzte System den Wert
  liefert. Zwei verschiedene Aussagen.
- Reduzierter Umfang wird als erreichtes Ziel berichtet.
- Ein Befund der Klasse „nicht verdrahtet / nicht real" wird zu „bekannte Einschränkung"
  umdeklariert, ohne dass der Nutzer das entschieden hat.

---

## Fulfillment Signals

**Woran erkennen wir, dass die Vision erfüllt ist — nicht, dass Code existiert:**

1. **Verständnis.** In moderierten Sessions kann eine Person aus der Zielgruppe in eigenen
   Worten sagen, worauf ein gezeigtes Muster beruht und wo es unsicher ist — ohne dass jemand
   nachhilft.
2. **Nachfrage, nicht nur Zustimmung.** Sie will es auf eine zweite Person anwenden. Sie kommt
   unaufgefordert zurück. „Fand ich gut" ist kein Signal.
3. **Das Urteilsbedürfnis kippt nicht zurück.** Im A/B zwischen wenigen gerankten und allen
   ungerankten Mustern zeigt sich, ob die Reduktion trägt oder ob die Leute die Note vermissen
   — und damit, ob `INFO-004` den belegten oder nur den gewünschten Nutzer beschreibt.
4. **Der Stabilitätsstatus diskriminiert nachweislich.** Es existiert mindestens ein
   dokumentierter Fall, in dem er „instabil" meldet. Ohne diesen Nachweis ist er Dekoration.
5. **Der Realitätsnachweis ist leck-dicht.** Es existiert ein Test, der beweist, dass der
   Real-Boundary-Lauf den Mock nicht erreichen *kann* — nicht bloß, dass er grün war.

Qualitative Beobachtungen werden **nicht** zu einer Kennzahl gemittelt. Ein Produkt gegen
Scheinobjektivität misst sich nicht mit einer erfundenen Zahl.

---

## Out of Scope (Vision Boundary)

Diese Vision endet, wo der Canvas §7 endet. Ausdrücklich **nicht** Teil dieses Versprechens:

- Der bestehende Synastry-Tab und sein PA-Wert. Er bleibt unangetastet (`ROLLBACK-002`); das
  No-Score-Versprechen gilt für den **neuen Flow**, nicht für die App als Ganzes. Diese Grenze
  wird benannt, nicht verwischt.
- Öffentliche Produktfreigabe (`SEC-005`, `AC-013`).
- Änderungen an FuFirE; ein neuer Endpunkt; die Promotion von Regeln über `API-001`.
- Payment, Persistenz von Partnerdaten, DB-Migration.
- LLM-generierter Beziehungstext.
- Composite, Davison, Transite, Progressionen, BaZi, Wu Xing.
- Ausbau auf sechs Dimensionen, Explorer, serverseitiges PDF — alles nach dem Human Gate.

---

## Offene Punkte, die vor GO entschieden gehören

| # | Punkt | Wer entscheidet |
|---|---|---|
| F-32 | Steuernder Parameter der Abtastung (`birth_time_known` false vs. true × explizite Zeiten) | **Nutzer** — Architektur |
| R10b | Ehrt FuFirE bei `birth_time_known:false` die Uhrzeit? | Spike, braucht `FUFIRE_API_KEY` |
| R13 | Rechtsgrundlage / Art.-14-Hinweis | **Nutzer** — bis dahin D8: synthetische Zweitpersonen |
