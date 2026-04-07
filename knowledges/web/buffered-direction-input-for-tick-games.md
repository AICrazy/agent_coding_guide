# KNOWLEDGE (经验模板)

## Meta (元信息)
- Type: `web`
- Feature: Buffered direction input for tick-based games
- Status: `active`

## Problem (问题)
- In tick-based movement games, a single `pendingDirection` slot can drop fast follow-up turns entered between ticks.
- The result feels like unresponsive keyboard control.

## Working Solution (有效方案)
- Replace a single pending direction slot with a short queue of upcoming valid directions.
- Validate each new direction against the last planned direction, not only the current direction, so opposite-direction reversals stay blocked while valid queued turns are preserved.
- Keep the queue intentionally short, such as two planned turns, to improve responsiveness without storing excessive stale input.
- Why it worked:
  - Quick combinations like `up` then `left` survive until the next two ticks.
  - Responsiveness improves without unbounded stale input.

## Constraints (约束)
- When to use:
  - Grid or tick-based browser games such as Snake where movement advances on a regular cadence.
  - Keyboard-driven controls where players often pre-input the next turn before the next tick.
- When not to use:
  - Real-time analog movement systems that already process input continuously each frame.
  - Games that intentionally want only one buffered move for difficulty reasons.

## Update Note (更新说明)
- If later playtesting shows that two queued turns are either too many or too few, update the queue length guidance rather than creating a duplicate note.
