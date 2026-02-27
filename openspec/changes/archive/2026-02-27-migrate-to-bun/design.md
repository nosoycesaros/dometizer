## Context

Dometizer is a small TypeScript library with a mature build pipeline from 2020. The current setup uses:
- Mixed package managers (yarn.lock + package-lock.json)
- Jest + ts-jest for testing
- Rollup with TypeScript/Babel plugins for building
- GitHub Actions testing on Node 10.x/12.x/14.x (all EOL)

The migration to bun needs to preserve the exact same library outputs while modernizing the development experience.

## Goals / Non-Goals

**Goals:**
- Eliminate package manager conflicts and standardize on bun
- Modernize testing to bun's built-in test runner
- Update CI to current Node.js LTS versions
- Maintain identical bundle outputs (UMD, ES, CJS)
- Reduce dependency count and complexity
- Improve development speed

**Non-Goals:**
- Changing the public API or library behavior
- Modifying TypeScript configuration beyond what's necessary
- Adding new features or capabilities to the library
- Changing the bundle format or output structure

## Decisions

### 1. Build System: Keep Rollup vs Migrate to Vite

**Decision**: Keep Rollup with bun as package manager

**Rationale**: 
- Rollup configuration is simple and works well for library builds
- Vite is optimized for applications, not libraries
- Current Rollup config produces exactly the bundle formats needed
- Migration risk is lower with fewer changes

**Alternatives Considered**:
- Vite library mode: More complex for multi-format outputs, overkill for this use case
- Bun's built-in bundler: Still experimental, lacks UMD support

### 2. Test Runner: Jest → Bun Test

**Decision**: Migrate to bun test with minimal test refactoring

**Rationale**:
- Eliminates 8+ testing-related dependencies
- bun test has Jest-compatible API for basic usage
- Native TypeScript support without ts-jest
- Faster test execution

**Migration Strategy**:
- Keep existing test structure and assertions
- Update imports if needed (expect API should be compatible)
- Remove Jest configuration from package.json

### 3. CI Strategy: Gradual Node Version Update

**Decision**: Update to Node 18.x, 20.x, 22.x (current LTS versions)

**Rationale**:
- Node 10/12/14 are all EOL and security risks
- Bun requires modern Node.js versions
- Library consumers are likely using current Node versions

### 4. Package Manager Cleanup

**Decision**: Remove both yarn.lock and package-lock.json, use bun.lockb exclusively

**Rationale**:
- Eliminates version drift between different resolvers
- Bun lockfile is deterministic and fast
- CI and local development use same resolution

## Risks / Trade-offs

**[Bun ecosystem maturity]** → Mitigation: Keep fallback to npm possible, test thoroughly in CI
- Bun is newer than npm/yarn, potential edge cases
- Some tooling might not support bun.lockb yet

**[Test compatibility issues]** → Mitigation: Incremental migration, validate all tests pass
- bun test might have subtle differences from Jest
- Existing mocks or advanced Jest features might need adjustment

**[CI breaking changes for contributors]** → Mitigation: Update documentation, provide migration guide
- New contributors need bun installed
- Different commands for development workflow

**[Bundle output drift]** → Mitigation: Compare bundle outputs byte-for-byte before/after
- Build system changes could subtly alter outputs
- UMD format is critical for browser usage

**[Rollback complexity]** → Mitigation: Keep changes in separate commits, test each phase
- If bun causes issues, rolling back affects multiple systems
- Test runner and package manager are coupled in bun

## Migration Plan

**Phase 1: Package Manager**
1. Install bun locally
2. Run `bun install` to generate bun.lockb
3. Remove yarn.lock and package-lock.json
4. Update package.json scripts to use bun commands
5. Test that build/test still work locally

**Phase 2: Test Runner**
1. Remove Jest dependencies from package.json
2. Update test scripts to use `bun test`
3. Run tests and fix any compatibility issues
4. Remove Jest configuration

**Phase 3: CI Update**
1. Update GitHub Actions to install and use bun
2. Update Node.js version matrix
3. Test CI pipeline end-to-end

**Phase 4: Validation**
1. Compare bundle outputs before/after migration
2. Test on different platforms
3. Update documentation

**Rollback Strategy**:
- Each phase can be reverted independently
- Keep original lockfiles until migration is validated
- CI can be rolled back to npm with single workflow change

## Open Questions

- Should we use bun's built-in bundler eventually, or stick with Rollup long-term?
- Any specific Jest features in tests that might not work with bun test?
- Should we add bun installation instructions to README for new contributors?