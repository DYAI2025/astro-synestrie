# Post-Audit-Befunde — Western Synastry

**Datum:** 2026-07-21
**Herkunft:** Orchestrator (`/agileteam`), direkte Codeprüfung — **nicht** Teil des
Multi-Agent-Audits vom 2026-07-20. Getrennt geführt, damit die Provenienz sauber bleibt.
**Bezug:** `docs/reviews/2026-07-20-independent-blindspot-audit.md` (F-01…F-30),
`docs/canvas/western-synastry.canvas.md` §5 (Stufe 0), R10.
**Evidenzklasse:** statische Codeprüfung, typsystem-erzwungen. Kein Netzaufruf nötig.

---

## F-31 — Der Client kollabiert jede Uhrzeit auf 12:00, bevor ein Request entsteht

**Klasse:** `wired-in-prod` (Plumbline: *nicht real / nicht verdrahtet*).
**Status:** belegt, ohne API-Schlüssel reproduzierbar.

`src/utils/birthInputValidation.ts:93-97`:

```ts
const timeKnown = input.timeKnown !== false;
let birthTime: string;
if (!timeKnown) {
  birthTime = "12:00";
}
```

Bei `timeKnown === false` wird die übergebene Uhrzeit **verworfen** und hart durch `12:00`
ersetzt. Die Eingabe des Aufrufers erreicht den Payload nie.

**Warum das jeden Pfad betrifft — typsystem-erzwungen:**

- `buildWesternPayload(input: ValidatedBirthInput)` (`src/utils/fufirePayloadMappers.ts:141`)
  reicht die Zeit unverändert durch: `localIsoDatetime()` (`:120`) baut
  `` `${input.birthDate}T${input.birthTime}:00` ``. Dort findet **keine** Substitution statt.
- Das Interface `ValidatedBirthInput` ist ausschließlich in
  `src/utils/birthInputValidation.ts:19` deklariert, und `validateBirthInput` ist der einzige
  Produzent. Jeder Payload-Builder verlangt genau diesen Typ.
- Folge: es gibt **keinen** Weg zu FuFirE, der die 12:00-Überschreibung umgeht, solange der
  reguläre Validierungspfad benutzt wird. Das ist keine Konvention, an die man sich hält —
  es ist eine Typschranke.

**Konsequenz für R10.** R10 zerfällt in zwei unabhängige Fragen:

| | Frage | Status |
|---|---|---|
| **R10a — Client** | Sendet unser Code bei `birth_time_known:false` überhaupt verschiedene Uhrzeiten? | **NEIN. Belegt.** Ohne Schlüssel entschieden. |
| **R10b — Engine** | Ehrt FuFirE bei `birth_time_known:false` eine übergebene Uhrzeit? | offen, braucht den Spike |

**Damit ist Stufe 0 des Canvas so nicht ausführbar.** Canvas §5 verlangt, FuFirE „mit drei
verschiedenen Uhrzeiten und `birth_time_known:false`" aufzurufen. Der Spike
(`scripts/fufire-clock-honouring-spike.mts`) kann das, weil er den Client umgeht und roh
`fetch`t — als **Diagnose** bleibt er gültig. Der **Produktionspfad** kann es nicht.

**Und die Datei ist ein Hard Stop.** `src/utils/birthInputValidation.ts` steht bewusst **nicht**
im Allowed change scope (`docs/scope/western-synastry.scope.json`). Eine Abtastung über
`birth_time_known:false` verlangt also entweder eine Änderung an dieser Datei — Freigabe durch
den Nutzer erforderlich — oder einen neuen Pfad, der sie umgeht.

**Nicht selbst herabgestuft.** Dieser Befund gehört zur Klasse *nicht verdrahtet*. Er wird
nicht zu „bekannte Einschränkung" oder „by design" umdeklariert. Nur der Nutzer darf das.

---

## F-32 — Die Abtastung verwechselt zwei verschiedene Bedeutungen von „Zeit unbekannt"

**Klasse:** `internal-contradictions`.
**Status:** Designbefund, folgt aus F-31. Architektur — **Entscheidung liegt beim Nutzer.**

Der Plan verlangt von `birth_time_known:false` zwei einander ausschließende Dinge:

1. *„Ich kenne die Zeit nicht"* — das Flag, das die Engine (und `fufireNormalizer.ts:229-238`)
   veranlasst, zeitabhängige Felder als provisorisch zu behandeln.
2. *„Rechne mir genau diese Uhrzeit"* — was die Abtastung braucht, um drei unterscheidbare
   Charts zu erhalten.

Ein Flag kann nicht beides. Beim ersten Wert ist die Uhrzeit bedeutungslos; genau deshalb
überschreibt `birthInputValidation.ts:97` sie, und genau deshalb *könnte* die Engine dasselbe
tun (R10b). Die Abtastung ist damit nicht an einem Bug gescheitert, sondern an einem
Bedeutungskonflikt im eigenen Entwurf.

**Kohärente Alternative — nicht übernommen, zur Entscheidung vorgelegt.**
Drei Aufrufe mit `birth_time_known:true` und **expliziten** Uhrzeiten (Fensteranfang, -mitte,
-ende), die Unsicherheit vollständig in der eigenen Aggregationsschicht ausgedrückt:
„Dieses Muster hält in allen drei Rechnungen über das angegebene Zeitfenster."

Eigenschaften dieser Variante:

- R10a und R10b werden **beide gegenstandslos** — der Normalpfad der App ehrt explizite
  Uhrzeiten nachweislich, er ist der Produktivpfad seit P1.
- Kein Hard-Stop-File muss geöffnet werden; die Abtastung lebt vollständig in
  `src/server/relationshipTransport.ts`, also im bestätigten Scope.
- Der Engine-Spike wird für die **Produktentscheidung** entbehrlich (als Diagnose bleibt er
  nützlich).

Preis und Pflicht dieser Variante:

- Die Ehrlichkeit wird von der Engine **zu uns** verlagert. `fufireNormalizer` markiert bei
  `timeKnown:true` nichts als provisorisch — obwohl die Zeit unsicher ist. Die neue Schicht
  muss diese Markierung selbst tragen, sonst entsteht genau die Scheinobjektivität, gegen die
  das Produkt gebaut wird.
- Kein einzelner Sample-Chart darf je als „dein Chart" angezeigt werden. Das ist als
  Invariante zu testen, nicht als Vorsatz zu notieren.
- Berührt `BIRTH-TIME-01` nicht und bricht das bestätigte P4-Versprechen nicht: Aszendent,
  Häuser und Stundensäule bleiben im Profilpfad unverändert `null`. Der Mond ist dort nie
  geschützt gewesen (Canvas §1.2) — die Abtastung ersetzt eine bestehende, gröbere Mechanik,
  statt einer Lücke.

**Warum ich das nicht selbst entscheide:** Architekturentscheidung. Sie ändert den
steuernden Parameter des gesamten Unsicherheits-Features und verschiebt eine Ehrlichkeitspflicht
von der Engine in unseren Code.

---

## Auswirkung auf die Neuschrift des Plans (D9)

- Canvas §5 **Stufe 0** ist in der heutigen Formulierung nicht produktionsfähig und muss
  abhängig von der Entscheidung zu F-32 neu gefasst werden. Der Canvas geht damit erneut auf
  `draft` — Änderung durch einen Agenten, Bestätigung nur durch den Nutzer.
- R10 wird im neuen Plan als **R10a (belegt geschlossen)** und **R10b (offen)** geführt, nicht
  mehr als ein Risiko.
- F-26/R11 bleibt unabhängig davon bestehen und wird nicht durch F-32 berührt.
