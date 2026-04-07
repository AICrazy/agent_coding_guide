# AGENT_CODING_GUIDE (Agent 开发指南)

Purpose: minimal delivery guide. (最小交付 guide)

Support (支持范围):
- single-agent only (`agents: 0|1`) (仅支持单 agent)
- product must be registered in `governance/product_registry.yaml` (产品需在注册表中定义)

Project entry (项目入口):
- `agent_startup.md`

Project inputs (项目输入):
- `project_config.yml`
- `README.md`
- `requirements.md`
- `project_process.md`
- `agent_work_diary.md`

Primary outputs (主输出):
- `project_process.md`
- `agent_work_diary.md`
- `docs/design.md`
- `docs/test_report.md`
- `docs/acceptance.md`

Structure contract (目录结构约束):
- product code -> `code_target` (通常 `src/`)
- test tooling -> `tests/`
- persisted docs -> `docs/`
- guide assets -> `agent_coding_guide/`
- other top-level dirs/files require explicit justification (其他根级目录/文件必须明确说明理由)

Template groups (模板分组):
- `templates/inputs/`
- `templates/outputs/`

Execution protocol (执行协议):
- `governance/workflow_protocol.md`
- `governance/product_registry.yaml`

Role entry (角色入口):
- `agents/master_agent.md`
