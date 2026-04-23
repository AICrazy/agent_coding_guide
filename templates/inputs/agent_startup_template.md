# AGENT_STARTUP

Read in order:
1. `project_process.md` if present
2. latest 20 `agent_work_diary.md` entries if present
3. `project_config.yml`
4. `docs/requirements/product_requirements.md`
5. `../agent_coding_guide/governance/workflow_protocol.md`
6. `../agent_coding_guide/governance/scenario_routing_policy.md`
7. `../agent_coding_guide/governance/product_registry.yaml`
8. `docs/requirements/system_requirements_spec.md` if present
9. `docs/requirements/software_requirements_spec.md` if present
10. `README.md` only if extra human context is needed

Rules:
- `docs/requirements/ > README.md`
- `single-agent compatible`
- `process_model: v_model`
- `review_mode: virtual_roles`
- every workflow entry, including new work, resumed work, bug fixes, iterations, and new requests, starts with a requirements alignment check against `docs/requirements/`
- every workflow entry must also be classified through `scenario_routing_policy.md`; the agent must pick the route itself even when the user provides only goals and acceptance criteria
- if requested behavior is not covered or conflicts with the current requirement baseline, update requirements first; after `G1`, use `CR-*` before coding continues
- failed required tests must drive a fix -> retest loop until they pass with evidence or the release is rejected
- outputs live in `project_process.md`, `agent_work_diary.md`, and `docs/{requirements,design,verification,validation,quality}`
