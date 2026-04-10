# AGENT_STARTUP

Read in order:
1. `project_process.md` if present
2. latest 20 `agent_work_diary.md` entries if present
3. `project_config.yml`
4. `docs/requirements/product_requirements.md`
5. `../agent_coding_guide/governance/workflow_protocol.md`
6. `../agent_coding_guide/governance/product_registry.yaml`
7. `docs/requirements/system_requirements_spec.md` if present
8. `docs/requirements/software_requirements_spec.md` if present
9. `README.md` only if extra human context is needed

Rules:
- `docs/requirements/ > README.md`
- `single-agent compatible`
- `process_model: v_model`
- `review_mode: virtual_roles`
- failed required tests must drive a fix -> retest loop until they pass with evidence or the release is rejected
- outputs live in `project_process.md`, `agent_work_diary.md`, and `docs/{requirements,design,verification,validation,quality}`
