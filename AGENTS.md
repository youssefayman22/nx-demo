<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools
- The local team-app generator is discoverable as `generators:app` and lives under `tools/generators`
- Prefer `pnpm nx g generators:app ...` for new team apps so generated projects stay aligned with the repo tags and folder conventions

## Workspace Snapshot

- Package manager: `pnpm`
- Workspace-level config lives in `nx.json`, `package.json`, `tsconfig.base.json`, `eslint.config.js`, and `pnpm-workspace.yaml`
- `nx.json` currently sets `projectRoots` to `neo`, `apps/**`, and `tools/**`
- Root scripts favor Nx orchestration: `pnpm nx run-many --target=build|lint|test`, `pnpm nx graph`, and `pnpm nx run-many --target=dev --parallel`
- Treat `neo/` as the design-system library project, not as the workspace root name

## Current Nx Projects

- Applications: `de-checkout`, `de-landing-page`, `pt-dashboard`, `pt-payment`, `pt-payments-dashboard`
- Design system library: `neo`
- Local generator project: `generators`
- App roots: `apps/de/checkout`, `apps/de/landing-page`, `apps/pt/dashboard`, `apps/pt/payment`, `apps/pt/payments-dashboard`
- Design system root: `neo`
- Generator root: `tools/generators`

## Project Configuration Patterns

- Team apps are Nx React + Vite applications with targets `lint`, `build`, `serve`, `preview`, `test`, `serve-static`, and `e2e`
- Team app tags resolve to `type:app`, `team:<team>`, and `scope:internal` with `npm:private`
- Current team folders are `de` and `pt`
- The `neo` project is a public design-system library tagged `type:design-system`, `team:platform`, and `scope:public`
- The `generators` project lives in `tools/generators` and provides the local app generator used for new team apps

## Generator Details

- Local generator id: `generators:app`
- Entry points: `tools/generators/generators.json` and `tools/generators/app-generator/`
- Required generator options: `name` and `team`; optional: `description`
- Generated apps follow `apps/<team>/<name>/` and should match the existing app patterns in `apps/de/*` and `apps/pt/*`
- Generated apps should preserve the feature-oriented layout under `src/app`, `src/features`, and `src/shared`

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax


<!-- nx configuration end-->