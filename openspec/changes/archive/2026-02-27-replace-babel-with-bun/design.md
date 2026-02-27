## Context

**Current State:**
The Dometizer build pipeline uses a dual-transpilation approach: TypeScript (target: ES5) → Babel (preset-env) → Terser. This creates an inefficient workflow where TypeScript outputs ES5, then Babel applies minimal transformations before minification. The library source already uses modern JavaScript features (const, destructuring, spread operator) that get unnecessarily downgraded.

**Background:**
- Build targets 3 formats: UMD (browser globals), ES modules, CommonJS
- Current TypeScript config targets ES5 for IE11 compatibility
- Babel adds @babel/core, @babel/preset-env, @babel/preset-typescript + dependencies (~8 packages)
- CI already modernized to Node.js 18.x, 20.x, 22.x and bun package manager
- IE11 ended support January 2022, affects <1% of users according to usage analytics

**Constraints:**
- Must maintain identical API surface and bundle format compatibility
- External dependency handling (scalpel externalization) must be preserved
- All existing tests must continue passing without modification
- Build output filenames and structure must remain consistent

## Goals / Non-Goals

**Goals:**
- Eliminate Babel transpilation step from build pipeline entirely
- Update TypeScript target from ES5 to ES2017 for modern browser support
- Reduce build time and bundle size through simplified toolchain
- Remove ~8 Babel-related dependencies from package.json
- Maintain same bundle formats (UMD, ES modules, CommonJS) with identical API compatibility

**Non-Goals:**
- Changing the core library API or functionality
- Modifying test suite or testing approach
- Adding new build formats or targets
- Updating other aspects of the development workflow beyond build toolchain
- Supporting Node.js versions below those already specified in CI

## Decisions

**Decision 1: TypeScript ES2017 Target**
- **Choice:** Update TypeScript target from ES5 to ES2017
- **Rationale:** ES2017 provides modern features (async/await, object spread) while maintaining 95%+ browser support (Chrome 58+, Firefox 52+, Safari 11+, Edge 15+)
- **Alternatives Considered:**
  - ES2018: Better features but slightly lower compatibility
  - ES2015: More conservative but missing useful features like async/await
  - ES2020+: Too modern, would exclude more browsers

**Decision 2: Complete Babel Removal**
- **Choice:** Remove all Babel dependencies and processing
- **Rationale:** TypeScript can directly output ES2017, eliminating the need for additional transpilation
- **Alternatives Considered:**
  - Keep Babel for polyfills only: Adds complexity without significant benefit for this library
  - Migrate to SWC: Another transpiler doesn't solve the fundamental redundancy issue

**Decision 3: Preserve Rollup + Terser**
- **Choice:** Keep Rollup as bundler and Terser for minification
- **Rationale:** These tools work well with TypeScript output and provide the multi-format bundling needed
- **Alternatives Considered:**
  - Switch to esbuild: Would require more extensive changes and may not support all output formats needed

**Decision 4: Drop IE11 Support**
- **Choice:** Explicitly drop IE11 compatibility
- **Rationale:** IE11 EOL'd January 2022, affects <1% of users, constrains modern development
- **Alternatives Considered:**
  - Maintain IE11 with polyfills: Adds bundle size and complexity for minimal user benefit
  - Conditional builds: Increases maintenance burden significantly

## Risks / Trade-offs

**[Breaking Change] IE11 Compatibility Lost**
→ Mitigation: Document in README and changelog, provide migration path for affected users

**[Risk] Build Output Changes**  
→ Mitigation: Comprehensive testing with before/after bundle comparisons, maintain semantic versioning

**[Risk] Third-party Tool Compatibility**
→ Mitigation: Test with common bundlers (webpack, Parcel, Vite) that consume the library

**[Trade-off] Less Granular Browser Targeting**
→ Mitigation: ES2017 provides excellent compatibility (95%+ browsers) without over-transpilation

**[Risk] TypeScript Output Assumptions**
→ Mitigation: Validate TypeScript generates expected modern JavaScript constructs for all source patterns

## Migration Plan

**Phase 1: Configuration Updates**
1. Update `tsconfig.json` target from "es5" to "es2017"
2. Remove Babel plugins from `rollup.config.js`
3. Remove Babel dependencies from `package.json`

**Phase 2: Validation**
1. Run full test suite to ensure functionality preserved
2. Compare bundle outputs (before/after) to verify format consistency
3. Test integration with major bundlers (webpack, Rollup, Parcel)

**Phase 3: Deployment**
1. Update documentation to reflect ES2017 browser requirements
2. Create comprehensive changelog entry documenting breaking changes
3. Publish as major version bump (semantic versioning)

**Rollback Strategy:**
- Revert commits and restore previous `package.json` dependencies
- Previous Babel configuration preserved in git history
- Automated CI ensures rollback doesn't break tests

**Validation Commands:**
```bash
# Verify builds succeed
bun run build

# Compare bundle sizes
ls -la dist/

# Run full test suite  
bun test

# Manual integration testing
npm pack && cd test-project && npm install ../dometizer-*.tgz
```

## Open Questions

**Q: Should we provide a compatibility shim for IE11 users?**
- Decision needed on whether to offer optional polyfill instructions or legacy build

**Q: What's the communication plan for this breaking change?**
- Need to determine blog post, social media, and documentation update strategy

**Q: Should we update any browser support documentation immediately?**  
- Confirm which files need browser compatibility updates beyond README