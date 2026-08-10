# Copilot Instructions

## Context Management

1. Start project-level research with `docs/00-overview.md`.
2. Treat the overview as a routing index. Do not open every linked document.
3. Read only the document whose "Read when" description matches the current task, then read only the relevant section where practical.
4. For a localized code change, begin with the named file, symbol, error, or test. Consult project docs only when product, architecture, design, or workflow context is needed.
5. Do not recursively load linked references. Follow a deeper link only when the current document does not answer the task.
6. Distinguish current implementation from planned behavior. `docs/02-current-architecture.md` and `docs/05-feature-status.md` describe what exists; product and planning documents can describe targets that are not implemented.

## Documentation Maintenance

Update documentation in the same change when any of these change:

- user-visible behavior or feature scope;
- architecture, data flow, service boundaries, or important file ownership;
- setup, build, validation, deployment, or troubleshooting commands;
- public interfaces, data contracts, environment variables, or external dependencies;
- design-system rules, asset sources, safety constraints, or significant product decisions;
- implementation status, known limitations, or agent-relevant lessons that are not obvious from the code.

Do not document trivial refactors or facts that are clear and stable in the code.

When documentation changes:

1. Update the existing canonical document instead of creating duplicate guidance.
2. Keep documents concise, task-oriented, and explicit about `Current`, `Planned`, or `Reference` status.
3. Add, rename, or remove the matching entry in `docs/00-overview.md` whenever a document is added, renamed, removed, or changes purpose.
4. Keep `docs/00-overview.md` as a directory and source-of-truth map, not a copy of document details.
5. Name new canonical documents `NN-topic-name.md` and include a clear purpose and update trigger.
6. Preserve package-local or subsystem-local READMEs when their guidance belongs beside the files they describe; link to them from the overview instead of copying them.
7. Never place secrets, API keys, personal data, or temporary machine-specific values in documentation.

## Project Boundaries

- Product intent comes from the product requirements; check feature status before assuming it is implemented.
- Layout and interaction references come from `02-design/`, while visual tokens and component rules come from `03-design-system/`.
- Business implementation belongs in `04-frontend/`, not in the versioned design-system package.
- Prefer existing Momcozy semantic tokens and components over isolated visual values.
- Keep Mock and real service integrations behind the same UI-facing contract.