# AGENT_CODING_GUIDE

Purpose:
- compact V-model repo guide for single-agent delivery

Runtime entry:
- `agent_startup.md`

Runtime files:
- `project_config.yml`
- `docs/requirements/`
- `project_process.md` if present
- `agent_work_diary.md` if present
- sibling `../agent_coding_guide/governance/workflow_protocol.md`
- sibling `../agent_coding_guide/governance/product_registry.yaml`

Outputs:
- `docs/requirements/`
- `docs/design/`
- `docs/verification/`
- `docs/validation/`
- `docs/quality/`

Structure:
- product code -> `code_target`
- verification assets -> `tests/`
- persisted docs -> `docs/`
- sibling guide assets -> `../agent_coding_guide/`
