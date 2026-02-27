## 1. Configuration Updates

- [x] 1.1 Update TypeScript target from "es5" to "es2017" in tsconfig.json
- [x] 1.2 Remove Babel plugin (@rollup/plugin-babel) from rollup.config.js
- [x] 1.3 Remove Babel dependencies from package.json (@babel/core, @babel/preset-env, @babel/preset-typescript)
- [x] 1.4 Update bun.lock by running bun install to reflect dependency changes

## 2. Build System Validation

- [x] 2.1 Run build process and verify it completes successfully without Babel
- [x] 2.2 Compare bundle file sizes before and after (expect reduction)
- [x] 2.3 Verify UMD bundle structure and global variable mapping unchanged
- [x] 2.4 Verify ES module output maintains scalpel externalization
- [x] 2.5 Verify CommonJS require() compatibility with previous output
- [x] 2.6 Confirm TypeScript declaration files (.d.ts) are generated correctly

## 3. Testing and Quality Assurance

- [x] 3.1 Run full test suite to ensure all functionality preserved
- [x] 3.2 Test build process on multiple Node.js versions (18.x, 20.x, 22.x) in CI
- [x] 3.3 Verify source maps are generated and properly reference TypeScript sources
- [x] 3.4 Manual testing: import library in test projects with different bundlers
- [x] 3.5 Performance testing: measure and document build time improvements

## 4. Browser Compatibility Testing

- [x] 4.1 Test compiled output in Chrome 58+ (ES2017 baseline support)
- [x] 4.2 Test compiled output in Firefox 52+ 
- [x] 4.3 Test compiled output in Safari 11+
- [x] 4.4 Test compiled output in Edge 15+
- [x] 4.5 Verify IE11 no longer works (expected behavior)

## 5. Documentation and Communication

- [x] 5.1 Update README.md to reflect ES2017 browser requirements
- [x] 5.2 Update AGENTS.md with new build command examples without Babel
- [x] 5.3 Create comprehensive CHANGELOG.md entry documenting breaking changes
- [x] 5.4 Update package.json version to next major version for breaking change
- [x] 5.5 Add migration notes for users still requiring IE11 support

## 6. Final Validation and Cleanup

- [x] 6.1 Run complete build and test cycle one final time
- [x] 6.2 Verify no Babel-related files or configurations remain
- [x] 6.3 Check that build artifacts maintain identical API surface
- [x] 6.4 Confirm dependency count reduction (~8 fewer packages)
- [x] 6.5 Review rollup.config.js for any unused or redundant configurations