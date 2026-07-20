/**
 * R10 / Audit F-01 — Engine Spike: does FuFirE honour the submitted clock time
 * when `birth_time_known:false`?
 *
 * WHY THIS EXISTS
 * The whole Western-Synastry uncertainty feature (DEC-20260719-03) rests on one
 * unstated premise: that submitting three DIFFERENT local times for the same person
 * yields three DIFFERENT charts. If the engine instead substitutes a fixed 12:00
 * whenever `birth_time_known:false`, then all three samples collapse onto one chart,
 * every aspect trivially holds in every pair, and `stable` becomes vacuous — an
 * uncertainty display that always reports maximum certainty.
 *
 * `birth_time_known` appears ZERO times in the Western-Synastry PRD, plan, decision
 * record and both 2026-07-19 reviews. The pre-existing spike
 * (scripts/fufire-unknown-time-spike.mts:32) submits `1990-06-15T12:00:00` — exactly
 * the value the engine would substitute — so it cannot tell the two cases apart.
 * This spike varies the clock, which is the only way to discriminate them.
 *
 * GATE: if the engine ignores the clock, DEC-20260719-03 is dead as specified and
 * implementation must NOT start. Report to the user.
 *
 * Usage:
 *   FUFIRE_API_KEY=ff_..._yourkey npx tsx scripts/fufire-clock-honouring-spike.mts
 *
 * Output: src/__fixtures__/fufire/clock-honouring/*.json
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const API_URL = (process.env.FUFIRE_API_URL || "https://api.fufire.space").replace(/\/$/, "");
const API_KEY = (process.env.FUFIRE_API_KEY || "").trim();

if (!API_KEY) {
  console.error("FAIL: FUFIRE_API_KEY env var is required. Run:");
  console.error("  FUFIRE_API_KEY=ff_..._yourkey npx tsx scripts/fufire-clock-honouring-spike.mts");
  process.exit(1);
}

const FIXTURE_DIR = join(process.cwd(), "src/__fixtures__/fufire/clock-honouring");
mkdirSync(FIXTURE_DIR, { recursive: true });

// One synthetic person (D8: no real second-person data). Same date, same place —
// ONLY the clock varies. Berlin, no DST transition on this date.
const BASE = { date: "1990-06-15", tz: "Europe/Berlin", lat: 52.52, lon: 13.405 };

// The three anchors the plan uses for `unknown` (plan:485 / AC-005), plus the two
// edges of the `afternoon` band (time-band-v1: 12:00–17:59) so we can also measure
// whether `stable` is vacuous for an approximate band — the council's point 2.
const CLOCKS = ["00:00:00", "12:00:00", "23:59:00", "17:59:00"] as const;

async function postWestern(time: string, birthTimeKnown: boolean) {
  const body = {
    ...BASE,
    date: `${BASE.date}T${time}`,
    birth_time_known: birthTimeKnown,
    ambiguousTime: "earlier",
    nonexistentTime: "error",
    zodiac_mode: "tropical",
  };
  const res = await fetch(`${API_URL}/v1/calculate/western`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": API_KEY },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json: any;
  try { json = JSON.parse(text); } catch { json = { _raw: text }; }
  return { status: res.status, json, body };
}

interface Row {
  time: string;
  flag: boolean;
  status: number;
  jd_ut: number | null;
  moon: number | null;
  sun: number | null;
  asc: number | null;
  provisional: string[] | null;
}

function num(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

function extract(time: string, flag: boolean, status: number, j: any): Row {
  const prov = j?.precision?.provisional_fields;
  return {
    time,
    flag,
    status,
    jd_ut: num(j?.jd_ut),
    moon: num(j?.bodies?.Moon?.longitude),
    sun: num(j?.bodies?.Sun?.longitude),
    asc: num(j?.angles?.Ascendant) ?? num(j?.angles?.Ascendant?.longitude) ?? num(j?.ascendant),
    provisional: Array.isArray(prov) ? prov : null,
  };
}

const rows: Row[] = [];

for (const flag of [false, true]) {
  for (const time of CLOCKS) {
    const label = `${flag ? "known" : "unknown"}-${time.slice(0, 5).replace(":", "")}`;
    process.stdout.write(`POST /v1/calculate/western  birth_time_known=${String(flag).padEnd(5)} time=${time}  … `);
    const { status, json, body } = await postWestern(time, flag);
    console.log(`HTTP ${status}`);
    writeFileSync(
      join(FIXTURE_DIR, `${label}.json`),
      JSON.stringify({ _spike_meta: { request: body, endpoint: "/v1/calculate/western" }, ...json }, null, 2)
    );
    rows.push(extract(time, flag, status, json));
  }
}

// ── Report ───────────────────────────────────────────────────────────────────
const fmt = (v: number | null) => (v === null ? "     —" : v.toFixed(3).padStart(10));

console.log("\n═══════════════════════════════════════════════════════════════════════");
console.log("  R10 / F-01 — does the engine honour the submitted clock?");
console.log("═══════════════════════════════════════════════════════════════════════\n");
console.log("flag   time      HTTP        jd_ut       Moon°        Sun°        Asc°   provisional_fields");
for (const r of rows) {
  console.log(
    `${r.flag ? "true " : "false"}  ${r.time.slice(0, 5)}     ${r.status}  ${fmt(r.jd_ut)}  ${fmt(r.moon)}  ${fmt(r.sun)}  ${fmt(r.asc)}   ${JSON.stringify(r.provisional)}`
  );
}

const failed = rows.filter((r) => r.status !== 200);
if (failed.length) {
  console.error(`\n✗ ${failed.length} call(s) did not return 200. Cannot judge — fix access first.`);
  process.exit(1);
}

const unknownRows = rows.filter((r) => !r.flag);
const knownRows = rows.filter((r) => r.flag);

// Distinctness is judged on the three PLAN anchors only (00:00 / 12:00 / 23:59).
const anchors = (rs: Row[]) => rs.filter((r) => r.time !== "17:59:00");
const distinct = (rs: Row[], key: keyof Row) =>
  new Set(anchors(rs).map((r) => String(r[key]))).size;

const unknownJd = distinct(unknownRows, "jd_ut");
const unknownMoon = distinct(unknownRows, "moon");
const knownMoon = distinct(knownRows, "moon");

console.log("\n─── VERDICT ──────────────────────────────────────────────────────────");

let gateFailed = false;

if (unknownJd <= 1 && unknownMoon <= 1) {
  gateFailed = true;
  console.error("✗ R10 REALISED — the engine IGNORES the submitted clock when birth_time_known:false.");
  console.error("  All three anchor times collapsed onto ONE chart.");
  console.error("  Consequence: every sampled aspect holds in every pair, so `stable` is vacuous.");
  console.error("  DEC-20260719-03 is NOT implementable as specified. STOP and report to the user.");
} else if (unknownMoon >= 3) {
  console.log("✓ The engine HONOURS the clock with birth_time_known:false.");
  console.log(`  Three anchors produced ${unknownMoon} distinct Moon longitudes. Sampling is viable.`);
} else {
  gateFailed = true;
  console.error(`✗ AMBIGUOUS — ${unknownMoon} distinct Moon longitudes across 3 anchors (expected 3).`);
  console.error("  Do not proceed on a partial result. Report the table above to the user.");
}

// Does the honesty signal survive? AC-004 relies on houses/angles being withheld
// unless BOTH persons are exact. The audit (F-02) found the engine returns populated
// angles anyway, with provisional_fields carrying the truth.
const unknownProv = unknownRows[0]?.provisional ?? [];
const knownProv = knownRows[0]?.provisional ?? [];
console.log(`\n  provisional_fields  birth_time_known:false → ${JSON.stringify(unknownProv)}`);
console.log(`  provisional_fields  birth_time_known:true  → ${JSON.stringify(knownProv)}`);
if (unknownRows.some((r) => r.asc !== null)) {
  console.log("  ⚠ angles.Ascendant is POPULATED even at birth_time_known:false —");
  console.log("    AC-004 is a suppression duty the new transport must discharge locally,");
  console.log("    not an upstream guarantee. (Audit F-02.)");
}

// Council point 2: is `stable` vacuous across an approximate band?
const noon = unknownRows.find((r) => r.time === "12:00:00");
const bandEnd = unknownRows.find((r) => r.time === "17:59:00");
if (noon?.moon !== null && noon?.moon !== undefined && bandEnd?.moon !== null && bandEnd?.moon !== undefined) {
  const delta = Math.abs(bandEnd.moon - noon.moon);
  console.log(`\n  Moon drift across the 'afternoon' band (12:00 → 17:59): ${delta.toFixed(3)}°`);
  if (delta < 3) {
    console.log("    < 3° — below a typical aspect orb. The council's point 2 holds:");
    console.log("    `stable` is close to automatic for this band and does not mean what it says.");
  }
}

console.log(`\nFixtures written to: ${FIXTURE_DIR}`);
console.log("─────────────────────────────────────────────────────────────────────\n");

process.exit(gateFailed ? 1 : 0);
