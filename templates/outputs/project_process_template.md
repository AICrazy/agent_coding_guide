---
phase: startup
state: draft
last_completed_phase:
fallback_role:
gates:
  G1: pending
  G2: pending
  G3: pending
  G4: pending
  G5: pending
---
# PROJECT_PROCESS (项目进度)

## Status (状态)
- Current phase: `startup|product_requirements|system_requirements|software_requirements|system_design|detailed_design|implementation|unit_test|integration_test|system_test|acceptance_validation|release_retro`. (当前阶段)
- Current state: `draft|ready|blocked|rework|accepted|rejected`. (当前状态)
- Last completed phase. (最近完成阶段)
- Fallback role if rework is needed. (返工回退角色)

> **Automation note**: keep the YAML frontmatter above in sync with the human-readable sections below. Orchestrators should parse the frontmatter for programmatic gate and phase decisions.

## Gate Status (门禁状态)
- `G1 Requirements Baseline`: `pass|fail|conditional|pending`
- `G2 Design Baseline`: `pass|fail|conditional|pending`
- `G3 Test Readiness`: `pass|fail|conditional|pending`
- `G4 Verification Complete`: `pass|fail|conditional|pending`
- `G5 Acceptance Complete`: `pass|fail|conditional|pending`

## Baselines (基线)
- Requirements baseline version. (需求基线版本)
- Design baseline version. (设计基线版本)
- Active change requests. (当前变更请求)

## Recent Work (最近工作)
- Completed items. (已完成项)

## Blockers (阻塞项)
- Current blockers or `none`. (当前阻塞项或 `none`)

## Active Rework (当前返工)
- Failed `TC-*` / `DEF-*` being fixed, or `none`. (当前正在修复的失败用例或缺陷，或 `none`)
- Planned retest scope and owner, or `none`. (计划返测范围与负责人，或 `none`)

## Next Step (下一步)
- Immediate next action. (下一步动作)

## Code Target (代码落点)
- Current chosen code target. (当前选定代码落点)

## Impacted Verification Levels (受影响验证层级)
- `unit|integration|system` or `none`. (受影响验证层级)

## Acceptance Revalidation (验收复核)
- `yes|no`. (是否需要重新验收)
- Related `CR-*` or evidence refs, or `none`. (关联变更单或证据)

## Structure Changes (结构变更)
- New top-level files or directories created this round, or `none`. (本轮新增的顶层文件或目录，或 `none`)
- Reason each structure change was necessary, or `none`. (每项结构变更的必要性说明，或 `none`)
- Confirm whether structure still follows `code_target + tests + docs` inside the project root, with the guide available as sibling `../agent_coding_guide/`, or note the approved exception. (确认目录结构是否仍符合项目根内 `code_target + tests + docs` 且同级存在 `../agent_coding_guide/`，否则说明已批准的例外)

## Evidence (证据)
- Key docs or code targets touched. (涉及的关键文档或代码落点)
