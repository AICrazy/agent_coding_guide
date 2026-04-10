# WORKFLOW_PROTOCOL

version: `v4`

runtime_defaults:
- `agents: 1`
- one registered `product`
- one `code_target`
- `process_model: v_model`
- `review_mode: virtual_roles`
- phase-role routing comes from sibling guide file `../agent_coding_guide/governance/product_registry.yaml`

read_order:
- entry point is `agent_startup.md`; the agent reads the following in order after startup:
1. `project_process.md` if present
2. latest 20 `agent_work_diary.md` entries if present
3. `project_config.yml`
4. `docs/requirements/product_requirements.md`
5. `../agent_coding_guide/governance/workflow_protocol.md`
6. `../agent_coding_guide/governance/product_registry.yaml`
7. `docs/requirements/system_requirements_spec.md` if present
8. `docs/requirements/software_requirements_spec.md` if present
9. `README.md` only if extra human context is needed

truth:
- `docs/requirements/ > README.md`
- `README.md` is optional human context
- missing required docs -> scaffold from matching templates
- root `requirements.md` is retired

required_config:
- `agents`
- `product`
- `process_model`
- `review_mode`
- `code_target`
- `test_levels`
- `requirements_pack`
- `design_pack`
- `verification_pack`
- `validation_pack`
- `quality_pack`

config_rules:
- `product` must exist in product registry
- `process_model` must be `v_model`
- `review_mode` must be `virtual_roles`
- `code_target` must be relative and non-empty
- `test_levels` must include `unit|integration|system`
- `requirements_pack` must include `product_requirements|system_requirements_spec|software_requirements_spec|requirements_review`
- `design_pack` must include `system_design|detailed_design|design_review`
- `verification_pack` must include `test_plan|verification_report|test_readiness_review`
- `validation_pack` must include `acceptance_report|acceptance_review`
- `quality_pack` must include `traceability_matrix|release_retro`

default_outputs:
- `project_process.md`
- `agent_work_diary.md`
- `docs/requirements/product_requirements.md`
- `docs/requirements/system_requirements_spec.md`
- `docs/requirements/software_requirements_spec.md`
- `docs/requirements/requirements_review.md`
- `docs/design/system_design.md`
- `docs/design/detailed_design.md`
- `docs/design/design_review.md`
- `docs/verification/test_plan.md`
- `docs/verification/verification_report.md`
- `docs/verification/test_readiness_review.md`
- `docs/validation/acceptance_report.md`
- `docs/validation/acceptance_review.md`
- `docs/quality/traceability_matrix.md`
- `docs/quality/release_retro.md`

conditional_outputs:
- `docs/quality/change_requests/<id>.md` after `G1` scope changes
- `docs/quality/defects/<id>.md` for formal defect tracking or gate-affecting issues
- `docs/quality/security_assessment.md` for sensitive changes
- `docs/quality/risk_register.md` when a separate risk log is needed
- `../agent_coding_guide/knowledges/<type>/<feature>.md` only for reusable insight

output_templates:
  project_process: templates/outputs/project_process_template.md
  agent_work_diary: templates/outputs/agent_work_diary_template.md
  product_requirements: templates/inputs/product_requirements_template.md
  system_requirements_spec: templates/outputs/system_requirements_spec_template.md
  software_requirements_spec: templates/outputs/software_requirements_spec_template.md
  requirements_review: templates/outputs/phase_gate_review_template.md
  system_design: templates/outputs/system_design_template.md
  detailed_design: templates/outputs/detailed_design_template.md
  design_review: templates/outputs/phase_gate_review_template.md
  test_plan: templates/outputs/test_plan_template.md
  verification_report: templates/outputs/verification_report_template.md
  test_readiness_review: templates/outputs/phase_gate_review_template.md
  acceptance_report: templates/outputs/acceptance_report_template.md
  acceptance_review: templates/outputs/phase_gate_review_template.md
  traceability_matrix: templates/outputs/traceability_matrix_template.md
  release_retro: templates/outputs/release_retro_template.md
  change_request: templates/outputs/change_request_template.md
  defect_report: templates/outputs/defect_report_template.md
  security_assessment: templates/outputs/security_assessment_template.md
  risk_register: templates/outputs/risk_register_template.md
  knowledge: templates/outputs/knowledge_template.md

phases:
- `startup|product_requirements|system_requirements|software_requirements|system_design|detailed_design|implementation|unit_test|integration_test|system_test|acceptance_validation|release_retro`

gates:
- `G1 Requirements Baseline`
- `G2 Design Baseline`
- `G3 Test Readiness`
- `G4 Verification Complete`
- `G5 Acceptance Complete`

gate_checks:
- `G1`: requirements docs exist; `PR-*` have planned acceptance validation; `SYS-*|SWR-*` have planned verification level; requirements review recorded
- `G2`: design docs exist; `SD-*|DD-*` map upstream; design review recorded; one `code_target`
- `G3`: test plan exists; readiness review exists; verification levels and acceptance scope are defined
- `G4`: verification report exists; traceability passes; blocker defects = `none`; required security assessment passes
- `G5`: acceptance report exists; acceptance review exists; product outcomes have final evidence; blocker defects = `none`; decision is `accept|reject`

structure:
- product files -> `code_target`
- verification assets -> root `tests/`
- persisted docs -> `docs/`
- sibling guide assets -> `../agent_coding_guide/`
- no extra top-level dirs/files without justification

runtime_rules:
- update `project_process.md` at phase start, gate decision, rework, and close-out
- append `agent_work_diary.md` only for `phase_start|blocker|resolution|review|phase_done`
- read only the latest 20 diary entries by default; expand history only when needed
- keep `project_process.md` as current state, not a full history log
- any failed required test or validation item triggers immediate rework; inspect the failing `TC-*` evidence and related `DEF-*` items before proceeding
- rework must fix the root cause, rerun all impacted `unit|integration|system|acceptance` checks, and refresh affected evidence before the next gate decision
- continue the fix -> retest loop until required behavior passes with traceable evidence or the release is explicitly rejected
- after `G1`, required-behavior changes require `CR-*` plus impacted retest/revalidation
- every required item appears in the traceability matrix
- every required item has executed verification or validation evidence
- blocker defect = `DEF-*` with `gate_impact: blocker`
- default verification evidence lives in `docs/verification/verification_report.md`
- default acceptance evidence and decision live in `docs/validation/acceptance_report.md`
- `release_retro` is required and lives in `docs/quality/release_retro.md`
- sensitive change requires `docs/quality/security_assessment.md`
- `web` system verification must use registry desktop/tablet/mobile viewports when layout matters
- if browser automation is unavailable, record manual evidence or fail/condition the affected gate

done:
- default outputs exist
- conditional outputs exist when triggered
- `G1` to `G5` are recorded
- required behavior passes with traceable evidence
- failed required tests are either fixed and re-executed or the release is rejected
- blocker defects are closed or release is rejected
