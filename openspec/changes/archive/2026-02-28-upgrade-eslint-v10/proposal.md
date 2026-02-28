## Why

Dometizer is preparing for v2 release with expected contributor growth, making strategic maintenance of latest stable toolchain versions mandatory. ESLint v10 represents the current stable release with improved code quality enforcement and better ecosystem compatibility, essential for maintaining high standards as the project scales.

## What Changes

- **BREAKING**: Update ESLint from v9.39.3 to v10.x (latest stable)
- **BREAKING**: Update @typescript-eslint plugins to v10-compatible versions
- Enable new recommended rules: `no-unassigned-vars`, `no-useless-assignment`, `preserve-caught-error`
- Validate all existing configurations work with v10 breaking changes
- Update CI/CD pipeline for v10 compatibility
- Ensure all build and quality scripts maintain performance with new version

## Capabilities

### New Capabilities
- `eslint-v10-linting`: Enhanced static analysis using ESLint v10 with improved JSX reference tracking and stricter validation

### Modified Capabilities
- `modern-linting-system`: Requirements update to reflect v10 API changes and new recommended rules

## Impact

- Build pipeline: Quality checks and CI workflows need validation
- Dependencies: @typescript-eslint ecosystem compatibility verification required  
- Code quality: New recommended rules may surface additional issues to address
- Contributor experience: Latest stable tooling improves onboarding and development consistency
- v2 release preparation: Ensures modern toolchain foundation for expanded contributor base