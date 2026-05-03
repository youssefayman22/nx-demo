<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# Neo Monorepo - AI Assistant Guidelines

## Workspace Structure

This is a monorepo containing:
- **`neo/`** - Design system component library (@neo/ui) - React components with Storybook
- **`demo/demo-app/`** - Next.js demo application consuming @neo/ui

## Technology Stack

- **Package Manager**: pnpm with workspace protocol (`workspace:*`)
- **Build Tools**: Vite (neo), Next.js (demo-app)
- **UI Framework**: React 19
- **Component Development**: Storybook (port 6006)
- **Styling**: Co-located CSS files, Tailwind CSS (demo-app)
- **Type Safety**: TypeScript throughout

## Component Development Guidelines

### Creating New Components in `neo/`
1. Create component folder in `neo/src/components/{component-name}/`
2. Required files:
   - `{component-name}.tsx` - React component
   - `{component-name}.css` - Component styles
   - `{component-name}.stories.tsx` - Storybook stories
   - `index.ts` - Export file
3. Add export path in `neo/package.json` exports field
4. Export from `neo/src/index.ts`

### Import Patterns
- In demo-app: `import { Button } from '@neo/ui'` or `import { Button } from '@neo/ui/button'`
- Components support sub-exports (button, label, product)

## Build Workflow

- **Build library**: `pnpm build:neo` (Vite build)
- **Build demo**: `pnpm build:demo` (Next.js build)
- **Build all**: `pnpm build` or `pnpm build:parallel`
- **Dev mode**: `pnpm dev` (runs all dev servers in parallel)
- **Storybook**: `pnpm --filter @neo/ui storybook`

### Build Dependencies
- Demo-app depends on @neo/ui via workspace protocol
- When making library changes, rebuild neo before testing in demo-app
- Use `pnpm nx affected:build` to build only changed projects

## Development Workflow

- Develop components in Storybook first (isolated environment)
- Test components in demo-app for integration
- CSS files are sideEffects - imported for their styles

## Linting

- `pnpm lint` - Lint all projects
- `pnpm lint:neo` - Lint library only
- `pnpm lint:demo` - Lint demo app only

## Testing Nx Affected Commands

The `nx affected` command detects which projects are impacted by code changes and runs tasks only on those projects. This is essential for CI optimization.

### Affected Command Examples

```bash
# See which projects are affected by uncommitted changes
pnpm nx affected --targets build

# Visualize affected projects in dependency graph
pnpm nx affected --targets build --graph

# Run lint on affected projects only
pnpm nx affected --targets lint

# Static output (better for CI scripts)
pnpm nx affected --targets build --outputStyle=static
```

### How It Works

1. Compares current changes against `--base` branch (default: master)
2. Identifies projects with modified files
3. Includes projects that depend on modified projects
4. Runs specified target only for affected projects

### Example: Button Component Change

When `neo/src/components/button/button.tsx` changes:
- Affected: `neo` (direct change)
- Also affected: `demo-app` (depends on neo)
- Both projects will be included in `nx affected` tasks

### Prerequisite Configuration

- ✅ Git repository with commits
- ✅ `nx.json` with `defaultBase` set to base branch
- ✅ `projectRoots` properly configured
- ✅ Project targets with proper inputs/outputs for caching

### Known Limitations

- Cannot use `--dry-run` with Vite builds (not supported by Vite)
- TUI mode opens by default (use `--outputStyle=static` for CI)
- No test targets configured yet (would enable `nx affected --targets test`)
- No E2E targets configured yet

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax


<!-- nx configuration end-->