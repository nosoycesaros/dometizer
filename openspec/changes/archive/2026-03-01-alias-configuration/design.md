## Context

The Dometizer codebase currently uses relative imports (`../../functions/create`) throughout its TypeScript source files. As the project evolves toward a more sophisticated directory structure with separate `functions/`, `tests/`, and utility folders, these relative paths become increasingly unwieldy and fragile to refactoring.

The proposed scaffolding includes:

- `src/functions/` - Function operations (create, append, extend, batchCreate)
- `src/tests/` - Organized test suites by category

Three build tools need consistent alias resolution: TypeScript (development/compilation), Rollup (production bundling), and Bun (test execution).

## Goals / Non-Goals

**Goals:**

- Configure path aliases `@/*`, `@functions/*`, `@tests/*` across TypeScript, Rollup, and Bun
- Update existing import statements to use aliases
- Ensure consistent behavior across development, testing, and production builds
- Maintain tree-shaking and bundle optimization capabilities

**Non-Goals:**

- Restructuring the directory layout (handled separately)
- Adding new alias patterns beyond the three specified
- Converting to barrel exports or index files
- Modifying external dependency imports

## Decisions

### Alias Pattern Choice: Broad vs Granular

**Decision**: Use 3 broad aliases (`@`, `@functions`, `@tests`) instead of granular ones (`@core`, `@batch`, `@utils`)
**Rationale**: Simpler configuration maintenance, fewer alias conflicts, clear semantic grouping
**Alternative Considered**: Granular aliases would provide more specific imports but require more complex configuration

### Tool Configuration Strategy: Plugin-based vs Built-in

**Decision**: Use dedicated alias plugins/configuration for each tool rather than shared config files
**Rationale**: Each tool has different alias resolution mechanisms and config formats
**Alternative Considered**: Shared JSON config file would be cleaner but adds complexity and may not support all tool-specific features

### Import Update Scope: All-at-once vs Incremental

**Decision**: Update all imports in a single change to maintain consistency
**Rationale**: Prevents mixed import styles and ensures immediate benefit from alias configuration
**Alternative Considered**: Incremental updates would be safer but lead to inconsistent import patterns

## Risks / Trade-offs

**[Build Tool Synchronization]** → All three tools must have equivalent alias configurations or imports will fail in different environments

- **Mitigation**: Validation step to ensure configuration parity, documentation of required changes

**[IDE Support Variations]** → Different editors may have varying support for TypeScript path mapping

- **Mitigation**: Focus on TypeScript configuration as the source of truth, test in VS Code/WebStorm

**[Bundle Size Impact]** → Incorrect alias resolution could interfere with tree-shaking

- **Mitigation**: Verify production bundle sizes before/after change, test tree-shaking effectiveness

**[Migration Complexity]** → Large number of import statements to update across existing files

- **Mitigation**: Automated search-replace patterns, systematic file-by-file updates
