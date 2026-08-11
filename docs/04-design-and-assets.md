# Design and Assets

**Status:** Current implementation guidance.

## Source Precedence

Use each source only for what it owns:

1. Product requirements define required states, compliance behavior, and acceptance rules.
2. Figma exports define layout, information hierarchy, and interaction placement.
3. The Momcozy design-system package defines colors, typography, spacing, radii, shadows, and component states.
4. Current code defines what is implemented, not what the final product should necessarily become.

When a screenshot conflicts with a privacy or safety requirement, follow the requirement and record the discrepancy.

## Design Inputs

- `02-design/figma-exports/`: visual references for Cozie screens and states.
- `02-design/assets/`: product-specific assets such as Cozie artwork.
- `03-design-system/momcozy-design-system-kit-1.1.0/`: delivered design-system authority.
- `04-frontend/momcozy-design-system-demo/public/fonts/`: Exposure and Aeonik Soft Pro font assets.
- `04-frontend/momcozy-design-system-demo/public/figma/`: frontend-owned Figma-derived assets and reference captures.

## Implementation Rules

- Use Grays semantic tokens for default surfaces, text, and borders.
- Use Mom, Care, Parenting, and Family colors only for their defined product domains.
- Use `Fills` for button or state-container backgrounds and `Labels` for content on filled containers.
- Use Exposure for page titles and Aeonik Soft Pro for product UI and body text.
- Use existing token values and UI primitives before adding isolated visual values.
- Keep Light and Dark token pairs synchronized.
- Preserve asset provenance when copying an asset into the frontend package.

## Figma Limitation

The files in `figma-exports/` are screenshots, not inspectable Figma nodes. They do not expose Auto Layout, variables, constraints, or component bindings. Do not infer exact colors or token values from pixels; use the design-system source.

## Deep References

- [Design input guide](../02-design/README.md)
- [Design-system guide](../03-design-system/README.md)
- [Packaged design-system README](../03-design-system/momcozy-design-system-kit-1.1.0/README-ZH.md)

## Update This Document When

Update this document when design-source precedence, token rules, fonts, asset locations, theme behavior, or Figma availability changes.