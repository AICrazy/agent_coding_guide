# TEST_REPORT (测试报告)

## Scope (范围)
- Tested scope:
  - Single-page Snake gameplay in `src/`
  - Keyboard control and difficulty switching
  - Score growth, wall collision, self collision
  - Pause/resume and restart flow
  - Desktop/tablet/mobile responsive layout behavior

## Checks (检查项)
- Automated checks:
  - `npm run test`
  - `tests/gameplay.spec.js`
  - `tests/viewport.spec.js`
- Manual checks:
  - Lightweight visual sanity during layout tuning against the same target viewports

## Acceptance Criteria Coverage (验收标准覆盖)
| Criterion | Verification method | Result | Evidence |
| --- | --- | --- | --- |
| Board renders correctly in browser | Playwright opens `/`, verifies core board UI is visible in viewport checks | pass | `tests/viewport.spec.js` |
| Keyboard control changes snake direction correctly | Start game, press `ArrowUp`, assert head position changes upward on the next ticks | pass | `tests/gameplay.spec.js` |
| Difficulty selection updates the active speed correctly | Select `turbo`, assert internal speed becomes `95ms` and UI shows `Turbo` | pass | `tests/gameplay.spec.js` |
| Eating food increases snake length and score | Apply deterministic food-adjacent state, step once, assert score `+1` and snake length `+1` | pass | `tests/gameplay.spec.js` |
| Wall collision and self collision both end the game | Apply deterministic wall-hit and self-hit states, step once, assert `gameover` | pass | `tests/gameplay.spec.js` |
| Pause/resume works without breaking game state | Pause during a run, assert head stops moving, resume, assert motion continues | pass | `tests/gameplay.spec.js` |
| Restart resets score, snake, food, and status | Click Restart, assert score `0`, snake length `3`, non-null food, and status `Ready` | pass | `tests/gameplay.spec.js` |
| Desktop main gameplay UI is fully visible on one screen without vertical scrolling | Run desktop viewport check at `1366x768` and assert no vertical scroll, no horizontal overflow, board visible, controls usable | pass | `tests/viewport.spec.js` |
| Desktop/tablet/mobile layout stays usable and readable | Run viewport matrix at `1366x768`, `768x1024`, `390x844` and assert no horizontal overflow, no major clipping, usable core UI | pass | `tests/viewport.spec.js` |

## Viewport Matrix (视口矩阵，仅 Web 适用)
| Viewport size | Checks | Result | Evidence |
| --- | --- | --- | --- |
| `1366x768` desktop | Vertical scroll: no; horizontal overflow: no; major overlap/clipping: no; core UI fully visible and usable: yes | pass | `tests/viewport.spec.js` |
| `768x1024` tablet | Vertical scroll: allowed; horizontal overflow: no; major overlap/clipping: no; core UI visible and usable: yes | pass | `tests/viewport.spec.js` |
| `390x844` mobile | Vertical scroll: allowed; horizontal overflow: no; major overlap/clipping: no; core UI visible and usable: yes | pass | `tests/viewport.spec.js` |

## Results (结果)
- Passed checks:
  - `npm run test` completed successfully
  - Gameplay acceptance checks passed
  - Viewport acceptance checks passed
- Failed checks:
  - none

## Defect Refs (缺陷引用)
- none

## Security Ref (安全引用)
- none

## Evidence (证据)
- Command output:
  - `npm run test` -> `4 passed (7.8s)`
- Supporting files:
  - `tests/playwright.config.js`
  - `tests/gameplay.spec.js`
  - `tests/viewport.spec.js`

## Conclusion (结论)
- Test status: `pass`
- Fallback role if rework is required: `none`
