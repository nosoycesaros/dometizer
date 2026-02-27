## Why

The project currently uses a mixed and outdated package management setup (yarn.lock + package-lock.json from 2020-era tooling) creating inconsistencies between CI and local development. Standardizing on Bun will modernize the toolchain, eliminate package manager conflicts, and provide faster development workflows with a single unified tool.

## What Changes

- **Remove** yarn.lock and package-lock.json files
- **Replace** npm/yarn commands with bun equivalents in package.json scripts
- **Update** GitHub Actions CI to use bun instead of npm
- **Replace** Jest test runner with bun's built-in test runner
- **Remove** Jest, ts-jest, and related testing dependencies
- **Evaluate** keeping Rollup vs migrating to Vite for build system
- **Maintain** exact same bundle outputs (UMD, ES modules, CommonJS)
- **Update** Node version targets in CI (drop EOL versions 10.x, 12.x, 14.x)

## Capabilities

### New Capabilities
- `bun-package-management`: Package installation, lockfile management, and dependency resolution using bun
- `bun-test-runner`: Test execution using bun's built-in test runner with TypeScript support
- `modern-build-pipeline`: Updated build system optimized for current JavaScript ecosystem

### Modified Capabilities
<!-- No existing capabilities are being modified - this is a tooling migration -->

## Impact

**Affected Systems:**
- Package management (lockfiles, installation)
- Test runner and configuration
- Build pipeline and scripts
- CI/CD workflows
- Developer onboarding and documentation

**Dependencies:**
- Remove ~10 dev dependencies (Jest, Babel, testing utilities)
- Keep production dependency: scalpel
- Keep TypeScript configuration (minimal changes needed)

**Bundle Outputs:**
- Must maintain identical UMD, ES module, and CommonJS builds
- Preserve external dependency handling for scalpel
- Keep same entry points and file structure

**Breaking Changes:**
- None for library consumers (same API and outputs)
- **BREAKING** for contributors: different local development setup