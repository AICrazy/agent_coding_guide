# Agent Coding Guide

English | [简体中文](./README.zh-CN.md)

> A practical, requirements-first V-model guide for building real software with a coding agent.

If you like the speed of agent-assisted coding but dislike the usual aftermath, this repo is for you. `Agent Coding Guide` is a small set of conventions, templates, and runtime rules built around a compact V-model: define requirements and design first, implement against that baseline, then prove the result through layered verification and final acceptance.

It is not a framework or a code generator. Think of it as a disciplined delivery playbook you can place next to a real project.

![Guide V-model execution overview](./assets/v-model-execution-diagram.svg)

Below is a screenshot of a Snake game built entirely by an agent following this guide — from requirements to acceptance — as a demonstration of the full delivery workflow.

![Snake game demo preview](./assets/demo-screenshot.png)

## Why Developers Use This

Most agent workflows get to code quickly. Fewer of them leave behind a project that is still understandable a week later.

This guide exists for developers who want:

- requirements to stay ahead of implementation
- design and testing artifacts that are traceable instead of decorative
- one clear `code_target`
- explicit verification evidence before calling work "done"
- a lightweight process that still feels usable in a normal repo

## The Core Idea

Before the agent starts, a human prepares:

- `project_config.yml`
- `docs/requirements/product_requirements.md`

That product requirements document is the real starting point. It is not optional background reading, and it should outrank `README.md` whenever the two disagree.

From there, the guide expects the rest of the delivery pack to be derived from that baseline: requirements reviews, design docs, test planning, verification evidence, validation evidence, and release close-out notes.

## Workspace Layout

The guide and the project should be sibling directories in the same workspace:

```text
workspace/
├── agent_coding_guide/
└── my-project/
    ├── agent_startup.md
    ├── project_config.yml
    ├── src/
    ├── docs/
    └── tests/
```

Typical guide references inside the project:

- `../agent_coding_guide/governance/workflow_protocol.md`
- `../agent_coding_guide/governance/product_registry.yaml`

## What The Guide Gives You

- startup templates that tell the agent what to read, in what order
- output templates for requirements, design, verification, validation, and quality
- gate-based delivery flow from baseline to acceptance
- repository structure rules that keep code, docs, and tests predictable

Default flow:

`product_requirements -> system_requirements -> software_requirements -> system_design -> detailed_design -> implementation -> unit_test -> integration_test -> system_test -> acceptance_validation -> release_retro`

Mandatory gates:

- `G1 Requirements Baseline`
- `G2 Design Baseline`
- `G3 Test Readiness`
- `G4 Verification Complete`
- `G5 Acceptance Complete`

## Quick Start

1. Put `agent_coding_guide/` next to your project.
2. Create `project_config.yml` from [templates/inputs/project_config_template.yaml](./templates/inputs/project_config_template.yaml).
3. Create `docs/requirements/product_requirements.md` from [templates/inputs/product_requirements_template.md](./templates/inputs/product_requirements_template.md).
4. Create `agent_startup.md` from [templates/inputs/agent_startup_template.md](./templates/inputs/agent_startup_template.md).
5. Start the agent from `agent_startup.md`.

Once the agent starts, it should read the prepared requirements first and derive downstream artifacts from that baseline rather than improvising from the README.

## Read Next

- Runtime rules: [workflow_protocol.md](./governance/workflow_protocol.md)
- Product routing: [product_registry.yaml](./governance/product_registry.yaml)
- Guide overview: [overview.md](./overview.md)

## License
Apache 2.0. See [LICENSE](./LICENSE).
