## Purpose

Modern build system using Rollup v4 with official plugins for fast, efficient compilation of TypeScript source into multiple output formats with optimal performance.

## Requirements

### Requirement: Rollup v4 Build System
The system SHALL use Rollup v4.59.0 as the primary build tool to compile TypeScript source into multiple output formats.

#### Scenario: UMD bundle generation
- **WHEN** the build process runs
- **THEN** a UMD bundle is generated at dist/index.umd.js with global name 'dometizer'

#### Scenario: ES module bundle generation
- **WHEN** the build process runs
- **THEN** an ES module bundle is generated at dist/index.es.js

#### Scenario: CommonJS bundle generation
- **WHEN** the build process runs
- **THEN** a CommonJS bundle is generated at dist/index.js

#### Scenario: External dependency handling
- **WHEN** building any bundle format
- **THEN** the scalpel dependency is marked as external and not bundled

### Requirement: Official Rollup Plugins
The system SHALL use official @rollup/plugin-* plugins maintained by the Rollup team.

#### Scenario: TypeScript compilation with official plugin
- **WHEN** TypeScript source files are processed
- **THEN** @rollup/plugin-typescript handles compilation and type checking

#### Scenario: Bundle minification with official plugin
- **WHEN** production bundles are built
- **THEN** @rollup/plugin-terser handles minification and optimization

#### Scenario: Plugin configuration compatibility
- **WHEN** migrating from community plugins
- **THEN** existing functionality is preserved with equivalent configuration

### Requirement: Build Performance Optimization
The system SHALL achieve significantly faster build times compared to the previous Rollup v2 system.

#### Scenario: Build speed improvement
- **WHEN** building all output formats
- **THEN** total build time is reduced by at least 50% compared to Rollup v2

#### Scenario: Bundle size optimization
- **WHEN** bundles are generated
- **THEN** output sizes are same or smaller compared to previous versions

#### Scenario: Incremental build support
- **WHEN** source files are modified during development
- **THEN** only necessary rebuilds occur for optimal developer experience