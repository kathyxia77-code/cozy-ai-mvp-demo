# Development Runbook

**Status:** Current local workflow for `04-frontend/momcozy-design-system-demo/`.

## Prerequisites

- Node.js compatible with Vite 8.
- pnpm.
- Python 3 only when using the optional OpenAI proxy.

Run frontend commands from:

```text
04-frontend/momcozy-design-system-demo/
```

## Install and Run

```bash
pnpm install
pnpm demo
```

`pnpm demo` opens the demo catalog at `http://127.0.0.1:5177/demos`.

Useful routes:

| Experience | URL |
| --- | --- |
| React preview shell | `http://127.0.0.1:5177/` |
| User Guide | `http://127.0.0.1:5177/guide` |
| Group Pumping | `http://127.0.0.1:5177/group-pumping` |
| Voice Log | `http://127.0.0.1:5177/voice-log` |
| Cozie static demo | `http://127.0.0.1:5177/demos/04-cozy-ai-assistant.html` |

Cozie forecast demo states can be selected with `?forecast=ready`, `?forecast=empty`, or `?forecast=hidden`. With no `forecast` query, the passive new-user learning message is shown in the expanded forecast dropdown; prediction summaries and items appear only in the `ready` state.

Do not open the package's root `index.html` directly; it is a Vite entry point.

## Vercel Deployment

Deploy from the repository root when possible. The root `package.json` build script installs and builds `04-frontend/momcozy-design-system-demo/`, copies its Vite output to root `dist/`, and the root `vercel.json` publishes `dist/` while rewriting `/` to `/demos/04-cozy-ai-assistant.html` so the production site opens directly to the Cozie demo instead of returning a root-level 404.

If a Vercel project is configured with Root Directory set to `04-frontend/momcozy-design-system-demo`, Vercel ignores the repository-root config and reads the package-local `vercel.json` instead. Keep both Vercel config files in sync when changing the production entry route.

## Optional OpenAI Mode

Set the API key in the terminal environment, never in source code or documentation:

```bash
OPENAI_API_KEY="..." python3 scripts/cozie_llm_server.py
```

Then open `http://127.0.0.1:8765/demos/04-cozy-ai-assistant.html`.

- `OPENAI_MODEL` overrides the default model.
- `COZIE_PORT` overrides port `8765`.
- Without a configured or available provider, the demo uses local Mock responses.
- Quick tasks and medical-risk interception do not depend on the external model.

## Validation Commands

```bash
pnpm lint
pnpm build
```

After changing shared theme tokens, also run:

```bash
pnpm sync:guide-theme
```

For interaction or layout changes, validate the affected flow at the iPhone 16 baseline of `393 x 852` CSS pixels and at a wider desktop viewport. Check horizontal overflow, keyboard/input states, overlays, theme behavior, and reduced-motion behavior where relevant.

## Update This Document When

Update this runbook when prerequisites, package scripts, ports, routes, environment variables, provider setup, or required validation steps change.