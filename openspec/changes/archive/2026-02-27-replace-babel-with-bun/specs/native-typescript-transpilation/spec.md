## ADDED Requirements

### Requirement: TypeScript must compile directly to ES2017
The TypeScript compiler SHALL output ES2017 code directly without intermediate transpilation steps.

#### Scenario: Direct compilation target
- **WHEN** TypeScript compiles source files
- **THEN** the output uses ES2017 features like async/await and object spread syntax

#### Scenario: No Babel intermediary
- **WHEN** running the build process  
- **THEN** no Babel transpilation occurs between TypeScript and bundle output

#### Scenario: Modern JavaScript features preserved
- **WHEN** using modern JS constructs in source (const, destructuring, arrow functions)
- **THEN** these features are preserved in ES2017 output without downgrading

### Requirement: Browser compatibility targeting must match ES2017
The compiled output SHALL target browsers supporting ES2017 features (Chrome 58+, Firefox 52+, Safari 11+, Edge 15+).

#### Scenario: Modern browser support maintained
- **WHEN** running compiled code in supported browsers
- **THEN** all functionality works without additional polyfills

#### Scenario: Legacy browser exclusion
- **WHEN** running compiled code in IE11 or older browsers
- **THEN** the code may not function and this is acceptable behavior

### Requirement: Build toolchain must be simplified
The build configuration SHALL eliminate Babel dependencies while maintaining identical output formats.

#### Scenario: Babel dependency removal
- **WHEN** examining package.json dependencies
- **THEN** no Babel-related packages (@babel/core, @babel/preset-env, etc.) are present

#### Scenario: Rollup configuration cleanup
- **WHEN** checking rollup.config.js
- **THEN** Babel plugins are removed but TypeScript and Terser plugins remain

#### Scenario: Output format preservation
- **WHEN** building with native TypeScript transpilation
- **THEN** UMD, ES module, and CommonJS outputs are generated identically to before