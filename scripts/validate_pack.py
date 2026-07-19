#!/usr/bin/env python3
from pathlib import Path
import json, sys
root = Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve()
required = [
 'README.md',
 'docs/plans/2026-07-19-western-synastry-mvp-throughline.md',
 'docs/prd/prd_report.md','docs/prd/prd_report.json','docs/prd/code_findings.sarif.json',
 'docs/decisions/2026-07-19-western-synastry-decisions.md',
 'docs/handoff/CODING_AGENT_HANDOFF.md',
 'docs/reviews/ULTRATHINK_CRAFTSMANSHIP_REVIEW.md',
 'docs/reviews/EVIDENCE_DIALECTIC_VALIDATION.md',
 'validation/validation-report.txt',
 'docs/backlog/API-001-promote-western-synastry-analysis.md',
 'assets/pastel-olive.jpg'
]
errors=[]
for rel in required:
    if not (root/rel).exists(): errors.append('missing:'+rel)
plan=(root/required[1]).read_text(encoding='utf-8') if (root/required[1]).exists() else ''
prd=(root/'docs/prd/prd_report.md').read_text(encoding='utf-8') if (root/'docs/prd/prd_report.md').exists() else ''
dec=(root/'docs/decisions/2026-07-19-western-synastry-decisions.md').read_text(encoding='utf-8') if (root/'docs/decisions/2026-07-19-western-synastry-decisions.md').exists() else ''
for i in range(1,9):
    marker=f'DEC-20260719-{i:02d}'
    if marker not in dec: errors.append('decision_missing:'+marker)
for term in ['secondPersonConsentConfirmed','time-band-v1','sampledStability','real-boundary','API-001','tests/e2e/relationship-real-boundary.spec.ts']:
    if term not in plan: errors.append('plan_term_missing:'+term)
for term in ['final_decision','security_controls','traceability_matrix']:
    if term not in json.dumps(json.loads((root/'docs/prd/prd_report.json').read_text(encoding='utf-8'))): errors.append('prd_term_missing:'+term)
if errors:
    print('PACK VALIDATION: FAIL')
    print('\n'.join(errors))
    raise SystemExit(1)
print('PACK VALIDATION: PASS')
print('required_files='+str(len(required)))
print('decisions=8')
