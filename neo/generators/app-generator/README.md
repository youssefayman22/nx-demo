# Team Application Generator

Generate React+Vite team applications with automatic governance tags and feature-based architecture.

## Usage

```bash
# Generate a new team application
pnpm nx g @neo/generators:app checkout --team=payments

# With description
pnpm nx g @neo/generators:app dashboard --team=platform --description="Admin dashboard"

# Show help
pnpm nx g @neo/generators:app --help
```

## What It Creates

For `pnpm nx g @neo/generators:app checkout --team=payments`:

- **Project**: `apps/payments/checkout/`
- **Name**: `payments-checkout`
- **Tags**: `["type:app", "team:payments", "scope:internal"]` (automatic)
- **Structure**:
  ```
  apps/payments/checkout/
  ├── src/
  │   ├── app/          # Root app component
  │   ├── features/     # Feature modules
  │   └── shared/       # Shared utilities
  ├── project.json      # With governance tags
  ├── vite.config.ts    # CSS Modules + @ alias
  └── package.json
  ```

## Governance

The generator automatically:
- ✅ Applies required governance tags (`type:app`, `team:*`, `scope:internal`)
- ✅ Removes any per-project ESLint configs (enforces root-only linting)
- ✅ Configures Vite with CSS Modules and path aliases
- ✅ Creates feature-based folder structure

All generated apps are validated by `pnpm lint` via `@nx/enforce-module-boundaries`.

### What the Generator Creates

For `pnpm generate:app --name=checkout --team=payments`:

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

## Wiring the Generator into Nx (TODO)

To make the generator discoverable via `nx g @neo/app-generator`:

1. Create a workspace plugin that exports the generator
2. Register in nx.json plugins
3. Or: Build TypeScript to JavaScript and register via generators.json

Current status: Generator code ready, just needs Nx integration layer.

## Alternative Usage

Until Nx discovery is complete, you can:

```bash
# Option 1: Use a custom npm script (planned)
pnpm generate:app --name=myapp --team=myteam

# Option 2: Run the generator code directly via Node
node -r ts-node/register tools/generators/app-generator/index.ts

# Option 3: Build first, then invoke
pnpm build
# Then use generated JavaScript
```

## Testing the Generator

After wiring is complete:

```bash
# Dry run to preview changes
pnpm nx g @neo/app-generator --name=test --team=platform --dry-run

# Create actual app
pnpm nx g @neo/app-generator --name=checkout --team=payments

# Verify governance tags
cat apps/payments/checkout/project.json | jq .tags
# Output: ["type:app", "team:payments", "scope:internal"]

# Run lint to ensure no boundary violations
pnpm lint
```

## Requirements

- Node 20+
- pnpm 8+
- @nx/devkit for generator framework
- @nx/react for React app composition
- @nx/vite for Vite builder support
