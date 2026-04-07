# PROJECT_PROCESS (项目进度)

## Status (状态)
- Current phase: `retro`. (当前阶段)
- Current state: `accepted`. (当前状态)
- Last completed phase: `retro`. (最近完成阶段)
- Fallback role if rework is needed: `sw_web`. (返工回退角色)

## Recent Work (最近工作)
- Implemented a browser-native Snake game with keyboard input, touch controls, difficulty switching, score/status display, pause/resume, restart, and game-over flow.
- Added responsive single-screen-first layout styling and adjusted spacing so the desktop gameplay UI fits in a `1366x768` viewport without vertical scrolling.
- Added Playwright-based gameplay and viewport checks under `tests/` with a self-hosted local static server.
- Completed design, test, and acceptance documents with requirement-to-evidence mapping.

## Blockers (阻塞项)
- none

## Next Step (下一步)
- none

## Code Target (代码落点)
- Current chosen code target: `src`

## Structure Changes (结构变更)
- New top-level files or directories created this round: `project_process.md`, `agent_work_diary.md`, `src/`, `tests/`, `docs/`
- Reason each structure change was necessary:
  - `project_process.md` is a required governed delivery output
  - `agent_work_diary.md` is a required governed delivery output
  - `src/` is required by `project_config.yml.code_target`
  - `tests/` keeps browser verification tooling outside product code
  - `docs/` stores required persisted outputs
- Structure follows `code_target + tests + docs + agent_coding_guide`: `yes`

## Evidence (证据)
- Product code: `src/index.html`, `src/styles.css`, `src/app.js`
- Verification: `tests/gameplay.spec.js`, `tests/viewport.spec.js`, `tests/playwright.config.js`
- Docs: `docs/design.md`, `docs/test_report.md`, `docs/acceptance.md`
- Command evidence: `npm run test` -> `4 passed (7.8s)`
- Knowledge refs:
  - `../../knowledges/general/repo-structure-guardrails.md`
  - `../../knowledges/web/buffered-direction-input-for-tick-games.md`
  - `../../knowledges/web/playwright-self-hosted-viewport-checks.md`
