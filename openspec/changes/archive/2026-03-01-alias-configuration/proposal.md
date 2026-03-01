## Why

The current flat directory structure with co-located files is becoming unwieldy as the codebase grows with new batch operations, integration testing, and performance testing. Import statements are increasingly using relative paths like `../../functions/core/create`, making the code harder to maintain and refactor.

## What Changes

- Add TypeScript path mapping configuration in `tsconfig.json` for `@/*`, `@functions/*`, and `@tests/*` aliases
- Add Rollup alias plugin configuration to support aliases during bundling
- Add Bun path mapping configuration to support aliases during test execution
- Update import statements throughout the codebase to use aliases instead of relative paths
- Document alias conventions for contributors

## Capabilities

### New Capabilities

- `build-alias-support`: Configuration system for TypeScript, Rollup, and Bun to resolve path aliases consistently across development, testing, and build processes

### Modified Capabilities

<!-- No existing capabilities are being modified at the requirement level -->

## Impact

- **Configuration Files**: `tsconfig.json`, `rollup.config.js`, `bunfig.toml` will be modified
- **Import Statements**: All existing TypeScript files will need import path updates
- **Development Workflow**: Developers will use cleaner import syntax (`@functions/core/create` instead of `../../functions/core/create`)
- **Build Process**: Rollup bundling must correctly resolve aliases for production builds
- **Test Execution**: Bun test runner must resolve aliases in test files
- **Bundle Size**: No impact expected as aliases are resolved at build time
