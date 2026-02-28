## Why

Dometizer is planning for growth and contributor onboarding. Currently, the codebase lacks automated code quality gates, leading to style inconsistencies and potential type safety issues that create friction for new contributors and increase PR review overhead on formatting rather than logic.

## What Changes

- Add Prettier for zero-configuration automatic code formatting
- Enable TypeScript strict mode to catch type safety issues 
- Add minimal ESLint configuration focused on bug prevention (not style)
- Configure automated formatting on save in development workflow
- Add pre-commit hooks to ensure quality standards before commits
- Update package.json with new dev dependencies and scripts

## Capabilities

### New Capabilities
- `code-formatting`: Automated code formatting with Prettier to eliminate style debates
- `type-safety-enforcement`: Strict TypeScript configuration to catch type errors early
- `code-linting`: ESLint rules focused on bug prevention and TypeScript best practices

### Modified Capabilities
<!-- No existing capabilities are being modified -->

## Impact

**Dependencies**: New dev dependencies (prettier, eslint, @typescript-eslint/*)
**Configuration**: New config files (.prettierrc, .eslintrc.js, updated tsconfig.json)
**Workflow**: Automatic formatting on save, pre-commit validation
**Contributors**: Reduced cognitive load for style decisions, faster onboarding
**Codebase**: Immediate formatting standardization across all TypeScript files