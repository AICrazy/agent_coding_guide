# VERIFICATION_REPORT (验证报告模板)

## Meta (元信息)
- Baseline version. (基线版本)
- Covered build or commit refs. (覆盖构建或提交)
- Related test plan ref. (关联测试计划)

## Summary (概览)
- Scope covered. (覆盖范围)
- Overall result: `pass|fail|partial`. (总体结果)
- Blocker defects: `DEF-*` refs or `none`. (阻塞缺陷)
- Open blockers or `none`. (阻塞项)

## Unit Verification (单元验证)
- `TC-U-*`: objective, method, result, evidence. (目标、方法、结果、证据)
- Coverage gaps or `none`. (覆盖缺口)

## Integration Verification (集成验证)
- `TC-I-*`: objective, method, result, evidence. (目标、方法、结果、证据)
- Interface or flow issues, or `none`. (接口或流程问题)

## System Verification (系统验证)
- `TC-S-*`: objective, method, result, evidence. (目标、方法、结果、证据)
- Environment, NFR, or viewport notes if applicable. (环境、非功能或视口说明)

## Defects and Risks (缺陷与风险)
- Related `DEF-*` refs or `none`. (缺陷引用)
- Non-blocker defects: `DEF-*` refs or `none`. (非阻塞缺陷)
- Remaining verification risks or `none`. (剩余验证风险)

## Traceability Status (追踪状态)
- Updated `docs/quality/traceability_matrix.md` ref. (追踪矩阵引用)
- Unverified required items or `none`. (未验证的必需项)
