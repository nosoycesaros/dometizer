## ADDED Requirements

### Requirement: Build system must maintain exact output compatibility
The build system SHALL produce identical bundle outputs in UMD, ES module, and CommonJS formats while using native TypeScript compilation instead of Babel transpilation.

#### Scenario: UMD bundle compatibility
- **WHEN** building with the updated pipeline using TypeScript ES2017 target
- **THEN** the UMD bundle has identical API surface and global variable structure

#### Scenario: ES module bundle compatibility
- **WHEN** building ES modules with native TypeScript compilation
- **THEN** the output maintains proper external dependency handling for scalpel

#### Scenario: CommonJS compatibility
- **WHEN** building CommonJS output with TypeScript ES2017 target
- **THEN** require() imports work identically to the previous build

### Requirement: CI must support modern Node.js versions
The build pipeline SHALL be tested on current Node.js LTS versions (18.x, 20.x, 22.x).

#### Scenario: Multi-version compatibility
- **WHEN** CI runs on different Node.js versions
- **THEN** builds succeed consistently across all supported versions

#### Scenario: Deprecate EOL Node versions
- **WHEN** checking CI configuration
- **THEN** Node.js 10.x, 12.x, and 14.x are no longer tested

### Requirement: Build performance must be maintained or improved  
Build execution time SHALL be faster than the current TypeScript + Babel + Terser setup due to elimination of Babel transpilation step.

#### Scenario: Build speed improvement
- **WHEN** running the build process with native TypeScript compilation
- **THEN** build time is faster than the previous TypeScript + Babel setup

#### Scenario: Reduced toolchain overhead
- **WHEN** executing the build pipeline
- **THEN** fewer transformation steps result in measurably improved performance

### Requirement: TypeScript declarations must be preserved
The build system SHALL continue to generate accurate TypeScript declaration files.

#### Scenario: Declaration file generation
- **WHEN** building the project
- **THEN** .d.ts files are generated with complete type information

#### Scenario: Type compatibility
- **WHEN** consumers import the library in TypeScript
- **THEN** IntelliSense and type checking work identically to before

### Requirement: Dependency externalization must be preserved
The build system SHALL continue to externalize the scalpel dependency in appropriate bundle formats.

#### Scenario: ES module externalization
- **WHEN** building ES modules
- **THEN** scalpel is listed as an external dependency and not bundled

#### Scenario: UMD global mapping
- **WHEN** building UMD format
- **THEN** scalpel is mapped to the global scalpel variable

### Requirement: Build system must support ES2017 target browsers
The build output SHALL target ES2017-compatible browsers, explicitly dropping IE11 support.

#### Scenario: ES2017 feature utilization
- **WHEN** the build targets ES2017
- **THEN** modern JavaScript features (async/await, object spread) are preserved in output

#### Scenario: IE11 compatibility dropped
- **WHEN** checking browser compatibility
- **THEN** IE11 is explicitly not supported and this is documented

#### Scenario: Modern browser coverage maintained
- **WHEN** evaluating browser support
- **THEN** Chrome 58+, Firefox 52+, Safari 11+, Edge 15+ are fully supported (95%+ user coverage)

### Requirement: Babel dependencies must be completely removed
The build system SHALL eliminate all Babel-related dependencies and configuration.

#### Scenario: Package.json cleanup
- **WHEN** examining project dependencies
- **THEN** @babel/core, @babel/preset-env, @babel/preset-typescript, and @rollup/plugin-babel are not present

#### Scenario: Configuration simplification
- **WHEN** reviewing build configuration files
- **THEN** no Babel presets, plugins, or configuration remain

#### Scenario: Dependency count reduction
- **WHEN** counting total dependencies
- **THEN** approximately 8 fewer packages are installed compared to the Babel-based setup

### Requirement: Test runner must be integrated into modern toolchain
The build pipeline SHALL include Bun test as the standard test execution environment, completing the transition away from legacy Node.js tooling.

#### Scenario: Consistent Bun ecosystem usage
- **WHEN** examining the project's toolchain
- **THEN** Bun is used for both package management and test execution

#### Scenario: Jest dependencies removed
- **WHEN** checking project dependencies
- **THEN** jest, @types/jest, and ts-jest are no longer present

#### Scenario: Test performance integration
- **WHEN** evaluating overall development workflow performance
- **THEN** test execution contributes to the modern pipeline's speed improvements

### Requirement: CI/CD must support Bun test execution
The continuous integration pipeline SHALL execute tests using Bun test runner with proper GitHub Actions integration.

#### Scenario: GitHub Actions Bun setup
- **WHEN** CI workflows run
- **THEN** Bun is properly installed and configured for test execution

#### Scenario: Test execution in CI
- **WHEN** automated tests run in CI environment
- **THEN** tests execute successfully using `bun test` command

#### Scenario: Test result reporting
- **WHEN** tests complete in CI
- **THEN** results are properly reported and integrated with GitHub's status system