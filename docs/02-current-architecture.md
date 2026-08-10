# Current Architecture

**Status:** Current implementation as of 2026-08-10.

## Workspace Boundaries

| Area | Responsibility |
| --- | --- |
| `01-product/` | Detailed product requirements and future frontend planning. |
| `02-design/` | Figma exports and product-specific design assets. |
| `03-design-system/` | Versioned Momcozy design-system delivery. No business code belongs here. |
| `04-frontend/` | Runnable React/Vite preview shell, static interactive demos, assets, and local integration scripts. |
| `docs/` | Compact canonical project knowledge and routing index. |

## Frontend Runtime

The current frontend is intentionally simpler than the proposed feature architecture:

- Vite serves the React preview shell and static files from `public/`.
- `src/App.tsx` renders an iframe whose source is `/demos/04-cozy-ai-assistant.html`.
- The Cozy AI interaction is currently implemented primarily in the single static HTML demo.
- Other numbered demos live in their own folders under `public/demos/`.
- Shared Momcozy tokens live in `src/styles/momcozy-theme.css`; the User Guide receives a synchronized copy through `pnpm sync:guide-theme`.

## LLM Flow

The Cozy AI static demo supports two response paths:

1. Local Mock behavior for file-based use, missing provider configuration, or provider failure.
2. An optional Python server at `scripts/cozie_llm_server.py` that serves `public/` and forwards chat requests to the OpenAI Responses API.

The browser never receives the provider API key. The Python process reads `OPENAI_API_KEY`, and the model can be overridden with `OPENAI_MODEL`.

## Key Ownership

| Concern | Current owner |
| --- | --- |
| Cozy AI interactive behavior | `public/demos/04-cozy-ai-assistant.html` |
| React preview frame | `src/App.tsx`, `src/App.css` |
| Shared frontend tokens | `src/styles/momcozy-theme.css` |
| Reusable UI primitives | `src/components/ui/` |
| Optional provider proxy | `scripts/cozie_llm_server.py` |
| Demo routes and catalog | `public/demos/README.md` |

## Planned Architecture Is Not Current Architecture

The product plan proposes React Router, TanStack Query, Zustand, React Hook Form, Zod, MSW, Vitest, Testing Library, Playwright, feature directories, and production-style API contracts. Those packages and boundaries are not currently established in `package.json` or `src/`.

Before implementing that plan, confirm the intended migration path from the static demo and add dependencies only when the implementation requires them.

## Update This Document When

Update this document when runtime entry points, directory ownership, service boundaries, iframe usage, theme synchronization, provider integration, or major dependencies change.