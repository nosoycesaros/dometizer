## Why

Dometizer's build toolchain is 2-3 major versions behind current standards, missing significant performance improvements and modern features. Upgrading Rollup from v2 to v4 and ESLint from v8 to v9 will provide 2-3x faster builds, smaller bundle sizes, and better developer experience while maintaining full backward compatibility.

## What Changes

- **BREAKING**: Update Rollup from v2.80.0 to v4.59.0
- **BREAKING**: Update ESLint from v8.57.1 to v9.39.3  
- **BREAKING**: Migrate from rollup-plugin-terser to @rollup/plugin-terser v0.4.4
- **BREAKING**: Migrate from rollup-plugin-typescript2 to @rollup/plugin-typescript v12.3.0
- **BREAKING**: Update @typescript-eslint/* plugins from v6.21.0 to v8.56.1
- Modernize Rollup configuration to use official plugins
- Validate bundle output compatibility (UMD, ES, CJS formats)
- Ensure quality pipeline continues to work (lint, format, type-check, test)

## Capabilities

### New Capabilities
- `modern-build-system`: Fast, modern build pipeline using latest Rollup v4 with official plugins
- `modern-linting-system`: Enhanced ESLint v9 with TypeScript v8 integration for better performance

### Modified Capabilities
<!-- No existing capability requirements are changing - this is purely a toolchain upgrade -->

## Impact

- **Dependencies**: Major version updates to core build and linting tools
- **Build Performance**: Expected 2-3x faster build times and smaller bundle sizes
- **Developer Experience**: Improved linting performance and better error messages
- **Bundle Output**: Must maintain identical functionality across UMD, ES, and CJS formats
- **Quality Pipeline**: All existing npm scripts (format, lint, type-check, test, build) must continue to work
- **External API**: No changes to the published Dometizer library API or behavior