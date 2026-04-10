# PHASE_GATE_POLICY

Active runtime gate rules live in `governance/workflow_protocol.md`.

Gate summary:
- `G1`: requirement baseline
- `G2`: design baseline
- `G3`: test readiness
- `G4`: verification complete
- `G5`: acceptance complete

Review records must capture author, reviewer, approver, decision, evidence refs, comments, and actions.
Failed required tests must route to rework and retest before a verification or acceptance gate can pass, unless the release is explicitly rejected.
