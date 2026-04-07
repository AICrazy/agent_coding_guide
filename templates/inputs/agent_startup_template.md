# AGENT_STARTUP (Agent 启动入口模板)

## Purpose (用途)
- Start project delivery flow. (启动项目交付流程)
- Do not define product scope here. (此处不定义产品范围)

## Read Order (读取顺序)
1. `project_process.md`
2. `agent_work_diary.md`
3. `project_config.yml`
4. `README.md`
5. `requirements.md`
6. `agent_coding_guide/governance/workflow_protocol.md`
7. `agent_coding_guide/governance/product_registry.yaml`

## Source Of Truth (真源)
- `requirements.md > README.md`

## Progress File (进度文件)
- `project_process.md`

## Work Diary (工作日记)
- `agent_work_diary.md`

## Outputs (输出)
- `project_process.md`
- `agent_work_diary.md`
- `docs/design.md`
- `docs/test_report.md`
- `docs/acceptance.md`
- `agent_coding_guide/knowledges/<type>/<feature>.md` only when new reusable knowledge or a better solution appears

## Rule (规则)
- single-agent only (仅支持单 agent)
- follow `agent_coding_guide/governance/workflow_protocol.md`
- default structure contract: `src/` product code, `tests/` test tooling, `docs/` persisted docs, `agent_coding_guide/` guide assets
