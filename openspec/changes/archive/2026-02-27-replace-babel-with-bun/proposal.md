## Why

The current build pipeline uses Babel transpilation on top of TypeScript compilation, creating unnecessary complexity and overhead. With bun's superior performance and modern browser adoption (95%+ usage), we can eliminate Babel transpilation and leverage TypeScript's native output targeting, simplifying the toolchain while improving build performance and reducing bundle sizes.

## What Changes

- **Remove** Babel transpilation step from build pipeline (@babel/core, @babel/preset-env, @babel/preset-typescript)
- **Remove** Babel plugins and presets from rollup.config.js (@rollup/plugin-babel)
- **Update** TypeScript compilation target from ES5 to ES2017 for modern browser support
- **Simplify** build toolchain to TypeScript + Terser only
- **Drop** IE11 support (already EOL since January 2022) in favor of modern browsers
- **Reduce** bundle size by eliminating unnecessary polyfills and transpilation overhead
- **Improve** build performance by removing Babel processing step

## Capabilities

### New Capabilities
- `native-typescript-transpilation`: Direct TypeScript-to-modern-JS compilation without Babel intermediary

### Modified Capabilities
- `modern-build-pipeline`: Requirements change from ES5 compatibility to ES2017+ targeting with streamlined toolchain

## Impact

**Build System:**
- Faster build times (eliminate Babel transpilation step)
- Smaller bundle sizes (no unnecessary polyfills)
- Simplified dependency tree (~8 fewer Babel-related packages)

**Browser Support:**
- **BREAKING** Drop IE11 support (affects <1% of users)
- Maintain support for Chrome 51+, Firefox 54+, Safari 10+, Edge 15+
- Continue supporting all modern browsers (95%+ usage coverage)

**Bundle Outputs:**
- Same formats maintained (UMD, ES modules, CommonJS)
- Cleaner, more performant native JavaScript output
- Preserved external dependency handling

**Developer Experience:**
- Simpler build configuration
- Faster development builds
- Reduced toolchain complexity
- Better source maps and debugging