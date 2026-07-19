# Coding-Agent Handoff — Western Synastry MVP

Status: ready-for-execution for MVP through-line
Source of truth:
- `docs/prd/prd_report.md`
- `docs/plans/2026-07-19-western-synastry-mvp-throughline.md`
- `docs/decisions/2026-07-19-western-synastry-decisions.md`

## Objective

Implement TASK-001 through TASK-015 in order. Stop after the real-boundary evidence gate and report actual results. Do not continue to six-dimension depth without a recorded Human Gate.

## Non-negotiable constraints

- No FuFirE repository changes in this scope.
- No score, relationship verdict or compatibility percentage.
- Consent is a required user attestation, not verified consent.
- New BFF route requires auth and resolves Person A by owned profile ID.
- No automatic partner persistence.
- No direct browser call to FuFirE.
- Product dimensions and normalization remain in New_Bazi frontend.
- No generic confidence field.
- First MVP browser E2E uses real profile and FuFirE boundaries with no route interception.
- Unit/route test doubles may isolate logic but cannot support a real-flow completion claim.

## Validation commands

```bash
npm test -- src/utils/relationship
npm test -- src/server/app.relationship.test.ts src/server/app.ratelimit.test.ts
npm test -- src/components/relationship
npm run lint
npm run build
RELATIONSHIP_REAL_BOUNDARY=1 npm run e2e -- tests/e2e/relationship-real-boundary.spec.ts
```

## Stop conditions

Stop and request a human decision when a change requires a DB migration, partner storage, a new FuFirE endpoint, a change to consent wording, more than three chart samples per person, bypassing owner filters/rate limits, or depth work before the usability gate. TASK-014 also stops if staging credentials are unavailable.

## Completion evidence

A completion claim includes changed files, exact command outputs, request ID, evidence class, limitations and rollback. `unit-only` or process-local integration evidence does not prove the real flow. MVP acceptance requires `real-boundary-smoke`; further product acceptance requires `user-confirmed`.
