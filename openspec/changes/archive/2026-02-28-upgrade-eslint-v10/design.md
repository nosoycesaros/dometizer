## Context

Dometizer currently uses ESLint v9.39.3 with modern flat config, recently migrated from v8. The project is preparing for v2 release with expected contributor growth, requiring strategic maintenance of latest stable versions. ESLint v10.0.0 is now stable with breaking changes primarily affecting configuration validation and rule behavior rather than core API changes.

Current state:
- ESLint v9.39.3 with flat config (eslint.config.js)
- @typescript-eslint/eslint-plugin v8.56.1 and parser v8.56.1
- Modern build pipeline with Rollup v4 and quality checks
- No usage of deprecated APIs or legacy config format

## Goals / Non-Goals

**Goals:**
- Upgrade to ESLint v10.x latest stable for strategic maintenance
- Maintain all existing linting functionality and performance
- Enable new recommended rules for improved code quality
- Ensure compatibility with existing build and CI processes
- Validate @typescript-eslint plugin ecosystem compatibility
- Establish foundation for v2 development with expanded contributor base

**Non-Goals:**
- Major configuration rewrites (flat config already in place)
- Adding complex new linting rules beyond recommended set
- Performance optimization beyond maintaining current benchmarks
- Changing existing code style or formatting standards

## Decisions

### All-at-once Upgrade Strategy
**Decision**: Update ESLint and TypeScript ESLint plugins simultaneously  
**Rationale**: ESLint v10 breaking changes are minimal since we already use flat config. Coordinated update reduces integration complexity and testing overhead.  
**Alternative considered**: Incremental updates - rejected due to potential for repeated compatibility validation cycles.

### New Recommended Rules Adoption
**Decision**: Enable all new v10 recommended rules (`no-unassigned-vars`, `no-useless-assignment`, `preserve-caught-error`)  
**Rationale**: These rules improve code quality without stylistic interference, aligning with project's focus on bug prevention over style enforcement.  
**Alternative considered**: Selective adoption - rejected to maintain consistency with ESLint team's recommendations.

### TypeScript ESLint Compatibility
**Decision**: Update to latest @typescript-eslint versions compatible with ESLint v10  
**Rationale**: TypeScript ESLint v8 should maintain compatibility; if not, fallback plan includes compatibility utilities or temporary rule adjustments.  
**Alternative considered**: Maintaining current versions - rejected due to potential incompatibility warnings and missing v10 features.

## Risks / Trade-offs

**New Rules Create Lint Errors** → Mitigation: Address each error systematically or disable specific instances with justification  

**TypeScript ESLint Plugin Incompatibility** → Mitigation: Use @eslint/compat utilities if needed; validate in isolated environment first  

**Build Performance Regression** → Mitigation: Benchmark before/after; ESLint v10 should maintain or improve performance over v9  

**CI Pipeline Disruption** → Mitigation: Test in branch first; ensure all npm scripts (lint, build, quality-check) pass before merging  

**Contributor Onboarding Friction** → Mitigation: Update documentation; ESLint v10 should improve developer experience with better error messages