## 1. Preparation and Analysis

- [x] 1.1 Install bun locally for development environment
- [x] 1.2 Create baseline bundle outputs for comparison (build current version and save outputs)
- [x] 1.3 Document current test execution time for performance comparison
- [x] 1.4 Backup existing lockfiles (yarn.lock and package-lock.json) temporarily

## 2. Package Manager Migration

- [x] 2.1 Run `bun install` to generate initial bun.lockb
- [x] 2.2 Remove yarn.lock and package-lock.json files
- [x] 2.3 Update package.json scripts to use bun commands instead of npm
- [x] 2.4 Test that `bun run build` produces identical outputs to baseline
- [x] 2.5 Verify all dependencies are correctly resolved with bun

## 3. Test Runner Migration

- [ ] 3.1 Remove Jest-related dependencies from package.json (jest, ts-jest, @types/jest, babel-jest)
- [ ] 3.2 Remove Jest configuration section from package.json
- [ ] 3.3 Update test script to use `bun test` instead of jest
- [ ] 3.4 Run existing tests with bun test and verify all pass without modification
- [ ] 3.5 Test JSDOM functionality works correctly with bun test
- [ ] 3.6 Verify test coverage reporting works with bun test
- [ ] 3.7 Measure and document improved test execution time

## 4. Build System Validation

- [x] 4.1 Verify Rollup still produces UMD bundle with correct global variable mapping
- [x] 4.2 Verify ES module build properly externalizes scalpel dependency
- [x] 4.3 Verify CommonJS build maintains require() compatibility
- [x] 4.4 Compare new bundle outputs byte-for-byte with baseline outputs
- [x] 4.5 Test TypeScript declaration files are generated correctly
- [x] 4.6 Verify build performance is maintained or improved

## 5. CI/CD Updates

- [x] 5.1 Update GitHub Actions workflow to install bun instead of using npm ci
- [x] 5.2 Update Node.js version matrix from [10.x, 12.x, 14.x] to [18.x, 20.x, 22.x]
- [x] 5.3 Update CI scripts to use `bun install`, `bun test`, and `bun run build`
- [ ] 5.4 Test complete CI pipeline end-to-end on all Node.js versions
- [ ] 5.5 Verify CI performance improvement with bun

## 6. Documentation and Cleanup

- [x] 6.1 Update README.md with bun installation instructions for contributors
- [x] 6.2 Add bun commands to development workflow documentation
- [x] 6.3 Remove references to npm/yarn in any documentation
- [x] 6.4 Update contributing guidelines with new development setup
- [ ] 6.5 Remove backup lockfiles once migration is validated

## 7. Final Validation

- [ ] 7.1 Test fresh clone and setup with `bun install` on different platforms
- [x] 7.2 Verify library functionality with a simple integration test
- [ ] 7.3 Confirm no breaking changes for library consumers
- [ ] 7.4 Run full test suite multiple times to ensure stability
- [ ] 7.5 Document any discovered limitations or differences from Jest setup