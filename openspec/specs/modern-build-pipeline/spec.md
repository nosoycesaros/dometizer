## ADDED Requirements

### Requirement: Build system must maintain exact output compatibility
The build system SHALL produce identical bundle outputs in UMD, ES module, and CommonJS formats.

#### Scenario: UMD bundle compatibility
- **WHEN** building with the updated pipeline
- **THEN** the UMD bundle has identical API surface and global variable structure

#### Scenario: ES module bundle compatibility
- **WHEN** building ES modules
- **THEN** the output maintains proper external dependency handling for scalpel

#### Scenario: CommonJS compatibility
- **WHEN** building CommonJS output
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
Build execution time SHALL NOT be significantly slower than the current Rollup setup.

#### Scenario: Build speed comparison
- **WHEN** running the build process
- **THEN** build time is comparable to or faster than the previous setup

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