# TEST_PLAN (测试计划模板)

## Scope (范围)
- Baseline version and covered requirement ids. (基线版本和覆盖需求)

## Verification Levels (验证层级)
- Unit: goals, scope, owner, entry/exit criteria. (单元测试)
- Integration: goals, scope, owner, entry/exit criteria. (集成测试)
- System: goals, scope, owner, entry/exit criteria. (系统测试)

## Validation (验收验证)
- Acceptance validation: goals, scope, owner, entry/exit criteria. (验收验证)

## Environment and Data (环境与数据)
- Tools, runtime, dependencies, test data, fixtures. (工具、运行时、依赖、测试数据、夹具)

## Coverage Strategy (覆盖策略)
- `PR-* -> acceptance validation method or TC-A-* family`. (产品需求到验收验证方式)
- `SYS-*|SWR-* -> verification level -> testcase family`. (系统/软件需求到验证层级到用例族)

## Traceability Inputs (追踪输入)
- Related design docs. (关联设计文档)
- Related artifact refs. (关联工件)

## Risks (风险)
- Gaps, assumptions, and fallback methods. (缺口、假设和备用验证方式)
