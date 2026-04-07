# DESIGN (设计文档)

## Goal (目标)
- Deliver a stable, browser-native Snake game that is immediately playable, keyboard-friendly, speed-adjustable, and readable within one desktop screen.

## Architecture (架构)
- System boundary:
  - Static client-only web app served from `src/` with no backend dependency.
- Main modules:
  - `index.html`: semantic single-page layout, controls, and status surfaces.
  - `styles.css`: responsive layout, single-screen-first sizing, and game look-and-feel.
  - `app.js`: game state, render loop, input buffering, collision rules, and UI wiring.
- Key responsibilities:
  - Keep all product code inside `src/`.
  - Keep verification tooling inside `tests/`.
  - Keep persisted delivery evidence in `docs/`.

## State and Data Flow (状态与数据流)
- Core state model:
  - `status`: `ready | running | paused | gameover`
  - `snake`: ordered segment coordinates
  - `direction` plus a short `queuedDirections` buffer
  - `food`, `score`, `difficulty`, `speed`, `tickHandle`
- Main transitions:
  - `ready -> running` on start
  - `running -> paused` on pause
  - `paused -> running` on resume
  - `running -> gameover` on wall or self collision
  - `any -> ready` on restart reset
- Data ownership:
  - `app.js` owns authoritative state
  - DOM reflects state through a single render/update path
  - Canvas rendering is derived from the current state snapshot

## Decisions (设计决策)
- Use plain HTML/CSS/JS to keep the project lightweight and easy to run.
- Use a short buffered direction queue so quick turns feel responsive without allowing illegal reverse moves.
- Use `setTimeout`-based tick scheduling so difficulty changes can take effect immediately by rescheduling the next move.
- Expose a small internal test API on `window` for deterministic acceptance checks of food, collision, and reset behavior.
- Rejected option:
  - Heavy framework scaffolding was rejected because the scope is a compact static browser game and the repo starts empty.

## Code Target (代码落点)
- Chosen code target: `src`
- Reuse/layout note:
  - Product implementation stays in `src/`
  - Browser automation config and specs stay in `tests/`
  - Required persisted docs stay in `docs/`

## Constraints (约束)
- Main gameplay UI must remain fully visible in a common desktop viewport without vertical scrolling.
- Layout must remain usable across desktop, tablet, and mobile widths.
- Keyboard input must remain responsive during quick turns.
- No backend, account, leaderboard, or multiplayer features are introduced.

## Risks (风险)
- Mobile browsers without hardware keyboards would satisfy layout but not ideal gameplay; mitigated by adding on-screen directional controls alongside keyboard input.
- Canvas sizing can become blurry or clipped on resize; mitigated with responsive CSS plus dynamic device-pixel-ratio resizing.
- Random food placement can make tests flaky; mitigated with deterministic food queue hooks in the internal test API.
