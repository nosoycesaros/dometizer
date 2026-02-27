## MODIFIED Requirements

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

### Requirement: Build performance must be maintained or improved  
Build execution time SHALL be faster than the current TypeScript + Babel + Terser setup due to elimination of Babel transpilation step.

#### Scenario: Build speed improvement
- **WHEN** running the build process with native TypeScript compilation
- **THEN** build time is faster than the previous TypeScript + Babel setup

#### Scenario: Reduced toolchain overhead
- **WHEN** executing the build pipeline
- **THEN** fewer transformation steps result in measurably improved performance

## ADDED Requirements

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