# Agent Coding Guide

English | [简体中文](./README.zh-CN.md)

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](./LICENSE)
[![Scope](https://img.shields.io/badge/scope-single--agent-success)](#scope)
[![Products](https://img.shields.io/badge/products-web%20%7C%20python-informational)](#supported-products)

A lightweight, repo-first delivery guide for AI coding agents.

`Agent Coding Guide` helps a single agent work inside a real software repository with clearer inputs, stricter structure rules, reusable templates, and an explicit acceptance workflow.

It is not an agent runtime or orchestration platform. It is a practical operating guide you can drop into a repo to make agent-driven delivery more consistent, auditable, and easier to review.

## Why This Exists

Most AI coding workflows break down in the same places:

- requirements are underspecified
- the agent writes files in inconsistent locations
- progress and decisions are not recorded
- testing evidence is incomplete
- acceptance becomes subjective

This repository gives you a small but opinionated contract for solving those problems.

## Features

- **Single-agent delivery workflow** with explicit phases: `requirement -> architecture -> build -> test -> accept -> knowledge_review -> retro`
- **Repo structure guardrails** so product code, tests, docs, and guide assets stay in predictable locations
- **Role-based guidance** for master, architecture, implementation, and testing responsibilities
- **Input and output templates** for startup, requirements, progress tracking, design, test reports, acceptance, and defect notes
- **Acceptance-first execution** where every required criterion must map to concrete verification evidence
- **Reusable knowledge notes** for capturing solutions, patterns, and hard-earned implementation lessons
- **Product registry** to define supported product types, default build roles, and default code targets

## Supported Products

Current built-in product types:

- `web`: browser-based delivery with viewport-aware acceptance guidance
- `python`: local Python runtime/script delivery

## Scope

This guide currently supports:

- `agents: 0|1`
- one registered `product`
- one chosen `code_target`
- persistent delivery outputs under `docs/` and guide-controlled files

This guide does **not** try to handle:

- multi-agent coordination
- distributed task execution
- autonomous infrastructure provisioning
- complex project management tooling

## Repository Layout

```text
agent_coding_guide/
├── agents/                 # Role definitions for each delivery stage
├── governance/             # Workflow protocol and product registry
├── knowledges/             # Reusable engineering knowledge notes
├── templates/
│   ├── inputs/             # Startup, config, README, requirements templates
│   └── outputs/            # Design, test, acceptance, diary, defect templates
├── overview.md             # Compact project overview
├── README.md
└── LICENSE
```

## Core Rules

- `requirements.md > README.md`
- product code must stay inside the chosen `code_target`
- test tooling belongs in root `tests/`
- persisted docs belong in `docs/`
- guide assets belong in `agent_coding_guide/`
- acceptance requires passing evidence for every required acceptance criterion
- unexplained root-level files or directories should be treated as a process violation

## Quick Start

### 1. Copy the guide into your repository

The minimal project bootstrap is:

```text
your-project/
├── agent_coding_guide/
├── README.md
├── requirements.md
├── project_config.yml
└── agent_startup.md
```

Copy `agent_coding_guide/` into your project root. This guide directory is the template package that provides the workflow, roles, governance, and scaffolding assets.

### 2. Scaffold the 4 required root files from templates

Use the input templates under [`templates/inputs/`](./templates/inputs):

- [`templates/inputs/readme_template.md`](./templates/inputs/readme_template.md) -> `README.md`
- [`templates/inputs/requirements_template.md`](./templates/inputs/requirements_template.md) -> `requirements.md`
- [`templates/inputs/project_config_template.yaml`](./templates/inputs/project_config_template.yaml) -> `project_config.yml`
- [`templates/inputs/agent_startup_template.md`](./templates/inputs/agent_startup_template.md) -> `agent_startup.md`

Example `project_config.yml`:

```yaml
agents: 1
product: web
code_target: src
docs:
  - design
  - test_report
  - acceptance
```

### 3. Confirm the required startup files are present

The minimal required project files are:

- `agent_coding_guide/`
- `README.md`
- `requirements.md`
- `project_config.yml`
- `agent_startup.md`

These files form the smallest valid project setup for this guide.

### 4. Start the agent with the guide

Once these 5 files are ready, you only need to ask your coding agent to start from `agent_startup.md`.

`agent_startup.md` is the single project entrypoint. The guide then defines the read order, source-of-truth priority, workflow routing, and required outputs for the rest of the delivery process.

In practice, the startup instruction can be as simple as:

```text
Start from `agent_startup.md` and follow the guide.
```

## Workflow

The guide uses a small, explicit sequence:

1. **Requirement**: normalize scope and convert acceptance criteria into planned evidence
2. **Architecture**: define boundaries, modules, constraints, and choose a single `code_target`
3. **Build**: implement only the approved scope
4. **Test**: verify behavior and record evidence, failures, and defects
5. **Accept**: accept only if all required checks have passing evidence
6. **Knowledge Review**: capture reusable lessons or explicitly record why knowledge was skipped
7. **Retro**: summarize decisions and close the loop

## Outputs

The guide standardizes these recurring outputs:

- `project_process.md`
- `agent_work_diary.md`
- `docs/design.md`
- `docs/test_report.md`
- `docs/acceptance.md`
- `docs/defects/<id>.md` when defects must be recorded
- `docs/security.md` for sensitive changes when needed
- `agent_coding_guide/knowledges/<type>/<feature>.md` for reusable knowledge

Templates for all of the above live in [`templates/outputs/`](./templates/outputs).

## Roles

The built-in roles are intentionally simple:

- [`Master`](./agents/master_agent.md): owns routing, progress tracking, and final acceptance
- [`Architecture`](./agents/architecture_agent.md): defines boundaries, constraints, and `code_target`
- [`SW Web`](./agents/sw_web_agent.md): implements browser/web products
- [`SW Python`](./agents/sw_python_agent.md): implements Python runtime products
- [`Testing`](./agents/testing_agent.md): verifies evidence and gates acceptance

## Example Use Cases

- keeping AI-generated code inside a predictable repository structure
- standardizing delivery docs for internal AI-assisted projects
- adding acceptance rigor to fast prototype work
- building a lightweight operating model for a local coding agent
- capturing reusable engineering knowledge during delivery instead of losing it in chat history

## Design Principles

- **Small over comprehensive**: the protocol is intentionally narrow
- **Evidence over optimism**: required behavior must be verified
- **Repo-first over platform-first**: the repository is the source of truth
- **Reuse over drift**: existing layout should be reused before creating new roots
- **Documentation as delivery artifact**: progress, tests, and acceptance are part of the work

## When To Use This

Use this repository if you want:

- a lightweight standard for AI-assisted delivery
- better discipline around repo layout and acceptance
- a simple way to make agent work reviewable by humans

You probably do not need it if you want:

- a general-purpose agent framework
- multi-agent task scheduling
- hosted orchestration or workflow automation

## License

Licensed under the Apache License 2.0. See [`LICENSE`](./LICENSE) for details.
