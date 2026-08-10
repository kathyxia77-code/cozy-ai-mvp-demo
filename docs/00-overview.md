# Project Knowledge Index

This file is the starting point for project knowledge. It is a routing index, not a request to load every document.

## How to Use This Index

1. Identify the current task.
2. Open only the matching canonical document from the table below.
3. Follow a supporting reference only when the canonical document lacks the required detail.
4. For code-local work, start in the relevant code and use this index only for missing project context.

## Canonical Documents

Every Markdown file in `docs/` must appear in this table.

| Document | Contains | Read when |
| --- | --- | --- |
| [00-overview.md](00-overview.md) | Documentation directory, source precedence, and context-loading rules. | Starting project research or locating the authoritative document. |
| [01-product-scope.md](01-product-scope.md) | Product goal, MVP capabilities, user-facing constraints, and detailed requirement links. | Changing feature behavior, copy, flows, acceptance criteria, or safety behavior. |
| [02-current-architecture.md](02-current-architecture.md) | Current workspace boundaries, frontend runtime, LLM proxy flow, and planned-versus-current distinction. | Changing structure, runtime flow, service integration, or file ownership. |
| [03-development-runbook.md](03-development-runbook.md) | Setup, local URLs, commands, optional LLM mode, and validation workflow. | Running, testing, building, debugging, or onboarding to the frontend. |
| [04-design-and-assets.md](04-design-and-assets.md) | Design source precedence, token rules, Figma limitations, fonts, and asset handling. | Implementing or reviewing UI, styling, components, responsive behavior, or assets. |
| [05-feature-status.md](05-feature-status.md) | Current demo coverage, planned production capabilities, ownership map, and open gaps. | Estimating work, deciding whether a capability exists, or updating feature status. |

## Supporting References

These documents remain close to the subsystem or delivered package they describe. Open them only for the listed need.

| Reference | Contains | Read when |
| --- | --- | --- |
| [Full MVP requirements](../01-product/requirements/MVP%20DEMO.txt) | Detailed Chinese PRD, interaction rules, and page state matrices. | Exact product states, edge cases, copy, or acceptance details are required. |
| [Frontend development plan](../01-product/planning/frontend-development-plan.md) | Proposed React feature architecture, state machines, API contracts, mocks, and delivery phases. | Planning future React implementation; do not treat it as current architecture. |
| [Design input guide](../02-design/README.md) | Figma export and product asset usage rules. | Working directly with design exports or source assets. |
| [Design-system guide](../03-design-system/README.md) | Delivered Momcozy kit authority and required internal references. | Working with tokens, typography, primitives, or design-system package contents. |
| [Frontend README](../04-frontend/momcozy-design-system-demo/README.md) | Frontend-local setup, routes, structure, and LLM proxy operation. | Working inside the frontend package. |
| [Demo catalog](../04-frontend/momcozy-design-system-demo/public/demos/README.md) | Static demo numbering, routes, responsibilities, and shared theme behavior. | Changing or adding a static demo. |
| [Packaged kit README](../03-design-system/momcozy-design-system-kit-1.1.0/README-ZH.md) | Versioned design-system delivery instructions. | Inspecting or updating the delivered kit itself. |

## Source Precedence

Use the source that owns the question:

1. Product intent, safety, and acceptance states: product requirements.
2. Current behavior and implementation status: current code plus `02-current-architecture.md` and `05-feature-status.md`.
3. Layout and interaction reference: `02-design/figma-exports/`.
4. Colors, typography, spacing, radii, shadows, and component states: `03-design-system/`.
5. Build and run behavior: frontend `package.json` and `03-development-runbook.md`.

When sources conflict, do not silently choose one. Record the discrepancy in the relevant canonical document and clarify whether the result is current behavior or a planned target.

## Maintenance Rule

Update this index whenever a canonical document is added, renamed, removed, or changes purpose. Update the relevant canonical document whenever a feature, workflow, architecture boundary, command, contract, design rule, or durable limitation changes.