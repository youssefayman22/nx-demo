---
name: nx-governance
description: "Enforce multi-team governance rules in this Nx monorepo. USE WHEN: creating new projects, reviewing project configurations, validating tags, checking dependency rules, or answering questions about what can depend on what. Also use when someone tries to add per-project ESLint configs or cross-app imports."
---

# Nx Governance Skill

This skill enforces the multi-team governance model for this Nx demo monorepo.

## When to Invoke

- A new Nx project (app, lib) is being created
- A `project.json` is being reviewed or modified
- Someone asks about allowed dependencies between projects
- An import violation or boundary error needs to be diagnosed
- ESLint configuration changes are proposed

## Tag Taxonomy

Every project MUST have all three tag dimensions:

| Tag | Values | Required |
|-----|--------|----------|
| `type` | `type:app`, `type:shared-lib`, `type:design-system` | Yes |
| `team` | `team:<team-name>` | Yes |
| `scope` | `scope:public`, `scope:internal` | Yes |

## Dependency Matrix

| Source Tag | Allowed Dependencies |
|------------|---------------------|
| `type:app` | `type:shared-lib`, `type:design-system` |
| `type:shared-lib` | `type:shared-lib`, `type:design-system` |
| `type:design-system` | `type:design-system` only |

### Rules

1. **Apps CANNOT depend on other apps** — this is non-negotiable
2. **Apps can use shared libs and the design system** — these are the only allowed cross-project dependencies
3. **Shared libs cannot depend on apps** — shared code flows downward only
4. **The design system is maximally isolated** — it cannot depend on anything outside itself

## ESLint Governance

- All boundary enforcement is in the **root** `eslint.config.js` ONLY
- Per-project `eslint.config.js` files are **NOT allowed**
- If a team needs style customization, it must be done through centrally owned config helpers
- Never disable or weaken `@nx/enforce-module-boundaries`

## Repository Layout

```
neo/                        → type:design-system, team:platform, scope:public
apps/de/checkout/           → type:app, team:de, scope:internal
apps/de/landing-page/       → type:app, team:de, scope:internal
apps/pt/dashboard/          → type:app, team:pt, scope:internal
apps/pt/payment/            → type:app, team:pt, scope:internal
apps/pt/payments-dashboard/ → type:app, team:pt, scope:internal
tools/generators/           → Local Nx generator project (`generators`)
```

## Current Project Inventory

- Applications: `de-checkout`, `de-landing-page`, `pt-dashboard`, `pt-payment`, `pt-payments-dashboard`
- Public design system: `neo`
- Local tools project: `generators`

Team applications currently resolve to standard Nx/Vite targets:
- `lint`, `build`, `serve`, `preview`, `test`, `serve-static`, `e2e`

The design system resolves to script-based targets:
- `build`, `storybook`, `build-storybook`, `lint`

## Custom App Generator

When creating a new team application, use:

```bash
pnpm nx g generators:app my-app --team=pt
```

The generator automatically:
- Places the app at `apps/<team>/<name>/`
- Sets `tags: ["type:app", "team:<team>", "scope:internal"]`
- Creates feature-based structure: `src/app/`, `src/features/`, `src/shared/`
- Configures CSS Modules and `@/` path alias
- Does NOT create per-project ESLint config

Use the current app folders as naming and structure references before generating a new project.

## Validation Checklist

When reviewing or creating projects, verify:

1. ✅ `project.json` has all three tag dimensions
2. ✅ No per-project `eslint.config.js` exists
3. ✅ No imports from other `type:app` projects
4. ✅ Only uses `type:shared-lib` or `type:design-system` as dependencies
5. ✅ Team tag matches the directory location

## Common Violations to Catch

- Missing tags on a new project
- An app importing from another app
- A per-project ESLint config that overrides root rules
- A shared lib depending on an app
- An untagged project bypassing boundary enforcement

## What NOT to Do

- Do not create `eslint.config.js` inside generated apps
- Do not add `type:app` projects as dependencies of other apps
- Do not use folder structure as a substitute for project-level enforcement
- Do not weaken depConstraints to fix import errors (fix the architecture instead)
