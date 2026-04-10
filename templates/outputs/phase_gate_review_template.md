---
gate:
artifact:
version:
decision:
decision_date:
---
# PHASE_GATE_REVIEW (阶段门禁评审模板)

> **Automation note**: keep the YAML frontmatter above in sync with the human-readable sections below. Orchestrators should parse the frontmatter for programmatic gate decisions.

## Gate Meta (门禁元信息)
- Gate: `G1|G2|G3|G4|G5`
- Artifact or package. (评审对象)
- Version or baseline. (版本或基线)

## Roles (角色)
- Author. (作者)
- Reviewer. (评审者)
- Approver. (批准者)
- Tester if applicable. (测试者)

## Inputs (输入)
- Required docs and evidence refs. (文档与证据引用)

## Change Control (变更控制)
- Related `CR-*` refs or `none`. (关联变更请求)
- Post-baseline change closure status: `open|closed|n/a`. (变更关闭状态)
- Retest / revalidation refs if applicable. (返测或重新验收引用)

## Reviewer Comments (评审意见)
- Comment id. (意见编号)
- Comment text. (意见内容)
- Status: `open|closed|waived`. (状态)
- Owner. (责任人)
- Resolution or waiver rationale. (关闭或豁免说明)

## Findings (发现)
- Open issues. (未关闭问题)
- Open issue actions. (未关闭问题的处理动作)
- Closed issues. (已关闭问题)
- Waived issues and rationale. (豁免问题及理由)

## Decision (结论)
- `pass|fail|conditional`
- Conditions to close if any. (若有条件项，列出关闭条件)
- Decision date. (结论日期)
