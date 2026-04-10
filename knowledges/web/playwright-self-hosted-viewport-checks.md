# KNOWLEDGE (经验模板)

## Meta (元信息)
- Type: `web`
- Feature: Playwright self-hosted viewport checks
- Status: `active`

## Problem (问题)
- Browser-layout verification can fail for the wrong reason when the test command assumes a local static server was started manually first.
- This creates false negatives in responsive acceptance checks.

## Working Solution (有效方案)
- Put browser viewport checks behind a Playwright config that defines a local `webServer`, for example `python3 -m http.server 4173 -d src`, and point the tests at the matching local URL.
- Keep `reuseExistingServer: true` so the same command works both in clean CI-like runs and in local iterative debugging.
- Keep the Playwright config, package script, and dependencies together inside the project's dedicated `tests/` directory so browser tooling does not leak into the product root.
- Wire the config into the package script so a dedicated system or viewport command such as `npm --prefix tests run test:system` is self-contained.
- Why it worked:
  - It removes a manual prerequisite from acceptance.
  - Viewport evidence becomes reproducible across repeated runs.

## Constraints (约束)
- When to use:
  - Static or lightweight web apps that need browser checks against a locally served bundle or source directory.
  - Responsive verification flows where a missing dev server would otherwise create false failures.
- When not to use:
  - Projects that already have a managed app server lifecycle owned by another test harness.
  - Apps that need a more complex boot sequence than a simple local command can provide.

## Update Note (更新说明)
- If the project later adopts a dedicated dev server or framework-native preview server, update this note to prefer that managed command instead of `python3 -m http.server`.
