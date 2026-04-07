# WORKFLOW_PROTOCOL (执行协议)

version:
- `v1`

support:
- `agents: 0|1`
- registered `product`
- route/build role/defaults come from product registry

config:
- `agents`: `0|1`
- `product`: registered key
- `code_target`: relative source root
- `docs`: `design|test_report|acceptance`
- invalid:
  - bad `agents`
  - unknown `product`
  - absolute or empty `code_target`
  - unknown or duplicate `docs`
  - `agents: 1` without `acceptance`

inputs:
1. `agent_startup.md`
2. `project_process.md` if present
3. `agent_work_diary.md` if present
4. `project_config.yml`
5. `README.md`
6. `requirements.md`
7. `agent_coding_guide/governance/product_registry.yaml`

precedence:
- `agent_startup.md` defines startup order only
- `project_process.md` holds phase/state/code target
- `agent_work_diary.md` holds difficulties/resolutions
- `requirements.md > README.md`
- missing `agent_startup.md` -> scaffold from `templates/inputs/agent_startup_template.md`
- missing `README.md` -> scaffold from `templates/inputs/readme_template.md`
- missing `requirements.md` -> scaffold from `templates/inputs/requirements_template.md`
- missing `project_process.md` -> scaffold from `templates/outputs/project_process_template.md`
- missing `agent_work_diary.md` -> scaffold from `templates/outputs/agent_work_diary_template.md`
- do not overwrite root `requirements.md` in normal flow

outputs:
- `project_process` -> `project_process.md` -> `templates/outputs/project_process_template.md`
- `agent_work_diary` -> `agent_work_diary.md` -> `templates/outputs/agent_work_diary_template.md`
- `design` -> `docs/design.md` -> `templates/outputs/design_template.md`
- `test_report` -> `docs/test_report.md` -> `templates/outputs/test_report_template.md`
- `acceptance` -> `docs/acceptance.md` -> `templates/outputs/acceptance_template.md`
- `defect` -> `docs/defects/<id>.md` -> `templates/outputs/defect_report_template.md`
- `security` -> `docs/security.md` -> `templates/outputs/security_note_template.md`
- `knowledge` -> `agent_coding_guide/knowledges/<type>/<feature>.md` -> `templates/outputs/knowledge_template.md`

flow:
1. `requirement` -> normalize scope and map acceptance to planned evidence
2. `architecture` -> define boundary, modules, constraints, `code_target`
3. `build` -> implement `scope_in`
4. `test` -> verify behavior and evidence, classify defects
5. `accept` -> accept only with passing evidence for all required criteria
6. `knowledge_review` -> `created|updated|skipped_with_reason`
7. `retro` -> may live in `docs/acceptance.md`

phase_values:
- `startup|requirement|architecture|build|test|accept|knowledge_review|retro`

code_target:
- resolve once before `build`
- `project_config.yml.code_target` wins when present
- reuse existing layout first
- empty repo default -> use product registry default
- no duplicate app root

structure_policy:
- reuse existing locations first
- product files -> chosen `code_target`
- test scripts/configs/tooling entrypoints -> root `tests/`
- persisted docs -> selected `docs/` or `agent_coding_guide/knowledges/`
- allowed top-level dirs: chosen `code_target`, `tests/`, `docs/`, `agent_coding_guide/`, unless user-approved
- allowed recurring root files: delivery inputs/outputs plus lightweight repo metadata such as `README.md`, `requirements.md`, `project_config.yml`, `project_process.md`, `agent_work_diary.md`, `agent_startup.md`, `.gitignore`, `LICENSE`
- new top-level files/dirs require recorded reason, owner, and why existing locations were insufficient
- runtime/cache/report artifacts go to categorized ignored locations
- no scratch/debug leftovers in repo root
- extend an existing category before creating a parallel bucket

rules:
- `docs` controls persistence only; phases always run
- update `project_process.md` at phase start, phase completion, `blocked`, and `rework`
- append one `agent_work_diary.md` entry at phase start, blocker, major difficulty, resolution, and phase completion
- every new `agent_work_diary.md` `Time` value must start with `YYYY-MM-DD HH:MM:SS.mmm`; an optional short label may follow after ` | `
- product code writes stay inside chosen `code_target`
- during `requirement`, create a requirement-to-evidence checklist from every acceptance criterion and any explicit non-functional requirement that can block usability
- during `test`, every acceptance criterion must map to a concrete verification method and result; unverified required criteria are test failures, not soft risks
- a risk note cannot replace missing evidence for a required acceptance criterion
- `accept` requires passing evidence for every required acceptance criterion; missing evidence or failed evidence => no acceptance
- run `knowledge_review` before finishing `accept`; record exactly one of `created|updated|skipped_with_reason`
- if skipped, record the reason in `agent_work_diary.md`
- if a tool normally creates root artifacts, reconfigure it into `tests/` or another approved location when feasible
- if a framework truly requires a root file, record why relocation was not feasible
- blocker defect -> no acceptance
- security blocker -> no acceptance
- requirement ambiguity -> `blocked`
- design conflict -> `rework: architecture`
- test fail -> `rework: active build role`
- waived issue -> write `defect` or `security`
- sensitive change -> write `docs/security.md`
- knowledge is optional; write only for reusable experience, notable difficulty, or a better later solution
- evaluate knowledge after rework, failed-test fixes, new verification patterns, or replacement solutions
- knowledge type:
  - `general` for reusable cross-product patterns
  - `web` for browser/web implementation patterns
  - `python` for python runtime/script patterns
- repeated implementation with no new insight -> do not write knowledge
- better later solution for same feature -> update existing knowledge note, do not create duplicate
- before implementing a feature, active build role searches relevant notes in `knowledges/general/` and `knowledges/<type>/`
- for `web` products, if requirements include layout, viewport fit, responsiveness, readability, clipping, or overflow expectations, test evidence must include a viewport matrix that covers at least one common desktop, tablet, and mobile size
- for `web` viewport checks, record whether the page has vertical scrolling, horizontal overflow, major overlap/clipping, and whether the core interaction area is fully visible and usable
- if browser automation is unavailable, produce manual viewport notes or computed layout evidence; otherwise mark acceptance `blocked` or `reject`
- security blocker:
  - critical/high dependency vuln
  - committed secret
  - unresolved auth bypass
  - missing security evidence for sensitive change
- sensitive change:
  - auth/credential/secret/token handling
  - trust-boundary external call
  - user/private data storage

done:
- `project_process.md` exists
- `agent_work_diary.md` exists
- selected docs exist
- root `requirements.md` exists
- required behavior passes
- every required acceptance criterion has recorded evidence and result
- knowledge review decision is recorded
- any top-level structure changes are explicitly justified
- no unapproved top-level directories or tool files were introduced
- no unresolved blocker
- required defect/security outputs exist
