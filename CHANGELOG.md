# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-02-27

### Changed
- **BREAKING**: Removed Babel transpilation in favor of native TypeScript compilation targeting ES2017
- **BREAKING**: Dropped Internet Explorer 11 support
- Updated TypeScript compilation target from ES5 to ES2017 for improved performance and smaller bundles
- Simplified build toolchain by removing Babel dependencies (~8 packages removed)
- Improved build performance by eliminating unnecessary transpilation step

### Removed
- **BREAKING**: Removed support for Internet Explorer 11 and older browsers
- Removed Babel dependencies: @babel/core, @babel/preset-env, @babel/preset-typescript, @rollup/plugin-babel
- Removed babel-jest dependency (tests still use ts-jest)

### Added
- Enhanced browser support documentation in README.md
- Performance improvements from streamlined build process

### Browser Support
**Minimum supported browsers (ES2017+):**
- Chrome 58+ (March 2017)
- Firefox 52+ (March 2017)
- Safari 11+ (September 2017)
- Edge 15+ (April 2017)

### Migration Guide
For users requiring Internet Explorer 11 support:
- Continue using version 1.x of dometizer
- Consider adding ES2017 polyfills to your project if upgrading
- Alternatively, configure your own build pipeline to transpile the library

### Technical Details
- Bundle formats remain unchanged (UMD, ES modules, CommonJS)
- API surface and functionality completely preserved
- TypeScript declaration files continue to be generated
- External dependency handling (scalpel) maintained
- All existing tests pass without modification

## [1.1.5] - Previous Release
- Previous changelog entries would appear here