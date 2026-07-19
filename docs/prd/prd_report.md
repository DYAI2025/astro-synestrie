# Western Synastry MVP — Enterprise PRD v2.1

## meta

- Mode: `full_prd`
- Version: `2.1`
- Risk: `high`
- Release meaning: coding-agent release for the feature-flagged MVP; no public production claim.

## intake_scope

**User goal:** Integrate the eight decisions into an executable Western-Synastry implementation plan and create a validated coding-agent PRD.

**In scope**
- New_Bazi real-data MVP through-line
- existing FuFirE Western endpoint
- consent attestation
- time-window uncertainty
- frontend product analysis
- TDD/E2E/usability gates

**Out of scope**
- new FuFirE match endpoint
- payments/entitlements
- partner persistence
- LLM narrative
- public production release claim

## source_inventory

| Source | Type | Supports | Status |
|---|---|---|---|
| SRC-USER-001 | user_provided | Product intent, simple Apple-like UX and palette. | user_confirmed |
| SRC-USER-002 | user_provided | Eight confirmed decisions: consent attestation, day-part windows, visible uncertainty, frontend dimensions, frontend normalization, vertical TDD slices, early real E2E and real-data MVP. | user_confirmed |
| SRC-REPO-NB-001 | repository_evidence | Existing BFF, profile routes, local synastry, tests and UI stack. | source_inspected |
| SRC-REPO-FF-001 | repository_evidence | Existing /v1/calculate/western contract and pair-governance patterns. | source_inspected |
| SRC-REVIEW-001 | user_provided | Original blockers and required corrections. | source_inspected_and_rechecked |
| SRC-STD-001 | standard_or_framework | PRD structure, traceability, security and artifact requirements. | schema_source |

## standards_alignment

- **STD-COMMONMARK — CommonMark 0.31.2**: `format_compatible`; No claim of formal certification.
- **STD-RFC8259 — RFC 8259 JSON RFC 8259**: `format_compatible`; JSON validity does not prove semantic correctness.
- **STD-JSONSCHEMA-2020-12 — JSON Schema Draft 2020-12**: `schema_validated`; Validation checks structure, not runtime truth.
- **STD-SARIF-2.1.0 — SARIF 2.1.0**: `format_compatible`; Findings are static and repository-inspected only.
- **STD-29148 — ISO/IEC/IEEE 29148 requirements engineering 2018**: `standard_aligned`; Not certified or formally audited.

## risk_gate

Risk level: **high**

- Processes personal birth data
- Calls external calculation and auth/data boundaries
- Consent cannot be independently verified
- Time uncertainty can create misleading precision

## mode_selection

Repository-aware feature spans data, API, privacy, UX, testing, rollback and coding-agent handoff.

## artifact_policy

- Always: `prd_report.md`, `prd_report.json`
- Repository findings: `code_findings.sarif.json`
- Standards claims are alignment/format/schema claims, not certification.

## optional_artifacts

- `code_findings.sarif.json` — required: repository findings are included
- `implementation plan` — required: coding agent execution is requested
- `API-001 backlog ticket` — required: API promotion is deferred

## prd_markdown

### 1. Executive Summary

- **GOAL-001** `goal` `accepted` priority=p0 — Build a real-data Western-Synastry MVP through-line in New_Bazi using existing FuFirE Western calculations, with explicit uncertainty and no compatibility score.
- **INFO-001** `scope_note` `accepted` priority=p0 — The PRD releases implementation of the MVP, not public production launch.

### 2. Problem Statement

- **INFO-002** `problem` `verified` priority=p0 — The existing synastry flow mixes Western, BaZi and fusion logic and exposes a coarse percentage score; it does not provide a focused evidence-linked Western relationship experience.
- **INFO-003** `problem` `verified` priority=p0 — Unknown time is currently represented by a 12:00 placeholder, which must not be communicated as exact in the new product.

### 3. Goals and Non-Goals

- **GOAL-002** `goal` `accepted` priority=p0 — Deliver profile-to-result flow using real FuFirE calculations and a simplified evidence result.
- **GOAL-003** `goal` `accepted` priority=p0 — Support exact, approximate and unknown birth times with visible sampled uncertainty.
- **NOGOAL-001** `non_goal` `accepted` priority=p0 — No new FuFirE match endpoint in the current MVP.
- **NOGOAL-002** `non_goal` `accepted` priority=p1 — No payment, subscription, entitlement or marketplace implementation.
- **NOGOAL-003** `non_goal` `accepted` priority=p1 — No LLM narrative, Composite, Davison, transit, BaZi or Wu-Xing analysis.

### 4. Stakeholders and Users

- **INFO-004** `user` `accepted` priority=p0 — Primary user: an authenticated person seeking reflective relationship patterns without a verdict.
- **INFO-005** `stakeholder` `accepted` priority=p0 — Product owner decides usability gate and public release.
- **INFO-006** `stakeholder` `accepted` priority=p0 — Coding agent implements bounded slices; astrology reviewer approves rules and wording before public launch.

### 5. Definitions and Domain Glossary

- **TERM-001** `definition` `accepted` priority=p0 — Consent assertion: a user statement that the second person agreed; it is not independently verified.
- **TERM-002** `definition` `accepted` priority=p0 — Sampled stability: stable requires all sampled pairs; provisional requires the canonical center pair plus at least ceil(totalPairs/2), and is not proof across every instant.
- **TERM-003** `definition` `accepted` priority=p1 — Product dimension: frontend-owned grouping of evidence for user comprehension.
- **TERM-004** `definition` `accepted` priority=p0 — Real-boundary smoke: test through running New_Bazi BFF to actual FuFirE and authenticated profile boundary without mocked upstream output.

### 6. Assumptions, Missing and Open Questions

- **INFO-007** `assumption` `assumption` priority=p1 — ASSUMPTION: time-band-v1 uses five German day-part windows; sampling-v1 uses three anchors and a majority-plus-center provisional threshold.
- **INFO-008** `assumption` `assumption` priority=p2 — ASSUMPTION: five moderated usability sessions are sufficient for the first qualitative gate.
- **OPEN-001** `missing` `missing` priority=p3 — MISSING: final product name and URL slug.
- **OPEN-002** `missing` `missing` priority=p0 — MISSING: staging credentials and exact real-boundary environment.
- **OPEN-003** `open_question` `needs_review` priority=p1 — OPEN QUESTION: which dimensions survive usability review and become candidates for API promotion.
- **INFO-011** `assumption` `assumption` priority=p1 — ASSUMPTION: generated samples use shift_forward for nonexistent local times and earlier for ambiguous times, while exact nonexistent input is rejected; every adjustment remains visible.

### 7. Product Scope

- **INFO-009** `scope` `accepted` priority=p0 — MVP includes own-profile select/create, partner input, consent review, real calculation, simplified result and uncertainty method.
- **INFO-010** `scope` `accepted` priority=p1 — Post-gate scope includes six dimensions, detail, explorer, method and print.

### 8. User Journeys

- **JOURNEY-001** `journey` `accepted` priority=p0 — User signs in, selects or creates an owned profile, optionally refines an unknown own time for this analysis, then enters partner data and time precision.
- **JOURNEY-002** `journey` `accepted` priority=p0 — User reviews both data sets, confirms the consent assertion and starts calculation.
- **JOURNEY-003** `journey` `accepted` priority=p0 — User reads three evidence-linked patterns, understands uncertainty and opens detail evidence.

### 9. AI-Ready User Stories

- **STORY-001** `story` `accepted` priority=p0 — As an authenticated user, I can use an owner-filtered stored profile so I do not re-enter my own birth data and cannot reference another user’s profile.
- **STORY-002** `story` `accepted` priority=p0 — As a user with only a rough time, I can select a time band and see bounded uncertainty rather than a false exact time.
- **STORY-003** `story` `accepted` priority=p0 — As a user, I can see a small number of real calculated patterns with evidence instead of a score.
- **STORY-004** `story` `accepted` priority=p0 — As a product owner, I can stop after the MVP and decide depth based on observed usability.

### 10. Functional Requirements

- **FR-001** `functional` `accepted` priority=p0 — Select or create an own profile through existing authenticated routes; the relationship endpoint accepts personAProfileId and resolves it server-side with id + user_id.
- **FR-002** `functional` `accepted` priority=p0 — Capture partner data without automatic persistence.
- **FR-003** `functional` `accepted` priority=p0 — Require secondPersonConsentConfirmed=true and text version before upstream calculation.
- **FR-004** `functional` `accepted` priority=p0 — Support exact, approximate and unknown time modes; an unknown stored own profile may receive a request-scoped approximate override without persistent mutation.
- **FR-005** `functional` `accepted` priority=p0 — Create one or three real Western samples per person; provisional evidence requires the center pair and at least ceil(totalPairs/2) pair coverage.
- **FR-006** `functional` `accepted` priority=p0 — Compute inter-aspect evidence, sampled stability and up to three patterns in the frontend.
- **FR-007** `functional` `accepted` priority=p0 — Show no compatibility score or relationship verdict.
- **FR-008** `functional` `accepted` priority=p1 — Preserve input on retry and back navigation.
- **FR-009** `functional` `accepted` priority=p0 — Block depth expansion until usability Human Gate.
- **FR-010** `functional` `accepted` priority=p0 — The first MVP browser E2E traverses real auth/profile/BFF/FuFirE boundaries without route interception, canned upstream response or demo profile.

### 11. Non-Functional Requirements

- **NFR-001** `non_functional` `accepted` priority=p1 — Responsive at 320, 768 and 1440 CSS pixels without horizontal scrolling.
- **NFR-002** `non_functional` `accepted` priority=p1 — Keyboard accessible with visible focus and reduced-motion support.
- **NFR-003** `non_functional` `accepted` priority=p0 — Maximum three upstream samples per person, six calls per request, bounded parallelism and existing compute-rate-limit coverage.
- **NFR-004** `non_functional` `accepted` priority=p2 — No new runtime dependency without explicit benefit, security and bundle review.
- **NFR-005** `non_functional` `assumption` priority=p1 — DST resolution is explicit: exact nonexistent input fails; generated shifts/ambiguity policies are transported as warnings and never presented as exact observations.

### 12. Data Model and Core Entities

- **DATA-001** `data` `accepted` priority=p0 — RelationshipTimeInput is a discriminated union exact/approximate/unknown.
- **DATA-002** `data` `accepted` priority=p0 — WesternSynastryTransportResponse carries pseudonymous subjects, sample roles, bodies, optional exact-only houses/angles, precision and provenance.
- **DATA-003** `data` `accepted` priority=p0 — RelationshipAspectEvidence carries both person/body roles, aspect, orb range and sample coverage.
- **DATA-004** `data` `accepted` priority=p0 — Use dataPrecision, sampledStability, ruleStatus and interpretationStatus; generic confidence is forbidden.
- **DATA-005** `data` `accepted` priority=p0 — Partner input and analysis response are request-scoped in the MVP.

### 13. API Interface Requirements

- **API-001** `api` `accepted` priority=p0 — Authenticated POST /api/relationships/western-synastry accepts personAProfileId, request-scoped optional time refinement, ephemeral partner input and versioned consent assertion.
- **API-002** `api` `accepted` priority=p0 — Missing or false consent returns 422 before any FuFirE call.
- **API-003** `api` `accepted` priority=p0 — BFF uses existing FuFirE POST /v1/calculate/western only.
- **API-004** `api` `accepted` priority=p0 — Response acknowledges user attestation as not independently verified.
- **API-005** `api` `accepted` priority=p0 — No dimension profile or product view-model is returned by the BFF.
- **API-006** `api` `accepted` priority=p0 — Missing, malformed or foreign personAProfileId returns 404 and zero FuFirE calls.
- **API-007** `api` `accepted` priority=p0 — The /api/relationships path participates in the existing compute rate limiter and returns 429 before additional fan-out.

### 14. Architecture Constraints

- **ARCH-001** `architecture` `accepted` priority=p0 — FuFirE remains the calculation source and is not modified in the MVP.
- **ARCH-002** `architecture` `accepted` priority=p0 — BFF owns required auth, owner-filtered profile lookup, validation, consent, rate limiting, sampling, DST policy, redaction and error mapping.
- **ARCH-003** `architecture` `accepted` priority=p0 — Frontend owns product analysis and dimension configuration.
- **ARCH-004** `architecture` `accepted` priority=p0 — Current compareProfiles score helper is prohibited in the new flow.
- **ARCH-005** `architecture` `accepted` priority=p1 — API promotion is deferred to API-001 after user and domain evidence.

### 15. Security, Privacy and Compliance

- **SEC-001** `security` `accepted` priority=p0 — Consent is a required attestation and never represented as externally verified.
- **SEC-002** `security` `accepted` priority=p0 — Names, dates, times, places, coordinates and upstream payloads are redacted from logs.
- **SEC-003** `security` `verified` priority=p0 — FuFirE and Supabase secrets remain server-side.
- **SEC-004** `security` `accepted` priority=p0 — The relationship route requires auth and resolves personAProfileId with id + user_id; partner persistence is not invoked.
- **SEC-005** `privacy` `blocked` priority=p0 — BLOCKER: public launch requires final privacy and consent copy review.
- **SEC-006** `security` `accepted` priority=p0 — The relationship endpoint is included in the existing compute-rate-limit group and rejects over-limit calls before upstream fan-out.

### 16. Sustainability and GreenOps

- **SUS-001** `sustainability` `accepted` priority=p1 — Cap sampling at three charts per person, six calls per request, and apply compute rate limiting; avoid duplicate calls within one request.
- **SUS-002** `sustainability` `accepted` priority=p2 — LLM generation is excluded from MVP to avoid unproven latency, cost and token usage.

### 17. Context Engineering Artifacts

- **CTX-001** `context` `accepted` priority=p0 — Decision record is mandatory context for the coding agent.
- **CTX-002** `context` `accepted` priority=p0 — Implementation plan and machine-readable PRD are source-of-truth artifacts.
- **CTX-003** `context` `accepted` priority=p1 — API-001 captures deferred FuFirE promotion and prevents scope drift.

### 18. Implementation Phases

- **PHASE-001** `phase` `accepted` priority=p0 — Baseline and contracts: characterize old flow, define time/consent/status types.
- **PHASE-002** `phase` `accepted` priority=p0 — Vertical Slice A: own profile, partner input and consent.
- **PHASE-003** `phase` `accepted` priority=p0 — Vertical Slice B: BFF real Western sampling and client contract.
- **PHASE-004** `phase` `accepted` priority=p0 — Vertical Slice C: sampled evidence, simplified result and first real-boundary browser E2E.
- **PHASE-005** `phase` `accepted` priority=p0 — Human usability gate before depth.
- **PHASE-006** `phase` `accepted` priority=p1 — Conditional full dimensions, explorer, method and print.

### 19. Atomic Task Breakdown

- **TASK-001** `task` `accepted` priority=p0 — Freeze current relationship baseline without changing runtime.
- **TASK-002** `task` `accepted` priority=p0 — Define relationship types, time bands and status vocabulary.
- **TASK-003** `task` `accepted` priority=p0 — Add relationship-specific request validation.
- **TASK-004** `task` `accepted` priority=p0 — Build own-profile selection/creation plus transient time refinement for an unknown stored profile.
- **TASK-005** `task` `accepted` priority=p0 — Build partner exact/approximate/unknown input.
- **TASK-006** `task` `accepted` priority=p0 — Build review and consent assertion step.
- **TASK-007** `task` `accepted` priority=p0 — Write authenticated BFF route, owner-filter, consent, call-cap and rate-limit tests first.
- **TASK-008** `task` `accepted` priority=p0 — Implement authenticated relationship BFF route using owned profile lookup and existing FuFirE Western endpoint.
- **TASK-009** `task` `accepted` priority=p0 — Add client transport validation.
- **TASK-010** `task` `accepted` priority=p0 — Implement sampled aspect stability with all-pairs stable and center-plus-majority provisional threshold.
- **TASK-011** `task` `accepted` priority=p0 — Implement simplified no-score product analyzer.
- **TASK-012** `task` `accepted` priority=p0 — Build end-to-end MVP shell.
- **TASK-013** `task` `accepted` priority=p0 — Apply accessible pastel-Olive design tokens.
- **TASK-014** `task` `accepted` priority=p0 — Add the first real-boundary browser E2E with actual auth/profile/BFF/FuFirE boundaries and no route interception.
- **TASK-015** `task` `accepted` priority=p0 — Run the MVP evidence/release gate and record exact static, browser and real-boundary results.
- **TASK-016** `task` `accepted` priority=p0 — Run and document usability Human Gate.
- **TASK-017** `task` `accepted` priority=p1 — Expand to accepted six dimensions after gate.
- **TASK-018** `task` `accepted` priority=p1 — Add accepted explorer, method, print and rollout hardening while retaining real-boundary regression.

### 20. Acceptance Criteria

- **AC-001** `acceptance` `accepted` priority=p0 — Missing/false consent returns 422 and produces zero upstream calls.
- **AC-002** `acceptance` `accepted` priority=p0 — Owned-profile boundary resolves personAProfileId using id + user_id; foreign/missing IDs return 404 and zero upstream calls.
- **AC-003** `acceptance` `accepted` priority=p0 — Exact mode produces one sample per exact person and may expose exact houses/angles.
- **AC-004** `acceptance` `accepted` priority=p0 — Approximate/unknown use bounded samples; provisional requires center pair plus at least ceil(totalPairs/2), and houses/angles remain unavailable unless both are exact.
- **AC-005** `acceptance` `accepted` priority=p0 — Real-boundary flow reaches actual authenticated profile persistence and actual FuFirE with no route interception or canned upstream response.
- **AC-006** `acceptance` `accepted` priority=p0 — New flow contains no score or relationship verdict.
- **AC-007** `acceptance` `accepted` priority=p0 — Every displayed pattern carries body roles, aspect/orb range, sample coverage and explicit statuses.
- **AC-008** `acceptance` `accepted` priority=p0 — Depth work begins only after the real MVP evidence gate and a recorded usability decision.
- **AC-009** `acceptance` `assumption` priority=p1 — Exact nonexistent local time is rejected; generated DST adjustments or ambiguity policies are surfaced in transport warnings.
- **AC-010** `acceptance` `accepted` priority=p0 — Compute rate-limit returns 429 and prevents further FuFirE fan-out.
- **AC-012** `acceptance` `accepted` priority=p0 — Partner input and analysis result are not automatically persisted; storage calls are absent from the relationship flow.
- **AC-013** `acceptance` `blocked` priority=p0 — Public launch remains blocked until astrology wording, privacy wording and consent copy receive recorded human approval.

### 21. Test Strategy

- **TEST-001** `test` `accepted` priority=p0 — Unit/route test consent 422 and zero upstream calls.
- **TEST-002** `test` `accepted` priority=p0 — Time-band and relationship validator matrix.
- **TEST-003** `test` `accepted` priority=p0 — Authenticated own-profile select/create, transient unknown-time refinement and owner-filter regression.
- **TEST-004** `test` `accepted` priority=p0 — BFF auth, owner lookup, consent short-circuit, call count and transport contract with process-local upstream double.
- **TEST-005** `test` `accepted` priority=p0 — Aspect symmetry, role preservation, center-plus-majority sampled stability and no generic confidence.
- **TEST-006** `test` `accepted` priority=p0 — Gated Playwright real-boundary smoke with actual auth/profile persistence and actual FuFirE, no route interception.
- **TEST-007** `test` `accepted` priority=p0 — Static/DOM check excludes compareProfiles and all compatibility percentages.
- **TEST-008** `test` `accepted` priority=p1 — Responsive, keyboard, contrast and reduced-motion checks.
- **TEST-009** `test` `assumption` priority=p1 — DST boundary tests for exact rejection, generated shift warning and ambiguous-time policy.
- **TEST-010** `test` `accepted` priority=p0 — Dedicated relationship compute-rate-limit test proves 429 and zero additional upstream fan-out.
- **TEST-011** `test` `accepted` priority=p0 — Storage spy and repository review prove the relationship flow does not write partner input or analysis result.
- **TEST-012** `test` `accepted` priority=p0 — Bundle/env/log review proves FuFirE and Supabase secrets and raw birth payloads are not exposed.
- **TEST-013** `test` `blocked` priority=p0 — Human review checklist records astrology, privacy and consent-copy approval before public launch.

### 22. Observability and Monitoring

- **OBS-001** `observability` `accepted` priority=p0 — Log request ID, duration, sample count, status and upstream code without PII.
- **OBS-002** `observability` `accepted` priority=p0 — Record real-boundary request ID and evidence class in the completion report.
- **OBS-003** `observability` `accepted` priority=p1 — No fake progress percentage; UI shows named processing stages only.

### 23. Risk Register

- **RISK-001** `risk` `accepted` priority=p0 — Consent copy may be mistaken for verified consent. Mitigation: explicit attestation wording and 422 gate.
- **RISK-002** `risk` `accepted` priority=p0 — Discrete samples may miss behavior between sample points. Mitigation: center-plus-majority threshold, visible sampled approximation, capped claims and later interval-engine review.
- **RISK-003** `risk` `accepted` priority=p1 — Frontend-owned rules can diverge across future clients. Mitigation: version rules and API-001 promotion gate.
- **RISK-004** `risk` `accepted` priority=p0 — Real-boundary staging may be unavailable. Mitigation: do not claim acceptance; keep flag disabled.
- **RISK-005** `risk` `accepted` priority=p1 — Pastel visual polish may hide comprehension problems. Mitigation: usability gate before depth.
- **RISK-006** `risk` `accepted` priority=p0 — Profile ID without server-side owner filtering could expose or process another user’s birth data. Mitigation: required auth, id + user_id lookup, 404 and zero-upstream authz test.
- **RISK-007** `risk` `assumption` priority=p1 — Generated samples on DST transitions can shift or duplicate local time. Mitigation: explicit policies, warnings and boundary tests.

### 24. Rollback and Checkpoints

- **ROLLBACK-001** `rollback` `accepted` priority=p0 — Feature stays behind RELATIONSHIP_MVP_ENABLED; disable to revert user exposure.
- **ROLLBACK-002** `rollback` `accepted` priority=p0 — Old Synastry tab and route remain until user acceptance.
- **ROLLBACK-003** `checkpoint` `accepted` priority=p0 — Stop after real-boundary MVP and request Human Gate before TASK-017.
- **ROLLBACK-004** `rollback` `accepted` priority=p1 — No DB migration or FuFirE change is required, reducing rollback surface.

### 25. Definition of Done

- **DOD-001** `done` `accepted` priority=p0 — TASK-001 through TASK-015 implemented with recorded focused, typecheck, build and real-boundary results; no result is presumed green in advance.
- **DOD-002** `done` `accepted` priority=p0 — Real-boundary smoke passes and records request ID without PII.
- **DOD-003** `done` `accepted` priority=p0 — No score, demo result, placeholder, route interception or canned upstream response supports the completion claim.
- **DOD-004** `done` `accepted` priority=p0 — Usability Human Gate is documented before depth expansion.

### 26. Agent Handoff Instructions

- **CTX-004** `handoff` `accepted` priority=p0 — Read decision record, PRD and plan before editing code.
- **CTX-005** `handoff` `accepted` priority=p0 — Implement tasks in order and stop after the TASK-015 evidence gate for review.
- **CTX-006** `handoff` `accepted` priority=p0 — Stop if DB migration, FuFirE modification, partner persistence, consent meaning change, owner-filter bypass, rate-limit bypass or more than three samples per person becomes necessary.
- **CTX-007** `handoff` `accepted` priority=p0 — Report exact commands, outputs, evidence class and residual limitations.

## traceability_matrix

| Requirement | AC | Tests | Tasks | Risks |
|---|---|---|---|---|
| FR-003 | AC-001 | TEST-001 | TASK-003, TASK-006, TASK-007, TASK-008 | RISK-001 |
| FR-004 | AC-002, AC-003, AC-004 | TEST-002 | TASK-002, TASK-003, TASK-005 | RISK-002 |
| FR-005 | AC-003, AC-004, AC-005, AC-009 | TEST-002, TEST-004, TEST-005, TEST-006, TEST-009 | TASK-002, TASK-007, TASK-008, TASK-010, TASK-014 | RISK-002, RISK-004 |
| FR-006 | AC-007 | TEST-005 | TASK-010, TASK-011 | RISK-002, RISK-003 |
| FR-007 | AC-006 | TEST-007 | TASK-001, TASK-011, TASK-012 | — |
| API-002 | AC-001 | TEST-001 | TASK-007, TASK-008 | RISK-001 |
| ARCH-003 | AC-007 | TEST-005 | TASK-010, TASK-011, TASK-017 | RISK-003 |
| SEC-002 | AC-005 | TEST-004, TEST-006 | TASK-008, TASK-015 | RISK-004 |
| NFR-001 | AC-008 | TEST-008 | TASK-013, TASK-014, TASK-015 | RISK-005 |
| FR-009 | AC-008 | — | TASK-016, TASK-017 | RISK-005 |
| FR-001 | AC-002, AC-005 | TEST-003, TEST-004, TEST-006 | TASK-004, TASK-007, TASK-008, TASK-014 | RISK-006 |
| SEC-004 | AC-002, AC-005 | TEST-003, TEST-004, TEST-006 | TASK-004, TASK-007, TASK-008, TASK-014 | RISK-006 |
| SEC-006 | AC-010 | TEST-010 | TASK-007, TASK-008, TASK-015 | — |
| FR-002 | AC-012 | TEST-011 | TASK-005, TASK-008, TASK-012, TASK-015 | — |
| FR-010 | AC-005 | TEST-006 | TASK-014, TASK-015 | RISK-004 |
| API-001 | AC-001, AC-002, AC-003, AC-004, AC-005 | TEST-001, TEST-002, TEST-003, TEST-004, TEST-006 | TASK-002, TASK-003, TASK-007, TASK-008, TASK-014 | RISK-001, RISK-002, RISK-006 |
| API-003 | AC-005 | TEST-004, TEST-006 | TASK-008, TASK-014 | RISK-004 |
| API-004 | AC-001 | TEST-001 | TASK-006, TASK-007, TASK-008 | RISK-001 |
| API-005 | AC-009 | TEST-004, TEST-005 | TASK-008, TASK-009, TASK-010, TASK-011 | RISK-003 |
| API-006 | AC-002 | TEST-003, TEST-004 | TASK-007, TASK-008 | RISK-006 |
| API-007 | AC-010 | TEST-010 | TASK-007, TASK-008, TASK-015 | — |
| ARCH-001 | AC-005 | TEST-004, TEST-006 | TASK-008, TASK-014 | RISK-003 |
| ARCH-002 | AC-001, AC-002, AC-006, AC-010 | TEST-001, TEST-003, TEST-004, TEST-009, TEST-010 | TASK-002, TASK-003, TASK-007, TASK-008 | RISK-001, RISK-002, RISK-006, RISK-007 |
| ARCH-004 | AC-008 | TEST-007 | TASK-001, TASK-011, TASK-012 | — |
| SEC-001 | AC-001 | TEST-001 | TASK-003, TASK-006, TASK-007, TASK-008 | RISK-001 |
| SEC-003 | AC-005 | TEST-012 | TASK-008, TASK-013, TASK-015 | — |
| SEC-005 | AC-013 | TEST-013 | TASK-016 | RISK-001, RISK-005 |

## evidence_ledger

- **EVD-001 → INFO-002** `repository_evidence` confidence=5/5 — src/utils/synastry.ts lines 47-69 and src/server/app.ts lines 674-708 Limitations: Static inspection; runtime not executed in this artifact build.
- **EVD-002 → INFO-003** `repository_evidence` confidence=5/5 — src/utils/birthInputValidation.ts lines 93-103 Limitations: Shows current placeholder behavior, not desired behavior.
- **EVD-003 → FR-001** `repository_evidence` confidence=5/5 — src/server/app.ts lines 820-865 and nb_profiles migration with RLS Limitations: Live Supabase boundary not tested here.
- **EVD-004 → API-003** `repository_evidence` confidence=5/5 — FuFirE routers/western.py and New_Bazi fufireClient.ts postWestern Limitations: No live call executed during document generation.
- **EVD-005 → FR-003** `direct_source` confidence=5/5 — User explicitly chose mandatory checkbox attestation as the maximum verifiable consent control. Limitations: Attestation does not prove actual consent.
- **EVD-006 → FR-004** `direct_source` confidence=5/5 — User chose rough day-part input and uncertainty range rather than omitting all Moon-related material. Limitations: Exact time-band boundaries are a reversible assumption.
- **EVD-007 → ARCH-003** `direct_source` confidence=5/5 — User chose frontend ownership for dimensions and normalization with a later API ticket. Limitations: Future multi-client consistency remains a risk.
- **EVD-008 → DOD-002** `missing` confidence=1/5 — MISSING: real staging smoke has not yet run. Limitations: Blocks real-function completion claim.
- **EVD-009 → SEC-004** `repository_evidence` confidence=5/5 — src/server/app.ts /api/me/profiles uses requireUserAuth and user_id owner filters. Limitations: New relationship route is not yet implemented.
- **EVD-010 → SEC-006** `repository_evidence` confidence=5/5 — src/server/app.ts has global and compute rate limiters; relationship path must be added to compute group. Limitations: Coverage for the new path is a planned change.

## findings

- **F-001** `high` `product_logic` — Current compareProfiles percentage is too coarse for the new Western-only product and must not be reused. Impact: Would present a misleading verdict and mix BaZi with Western scope. Recommendation: Prohibit import and add no-score DOM/static tests. Status: `source_inspected`.
- **F-002** `high` `data_precision` — Current unknown-time path substitutes 12:00 and therefore needs a relationship-specific uncertainty model. Impact: Could make uncertain Moon/angle outputs appear exact. Recommendation: Use exact/approximate/unknown union and sampled stability. Status: `source_inspected`.
- **F-003** `critical` `privacy` — Current synastry route has no required second-person consent assertion. Impact: A caller can start pair analysis without even attesting permission. Recommendation: Add BFF 422 gate and explicit non-verification wording. Status: `source_inspected_and_user_decided`.
- **F-004** `medium` `architecture` — Product dimensions are not yet evidence-backed as a reusable API standard. Impact: Premature API standardization would increase migration cost. Recommendation: Keep versioned frontend config and defer API promotion to API-001. Status: `user_decided`.
- **F-005** `high` `runtime` — Real-boundary behavior remains unverified until staging smoke executes. Impact: Static, unit or process-local integration tests cannot support a real-function claim. Recommendation: Run the first browser E2E against actual profile and FuFirE boundaries and record request ID. Status: `unverified`.
- **F-006** `high` `authorization` — The new analysis should not trust raw Person-A data when the MVP promise is an owned stored profile boundary. Impact: A caller could bypass profile ownership and the real-boundary test would validate the wrong trust model. Recommendation: Accept personAProfileId, resolve with id + user_id, return 404 and make zero upstream calls on mismatch. Status: `source_inspected_and_planned`.
- **F-007** `medium` `reliability_security` — The existing compute limiter does not automatically cover a new /api/relationships path unless explicitly added. Impact: One request can fan out to six paid upstream calls, increasing abuse and cost exposure. Recommendation: Add the path to the compute limiter and test 429 before fan-out. Status: `source_inspected_and_planned`.

## security_controls

Risk: **high**

### authentication

- **SEC-101** `accepted` — Use existing Supabase authentication for persisted own-profile access; anonymous MVP profile persistence is not introduced.

### authorization

- **SEC-102** `accepted` — Require auth and resolve personAProfileId with id + user_id; return 404 and zero FuFirE calls for missing/foreign IDs. Partner data are not persisted.

### secrets_management

- **SEC-103** `accepted` — FuFirE and Supabase service credentials remain server-side and are never serialized to the browser.

### logging_and_redaction

- **SEC-104** `accepted` — Log request ID, status and sample count only; redact names, birth data, location and payloads.

### data_protection

- **SEC-105** `accepted` — Partner data and results are request-scoped; no automatic persistence or analytics payload contains birth data.

### abuse_cases

- **SEC-106** `accepted` — Reject absent/false consent, invalid profile IDs, oversized inputs, excessive sample fan-out and compute-rate-limit violations before upstream calls.

### destructive_action_controls

- **SEC-107** `accepted` — No migration, deletion or partner persistence action is in current scope; feature rollback uses a flag.

### security_tests

- **SEC-108** `accepted` — Add consent short-circuit, owner-filter, log-redaction, compute-rate-limit and secret/bundle tests plus a separate real-boundary smoke.

### privacy_controls

- **SEC-109** `needs_review` — UI states that attestation is user-provided and not independently verified; final public wording needs human review.

### human_review_checkpoints

- **SEC-110** `needs_review` — Privacy/text review before public launch and human usability gate before depth expansion.

## machine_readable_json

Canonical machine-readable mirror: `prd_report.json`.

## agent_handoff

**Objective:** Implement TASK-001 through TASK-015 and stop after the real-boundary evidence gate before depth expansion.

**Validation commands**
- `npm test -- src/utils/relationship`
- `npm test -- src/server/app.relationship.test.ts src/server/app.ratelimit.test.ts`
- `npm test -- src/components/relationship`
- `npm run lint`
- `npm run build`
- `RELATIONSHIP_REAL_BOUNDARY=1 npm run e2e -- tests/e2e/relationship-real-boundary.spec.ts`

**Stop conditions**
- A DB migration is required
- A new FuFirE endpoint is required
- Consent wording changes meaning
- Owner-filter or rate-limit behavior cannot be preserved
- More than three samples per person are required
- Staging credentials are unavailable for TASK-014
- Depth work begins before Human Gate

**Human review checkpoints**
- After real-boundary smoke
- After usability sessions
- Before public launch
- Human public-launch review: TEST-013

## quality_gate_report

- **Precision Gate**: `PASS` — Core behavior is defined with binary acceptance criteria and explicit uncertainty statuses.
- **Missing Information Gate**: `PASS` — Remaining unknowns are labeled and do not block MVP coding.
- **Evidence Gate**: `PASS` — Repository facts and user decisions have source IDs; runtime remains explicitly unverified.
- **Architecture Gate**: `PASS` — FuFirE, BFF and frontend ownership are explicit; API promotion is deferred.
- **Data Gate**: `PASS` — Time modes, evidence roles, lifecycle and non-persistence are explicit.
- **Security Gate**: `PASS` — Consent attestation, auth boundary, redaction and stop rules are specified; public launch remains human-gated.
- **Agent Executability Gate**: `PASS` — Tasks, allowed files, commands, rollback and stop conditions are defined.
- **Testability Gate**: `PASS` — Requirements map to tests and real-boundary evidence.
- **Artifact Gate**: `PASS` — Markdown, JSON and SARIF artifacts are emitted and validated.

Overall: **PASS**

## open_questions

- **OQ-001** blocks_release=false — What is the final product name and URL slug?
- **OQ-002** blocks_release=false — Which dimensions and labels survive the usability gate?
- **OQ-003** blocks_release=true — Are staging credentials available for the required real-boundary smoke?
- **OQ-004** blocks_release=true — Has final astrology, privacy and consent copy been approved for public launch?

## final_decision

**release** — Freigabe an den Coding-Agenten für TASK-001 bis TASK-015. Keine Produktionsfreigabe; TASK-014/015 benötigen eine reale Umgebung.
