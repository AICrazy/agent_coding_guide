# SCENARIO_ROUTING_POLICY

Canonical runtime rules live in `governance/workflow_protocol.md`.

Purpose:
- prevent workflow drift by forcing the agent to classify the current request into a known delivery scenario before changing code or docs
- let the user provide goals, constraints, and acceptance criteria while the guide owns the downstream process routing

Mandatory behavior:
- every workflow entry must produce one `primary_scenario`
- zero or more `secondary_scenarios` may be added when the work spans multiple concerns
- the agent must record the chosen scenario, baseline impact, required records, and planned verification in `project_process.md` before implementation continues
- if the user provides only goals, constraints, or acceptance criteria, the agent must infer the scenario and drive the full routed workflow; it must not wait for step-by-step instructions unless a safety-critical ambiguity blocks progress
- when multiple scenarios apply, use this precedence order for the primary route: `security_or_production_incident > gate_failure_or_failed_required_test > defect_fix > requirement_or_scope_change > new_build_or_resume > behavior_preserving_improvement > verification_recovery > release_closeout`

Universal automation flow:
1. Normalize the intake into `goal`, `problem`, `constraints`, `acceptance`, and `affected area`.
2. Run the requirements alignment check against `PR-*|SYS-*|SWR-*`, open `DEF-*`, and current evidence.
3. Classify the request into a `primary_scenario` and any `secondary_scenarios`.
4. Decide change control:
   `before G1` update requirements directly;
   `after G1` raise or update `CR-*` for any required-behavior or acceptance change;
   create or update `DEF-*` for any defect or gate-affecting issue.
5. Determine impacted artifacts across requirements, design, implementation, tests, traceability, validation, and quality records.
6. Update upstream artifacts before downstream implementation whenever behavior, scope, acceptance, or interfaces change.
7. Execute implementation or rework inside `code_target` and rerun all impacted verification levels.
8. Refresh `traceability_matrix`, verification evidence, acceptance evidence, `project_process.md`, and `agent_work_diary.md`.
9. Advance the next gate only when required evidence is complete; otherwise route into rework or reject the release.

Route families:
- `R1 New Baseline Build`
  Use when the product or major delivery pack does not yet have a valid baseline.
  Flow: scaffold missing lifecycle files -> author requirement pack -> `G1` -> author design pack -> `G2` -> author test plan/readiness -> `G3` -> implement -> verify -> `G4` -> validate -> `G5` -> retro.
- `R2 Resume Or Handoff`
  Use when work already exists and the agent must continue safely from current state.
  Flow: read `project_process.md` and latest diary -> align current request to baseline -> reopen the last incomplete phase or failed gate -> continue the pending route (`R3|R4|R5|R6|R7|R8`) -> refresh status and evidence.
- `R3 Baseline Change`
  Use when requested behavior, scope, acceptance, interfaces, or non-functional targets change.
  Flow: perform impact analysis -> create or update `CR-*` after `G1` -> revise requirements -> revise design and test plan -> update traceability targets -> implement -> rerun impacted `unit|integration|system|acceptance` checks -> close the `CR-*` only after evidence is refreshed.
- `R4 Defect Or Gate Rework`
  Use when behavior deviates from the current baseline or a required check fails.
  Flow: capture or update `DEF-*` -> identify the violated requirement and failing `TC-*` -> fix root cause -> rerun all impacted checks -> update defect status, traceability, and reports -> do not advance while blocker defects or required test failures remain.
- `R5 Behavior-Preserving Improvement`
  Use when the intended user-visible behavior stays the same and the change is internal quality, maintainability, or implementation hygiene.
  Flow: confirm no baseline behavior change -> update design only if needed -> implement the internal improvement -> rerun regression at impacted levels -> record the unchanged requirement mapping and evidence.
- `R6 Verification Recovery`
  Use when the implementation may already be correct but tests, traceability, or evidence are incomplete or stale.
  Flow: identify missing `TC-*`, evidence refs, or trace rows -> backfill plan and cases -> execute required checks -> update reports and matrix -> reopen `R4` if any required behavior fails.
- `R7 Release And Close-Out`
  Use when the goal is readiness review, acceptance, release, or retrospective completion.
  Flow: confirm open `CR-*|DEF-*` state -> verify required evidence completeness -> rerun any stale or impacted checks -> perform acceptance decision -> clean transient artifacts -> update retro and final status.
- `R8 Security, Stability, Or Production Incident`
  Use for security findings, severe regressions, outages, or urgent production-facing instability.
  Flow: classify impact and containment need -> record `DEF-*` and `security_assessment` when applicable -> apply the minimal safe fix -> rerun targeted plus impacted regression -> decide whether a baseline change is also needed through `CR-*` -> refresh acceptance or reject release.

Scenario catalog:
- `new_project` -> `R1`
  Create lifecycle files and the full delivery pack from requirements to acceptance before calling the project done.
- `idea_to_project_bootstrap` -> `R1`
  Convert a rough idea into explicit `PR-*`, then continue through the standard baseline-build route.
- `missing_requirements_backfill_before_G1` -> `R1`
  Do not implement against undocumented intent; finish the missing requirement baseline first.
- `resume_after_interrupt` -> `R2`
  Reconstruct current phase, unfinished gate work, and pending evidence before coding resumes.
- `agent_or_owner_handoff` -> `R2`
  Rebuild context from lifecycle records and continue from the latest valid baseline rather than chat memory.
- `continue_planned_iteration` -> `R2`
  Resume the current approved scope and reopen `R3`, `R4`, or `R5` based on what remains unfinished.
- `new_feature` -> `R3`
  Treat new user-visible behavior as baseline expansion, update requirements and acceptance first, then implement and retest.
- `requirement_change` -> `R3`
  Update the affected requirement chain and downstream artifacts before code changes.
- `scope_increase` -> `R3`
  Add new requirement IDs, extend design and tests, then implement the enlarged scope.
- `scope_reduction` -> `R3`
  Remove or mark obsolete requirement paths, prune affected design/tests, and verify the reduced acceptance target.
- `acceptance_criteria_change` -> `R3`
  Update acceptance planning and linked requirements before changing implementation or test expectations.
- `non_functional_target_change` -> `R3`
  Revise performance, reliability, security, accessibility, or usability requirements and the matching verification method.
- `ui_or_ux_change` -> `R3`
  Update product-visible behavior, visual constraints, and viewport checks before implementation.
- `api_contract_change` -> `R3`
  Update interface requirements, design allocations, consumers, providers, and integration/system tests together.
- `data_model_change` -> `R3`
  Update requirement and design traces for storage, migration, compatibility, and impacted tests before code changes.
- `platform_or_environment_support_change` -> `R3`
  Add or revise support requirements, compatibility constraints, and the corresponding verification matrix.
- `localization_or_accessibility_feature` -> `R3`
  Treat as requirement-bearing user-visible scope, not as optional polish.
- `integration_with_new_external_service` -> `R3`
  Extend requirements, design, risk handling, and verification coverage before connecting the new dependency.
- `bug_fix_against_baseline` -> `R4`
  Record the deviation, fix the root cause, and rerun the failing plus impacted regression checks.
- `failed_unit_test_rework` -> `R4`
  Start from the failing `TC-U-*`, repair the mapped requirement or design implementation, and rerun impacted unit and higher levels as needed.
- `failed_integration_test_rework` -> `R4`
  Repair cross-component behavior and rerun impacted integration and system checks.
- `failed_system_test_rework` -> `R4`
  Treat as a gate-affecting delivery issue, fix the user-visible root cause, and rerun system plus acceptance if scope is impacted.
- `failed_acceptance_rework` -> `R4`
  Route directly back into implementation and verification rework until acceptance evidence passes or the release is rejected.
- `visual_regression_fix` -> `R4`
  Record the UI defect, fix the product-visible issue, and rerun required viewport and state checks.
- `performance_regression_fix` -> `R4`
  Record the regression, fix the root cause, and rerun the measured performance verification with trace refs.
- `security_vulnerability_fix` -> `R8`
  Treat as urgent incident handling with defect evidence and security assessment where applicable.
- `production_incident_fix` -> `R8`
  Contain first, restore required behavior, then complete traceable repair and revalidation.
- `stability_or_reliability_incident` -> `R8`
  Capture the operational defect, apply the safe fix, and rerun impacted regression before close-out.
- `refactor_without_behavior_change` -> `R5`
  Confirm no requirement or acceptance change, then implement and rerun regression to prove behavior preservation.
- `code_cleanup_or_structure_cleanup` -> `R5`
  Keep requirements stable, adjust design notes if needed, and verify nothing user-visible changed.
- `technical_debt_repayment` -> `R5`
  Treat as internal improvement unless it changes behavior, in which case escalate to `R3`.
- `dependency_upgrade_without_behavior_change` -> `R5`
  Verify compatibility and regression; escalate to `R3` if supported behavior or environments change.
- `framework_or_toolchain_upgrade_without_behavior_change` -> `R5`
  Keep the same requirement baseline unless the upgrade changes supported behavior, acceptance, or constraints.
- `performance_optimization_without_requirement_change` -> `R5`
  If the target stays within the existing baseline, optimize internally and prove no regressions.
- `security_hardening_without_requirement_change` -> `R5`
  Improve internal safeguards and record any required security evidence; escalate to `R3` if product behavior changes.
- `test_gap_backfill` -> `R6`
  Add missing planned coverage and evidence for existing requirements, then reopen `R4` if failures appear.
- `traceability_repair` -> `R6`
  Rebuild missing trace rows and evidence refs before allowing gate progression.
- `documentation_and_implementation_mismatch_review` -> `R6`
  Determine whether docs or code are wrong; route to `R3` if the baseline must change or `R4` if the implementation deviated.
- `evidence_refresh_after_stale_runs` -> `R6`
  Rerun stale verification or acceptance checks and update the reports without changing scope.
- `release_readiness_check` -> `R7`
  Verify gates, open change items, evidence freshness, and structure compliance before release decision.
- `acceptance_review` -> `R7`
  Confirm final product outcomes against `PR-*` and recorded acceptance evidence.
- `release_candidate_revalidation` -> `R7`
  Re-run impacted evidence and acceptance after late changes before promoting the release.
- `post_release_retro` -> `R7`
  Capture what shipped, what slipped, and what reusable knowledge should be retained.
- `closeout_cleanup` -> `R7`
  Ensure transient artifacts are isolated or removed and lifecycle records reflect the final state.

Escalation rules:
- if a supposedly internal improvement changes user-visible behavior, reclassify from `R5` to `R3`
- if verification recovery uncovers a failing required behavior, reclassify from `R6` to `R4`
- if an incident fix changes the approved baseline, add `R3` as a secondary route and process `CR-*`
- if acceptance cannot pass with the current baseline, either continue `R4|R8` rework or reject the release explicitly

Minimum project record for every routed scenario:
- `primary_scenario`
- `secondary_scenarios`
- baseline impact: `none|requirements_update|CR-required|DEF-required`
- impacted artifacts
- planned verification levels
- acceptance revalidation need: `yes|no`
- current route status and next gate or rework step
