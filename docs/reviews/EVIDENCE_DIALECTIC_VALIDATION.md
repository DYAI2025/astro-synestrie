# Evidence-Dialectic Validation — Western Synastry MVP v2.1

Status: `RELEASE_TO_CODING_AGENT_WITH_ENVIRONMENT_GATE`
Date: 2026-07-19
Criticality: high
Decision owner: human product owner

## 1. Review objective

Validate whether the revised implementation plan and PRD faithfully incorporate the eight sequential decisions and provide a responsible coding-agent handoff without treating document quality as runtime proof.

## 2. Thesis

The revised package is suitable for coding-agent execution because it defines a bounded MVP, explicit trust boundaries, vertical TDD slices, binary acceptance criteria, traceability, rollback, a real-boundary browser test and a Human Gate before depth expansion.

## 3. Antithesis

The package is not implementation evidence. Staging credentials, live auth/profile access, live FuFirE behavior, usability and astrology-domain review remain unavailable. Three-point time sampling and the provisional coverage threshold are reversible engineering assumptions, not validated astrological facts.

## 4. Claim–evidence matrix

| Claim | Evidence | Classification | Status | Limitation |
|---|---|---|---|---|
| Eight sequential product decisions are represented | Decision record plus user conversation | `SOURCE_EVIDENCE` | `SUPPORTED` | Technical invariants are review-derived, not user-originated decisions |
| Existing own-profile routes are authenticated and owner-filtered | `src/server/app.ts` profile routes | `SOURCE_EVIDENCE` | `SUPPORTED` | New relationship route does not yet exist |
| Existing unknown-time validation substitutes 12:00 | `src/utils/birthInputValidation.ts` | `SOURCE_EVIDENCE` | `SUPPORTED` | Describes old behavior only |
| Existing score is unsuitable for the new Western-only flow | `src/utils/synastry.ts` plus product scope | `SOURCE_EVIDENCE` + `VALUE_JUDGMENT` | `SUPPORTED` | Suitability is a product decision, not a mathematical theorem |
| Existing FuFirE Western calculation can be reused | New_Bazi client/mappers and FuFirE route source | `SOURCE_EVIDENCE` | `SUPPORTED` | No live request executed in this artifact build |
| New route must join the compute rate limiter | Existing limiter applies to named route groups | `INFERENCE` | `SUPPORTED` | Requires implementation and route test |
| Center-plus-majority is a better provisional threshold than center-plus-one-boundary | Failure-mode analysis | `INFERENCE` | `PROVISIONAL` | Needs domain and user review |
| Plan and PRD satisfy their structural contracts | Actual validator outputs | `SOURCE_EVIDENCE` | `SUPPORTED` | Structural validity does not prove product/runtime correctness |
| MVP works against real auth/profile/FuFirE | No runtime evidence | `MISSING` | `UNVERIFIED` | Blocks MVP Done claim |
| Interface is intuitive | No user research yet | `MISSING` | `UNVERIFIED` | Requires TASK-016 Human Gate |

## 5. Dialectical tensions preserved

### CTR-001 — “No mocks” versus isolated test doubles

- Thesis: deterministic unit and route tests need controlled inputs to expose failure paths.
- Antithesis: a mocked flow can be mistaken for a working product.
- Synthesis: controlled doubles are allowed only below the browser boundary and carry no real-flow completion claim. The first MVP browser E2E must use actual auth/profile/BFF/FuFirE boundaries with no route interception.

### CTR-002 — Frontend experimentation versus cross-client consistency

- Thesis: frontend ownership permits rapid learning about dimensions and wording.
- Antithesis: a second client could diverge.
- Synthesis: version frontend rules now; use `API-001` only after usability evidence, domain review and a second consumer or explicit reuse case.

### CTR-003 — Interesting Moon-related material versus false precision

- Thesis: removing all time-sensitive material reduces product value.
- Antithesis: a midpoint can create false certainty.
- Synthesis: use bounded samples, explicit coverage, visible `stable`/`provisional`/`unavailable`, and never call sampled stability continuous proof.

## 6. Belief update from the original plan

| Original position | Revised position | Triggering evidence/reason |
|---|---|---|
| New FuFirE synastry endpoint in MVP | Reuse `/v1/calculate/western`; defer promotion | User chose frontend experimentation and separate API ticket |
| Raw Person A input in analysis request | Server-owned `personAProfileId` lookup | Existing owner-filtered profile boundary and MVP profile promise |
| Provisional after center plus one boundary | Center plus at least `ceil(totalPairs/2)` | 2/9 failure mode was too weak |
| Mocked browser E2E before live smoke | First MVP browser E2E is real-boundary | User explicitly rejected mock/demo/placeholder throughline |
| New route only under global limit | Add it to compute-rate-limit group | A request can fan out to six upstream calculations |
| Eight decisions mixed with review controls | Eight user decisions plus separate technical invariants | Source-attribution correction |

## 7. Unresolved verification tasks

1. Run TASK-014 with actual staging authentication, owned profile persistence and FuFirE access.
2. Run TASK-015 and record command output, request IDs, PII review and evidence class.
3. Obtain astrology-domain review of initial mappings and wording.
4. Run moderated usability sessions and record the Human Gate.
5. Revisit `sampling-v1`, time-band boundaries and DST policy after real examples.

## 8. Final synthesis

The revised plan is defensible as a coding-agent contract, not as a completed implementation. TASK-001 through TASK-013 can begin from source-inspected contracts. TASK-014 and TASK-015 require a real environment. Production exposure and TASK-017+ remain human-gated.

## 9. Honest evidence status

- `source-inspected`: repository routes, validators, score logic, rate-limit structure, endpoint contracts.
- `structure-validated`: plan, PRD, JSON Schema, SARIF, package and cross-document traceability.
- `runtime-unverified`: no implementation build, live FuFirE call, auth flow or browser smoke was executed here.
- `requires-human-acceptance`: usability, astrology wording and public release.
