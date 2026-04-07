# KNOWLEDGE (经验模板)

## Meta (元信息)
- Type: `general`
- Feature: Repo structure guardrails for controlled file creation
- Status: `active`

## Problem (问题)
- Delivery work can gradually leave behind uncontrolled files and folders when every new need creates a new bucket.
- This weakens ownership and mixes outputs with temporary artifacts.

## Working Solution (有效方案)
- Reuse existing categorized locations before creating anything new.
- Treat `code_target` as the default home for product implementation files.
- Keep test scripts, test configs, and test-tool dependency entrypoints together inside a dedicated `tests/` directory.
- Use selected `docs/` plus `agent_coding_guide/knowledges/` for persisted documents.
- Require an explicit recorded reason before creating any new top-level file or directory.
- Route runtime, cache, and report artifacts into named categories and ignore them when they are not part of the intended persisted outputs.
- Why it worked:
  - File creation becomes a governed decision instead of an ad hoc side effect.
  - Root-level clutter becomes reviewable.

## Constraints (约束)
- When to use:
  - Any flow where agents or scripts may create files during implementation, testing, or documentation.
  - Repos that want stable, reviewable structure.
- When not to use:
  - Very early scaffolding of an empty repo.
  - Framework-enforced structures that should be followed directly.

## Update Note (更新说明)
- If the repo later adopts stricter automated structure linting, update this note to prefer the enforced tool over manual review-only guardrails.
