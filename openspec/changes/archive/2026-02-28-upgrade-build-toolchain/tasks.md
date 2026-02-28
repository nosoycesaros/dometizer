## 1. Pre-Upgrade Baseline Establishment

- [x] 1.1 Record current build times for all three output formats
- [x] 1.2 Document current bundle sizes (UMD, ES, CJS) for comparison
- [x] 1.3 Validate current quality pipeline runs successfully
- [x] 1.4 Create backup of current rollup.config.js and package.json

## 2. Rollup Ecosystem Upgrade

- [x] 2.1 Update rollup from v2.80.0 to v4.59.0 in package.json
- [x] 2.2 Remove rollup-plugin-terser and add @rollup/plugin-terser v0.4.4
- [x] 2.3 Remove rollup-plugin-typescript2 and add @rollup/plugin-typescript v12.3.0
- [x] 2.4 Update rollup.config.js to use new plugin import syntax
- [x] 2.5 Configure @rollup/plugin-typescript with equivalent settings
- [x] 2.6 Configure @rollup/plugin-terser with equivalent minification settings

## 3. ESLint Ecosystem Upgrade

- [x] 3.1 Update eslint from v8.57.1 to v9.39.3 in package.json
- [x] 3.2 Update @typescript-eslint/eslint-plugin from v6.21.0 to v8.56.1
- [x] 3.3 Update @typescript-eslint/parser from v6.21.0 to v8.56.1
- [x] 3.4 Verify existing .eslintrc.js configuration works with new versions
- [x] 3.5 Test npm run lint passes on existing codebase

## 4. Bundle Output Validation

- [x] 4.1 Build all three output formats with new toolchain
- [x] 4.2 Compare UMD bundle size and structure with previous version
- [x] 4.3 Compare ES module bundle size and structure with previous version
- [x] 4.4 Compare CommonJS bundle size and structure with previous version
- [x] 4.5 Verify external dependency (scalpel) is properly excluded
- [x] 4.6 Test UMD bundle loads correctly in browser environment

## 5. Quality Pipeline Integration

- [x] 5.1 Verify npm run type-check passes with new toolchain
- [x] 5.2 Verify npm run lint passes with new ESLint version
- [x] 5.3 Verify npm run format:check passes unchanged
- [x] 5.4 Verify npm run test passes with all toolchain changes
- [x] 5.5 Verify npm run quality-check passes end-to-end
- [x] 5.6 Verify npm run build succeeds with quality checks

## 6. Performance Validation

- [x] 6.1 Measure new build times for all output formats
- [x] 6.2 Compare build performance improvement (target: 50%+ faster)
- [x] 6.3 Measure linting performance improvement
- [x] 6.4 Document performance gains achieved

## 7. Final Integration Testing

- [x] 7.1 Install dependencies fresh with bun install
- [x] 7.2 Run full build pipeline from clean state
- [x] 7.3 Verify all bundle formats work in test environments
- [x] 7.4 Create commit with all toolchain modernization changes