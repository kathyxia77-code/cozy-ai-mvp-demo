# Cozy AI MVP Demo

This workspace contains the product requirements, design inputs, Momcozy design-system delivery, and runnable frontend demos for Cozy AI.

## Start Here

- [Project knowledge index](docs/00-overview.md): documentation directory and source-of-truth map.
- [Frontend README](04-frontend/momcozy-design-system-demo/README.md): local setup, routes, commands, and package structure.
- [.github/copilot-instructions.md](.github/copilot-instructions.md): context-loading and documentation-maintenance rules for GitHub Copilot.

Agents should read `docs/00-overview.md` first and open only the document relevant to the current task.

## Workspace

```text
01-product/        Detailed requirements and future planning
02-design/         Figma exports and product assets
03-design-system/  Versioned Momcozy design-system package
04-frontend/       React/Vite preview shell and interactive demos
docs/              Compact canonical project knowledge
```

## Quick Start

```bash
cd 04-frontend/momcozy-design-system-demo
pnpm install
pnpm demo
```

Open `http://127.0.0.1:5177/demos` or go directly to the Cozy AI demo at `http://127.0.0.1:5177/demos/04-cozy-ai-assistant.html`.
