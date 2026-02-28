## Context

Dometizer currently uses Rollup v2.80.0 and ESLint v8.57.1, both of which are 2-3 major versions behind the latest stable releases. The current build system uses community plugins (rollup-plugin-terser, rollup-plugin-typescript2) instead of official Rollup team plugins. Build times are acceptable but could be significantly improved, and we're missing modern toolchain features that would benefit contributors.

Current toolchain stack:
- Rollup v2.80.0 with community plugins
- ESLint v8.57.1 with TypeScript ESLint v6.21.0  
- Bundle outputs: UMD, ES modules, CommonJS
- Quality pipeline: TypeScript compilation, ESLint, Prettier, Bun tests

## Goals / Non-Goals

**Goals:**
- Upgrade to Rollup v4.59.0 and ESLint v9.39.3 for performance improvements
- Migrate to official Rollup plugins (@rollup/plugin-*) for better long-term support
- Achieve 2-3x faster build times while maintaining identical bundle output
- Ensure all quality pipeline scripts continue to work without changes
- Validate zero regression in bundle functionality and API compatibility

**Non-Goals:**
- Changing Dometizer's public API or behavior
- Modifying the library's runtime dependencies (scalpel stays unchanged)
- Upgrading TypeScript beyond v5.x (avoiding bleeding edge)
- Adding new build targets or output formats

## Decisions

### All-at-once Migration Strategy
**Decision**: Update all tools simultaneously rather than incrementally  
**Rationale**: For a library of this size, debugging integration issues together is more efficient than sequential debugging. Allows validation of the entire new stack in one session.  
**Alternative considered**: Sequential updates - rejected due to potential for repeated integration debugging.

### Official Rollup Plugins  
**Decision**: Migrate to @rollup/plugin-terser and @rollup/plugin-typescript  
**Rationale**: Official plugins receive better support, performance optimization, and long-term maintenance from the Rollup team.  
**Alternative considered**: Keep community plugins - rejected due to maintenance uncertainty and missing performance improvements.

### ESLint Configuration Compatibility
**Decision**: Stay with ESLint v9 (not v10) to avoid configuration format rewrite  
**Rationale**: ESLint v9 maintains .eslintrc.js compatibility while v10 requires complete config migration to flat config format.  
**Alternative considered**: Jump to ESLint v10 - rejected to minimize migration complexity.

### Bundle Output Validation Strategy
**Decision**: Compare bundle sizes, formats, and exports before/after upgrade  
**Rationale**: Critical to ensure no breaking changes to consumers using different module formats.  
**Validation approach**: Side-by-side bundle analysis and smoke tests for UMD, ES, CJS formats.

## Risks / Trade-offs

**Build Configuration Changes** → Mitigation: Test all three output formats (UMD, ES, CJS) thoroughly and compare bundle contents  

**Plugin API Incompatibilities** → Mitigation: Official plugins have better backward compatibility; fallback plan to community plugins if needed  

**ESLint Rule Changes** → Mitigation: TypeScript ESLint v8 maintains most v6 rule compatibility; validate existing .eslintrc.js works unchanged  

**Performance Regression** → Mitigation: Benchmark build times before/after; rollback plan if performance decreases  

**Bundle Size Increase** → Mitigation: Rollup v4 typically produces smaller bundles; validate with bundlephobia and size analysis  

**Quality Pipeline Disruption** → Mitigation: All npm scripts must pass; comprehensive validation of format, lint, type-check, test, build workflow