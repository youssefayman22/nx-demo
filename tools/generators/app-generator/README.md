# Team Application Generator

Generate React+Vite team applications with automatic governance tags and feature-based architecture.

## Usage

```bash
# Generate a new team application
pnpm nx g generators:app checkout --team=payments

# With description
pnpm nx g generators:app dashboard --team=platform --description="Admin dashboard"

# Show help
pnpm nx g generators:app --help
```

## What It Creates

For `pnpm nx g generators:app checkout --team=payments`:

- **Project**: `apps/payments/checkout/`
- **E2E**: `apps/payments/checkout/e2e/` (nested inside project)
- **Name**: `payments-checkout`
- **Tags**: `["type:app", "team:payments", "scope:internal"]` (automatic)
- **Structure**:
  ```
  apps/payments/checkout/
  ├── e2e/              # Cypress e2e tests (nested)
  │   ├── src/
  │   └── project.json
  ├── src/
  │   ├── app/          # Root app component
  │   ├── features/     # Feature modules
  │   └── shared/       # Shared utilities
  ├── project.json      # With governance tags
  ├── vite.config.ts    # CSS Modules + @ alias
  └── package.json
  ```

## Multiple Projects Per Team

You can create multiple projects under the same team folder:

```bash
pnpm nx g generators:app checkout --team=payments
pnpm nx g generators:app billing --team=payments
pnpm nx g generators:app invoices --team=payments
```

Results in:
```
apps/payments/
├── checkout/
│   ├── e2e/
│   └── src/
├── billing/
│   ├── e2e/
│   └── src/
└── invoices/
    ├── e2e/
    └── src/
```

## Governance

The generator automatically:
- ✅ Applies required governance tags (`type:app`, `team:*`, `scope:internal`)
- ✅ Removes any per-project ESLint configs (enforces root-only linting)
- ✅ Configures Vite with CSS Modules and path aliases
- ✅ Creates feature-based folder structure

All generated apps are validated by `pnpm lint` via `@nx/enforce-module-boundaries`.

### What the Generator Creates

For `pnpm nx g generators:app checkout --team=payments`:

```
apps/payments/checkout/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── app.module.css
│   ├── features/
│   │   └── .gitkeep
│   ├── shared/
│   │   └── .gitkeep
│   ├── main.tsx
│   └── vite-env.d.ts
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── package.json
├── project.json  # With automatic governance tags
└── README.md
```

### Automatic Governance Tags

The generator automatically applies these tags to `project.json`:

```json
{
  "tags": ["type:app", "team:payments", "scope:internal"]
}
```

### Design & Architecture

The generator:
1. **Composes from @nx/react** - Leverages Nx React plugin for React+Vite scaffolding
2. **Applies Governance Tags** - Auto-configures project with required tags for multi-team enforcement
3. **Feature-Based Structure** - Creates `app`, `features`, and `shared` folders for clear separation of concerns
4. **Removes Per-Project ESLint** - Ensures all linting is done via root `eslint.config.js`
5. **Adds CSS Modules Support** - Vite configured for scoped CSS Modules

## Technical Details

### Files Generated

- **project.json**: Nx project configuration with governance tags and targets
- **vite.config.ts**: Vite bundler config with CSS Modules and @ alias
- **tsconfig.json**: TypeScript configuration extending workspace base
- **package.json**: Application dependencies (React, Vite, TypeScript, Vitest)
- **Source structure**: Feature-based organization with shared utilities

### ESLint & Governance

The generator explicitly removes any per-project ESLint configuration. All linting is centralized in:
- `/eslint.config.js` - Root flat config with @nx/enforce-module-boundaries

This ensures:
- Consistent governance rules across all teams
- No accidental per-project config escaping boundaries
- Single source of truth for dependency rules

### Dependency Matrix

Generated apps can depend on:
- ✅ Other `type:shared-lib` libraries (e.g., `libs/shared/auth`)
- ✅ The `type:design-system` library (e.g., `neo/`)
- ❌ **NOT** on other `type:app` projects (enforced by ESLint @nx/enforce-module-boundaries)

## Generator Status

The generator is now discoverable as `generators:app` in Nx.

```bash
pnpm nx g generators:app dashboard --team=platform --dry-run
pnpm nx g generators:app checkout --team=payments
```

## Requirements

- Node 20+
- pnpm 8+
- @nx/devkit for generator framework
- @nx/react for React app composition
- @nx/vite for Vite builder support
