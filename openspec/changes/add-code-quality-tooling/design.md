## Context

Dometizer is a lightweight DOM manipulation library currently maintained by a small team but planning for growth and external contributions. The codebase has good architecture and comprehensive testing but lacks automated code quality enforcement. Analysis revealed 19 specific style inconsistencies and 4 type safety issues that create contributor friction and PR review overhead.

Current state: TypeScript with basic configuration, no linting, no formatting automation, mixed style patterns across files.

## Goals / Non-Goals

**Goals:**
- Zero-configuration automated formatting that eliminates style debates
- Type safety enforcement that catches bugs early without complexity overhead  
- Minimal ESLint setup focused on bug prevention, not stylistic preferences
- Fast contributor onboarding with clear, automated quality standards
- Maintain build performance and development velocity

**Non-Goals:**
- Complex linting rules that slow down development
- Stylistic opinions beyond what Prettier provides
- Breaking existing APIs or changing library functionality
- Heavy tooling that impacts bundle size or runtime performance

## Decisions

**Decision 1: Prettier + TypeScript Strict + Minimal ESLint Stack**
- Rationale: Covers 95% of quality issues with minimal configuration overhead
- Alternative considered: Full ESLint stylistic rules - rejected for being too opinionated
- Alternative considered: TypeScript-only - rejected for missing runtime safety checks

**Decision 2: Prettier Configuration**
- `semi: false` (matches existing codebase preference)  
- `singleQuote: true` (matches majority of existing code)
- `trailingComma: "es5"` (browser compatibility)
- `printWidth: 100` (balances readability with modern screens)
- Rationale: Minimize diff churn while establishing clear standards

**Decision 3: TypeScript Strict Mode**
- Enable `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`
- Rationale: Catches the 4 type safety issues identified in codebase analysis
- Alternative considered: Gradual strictness - rejected for allowing continued technical debt

**Decision 4: ESLint Rule Selection**
- Only rules that prevent runtime bugs: `no-explicit-any`, `ban-ts-comment`, `prefer-nullish-coalescing`
- Explicitly disable all stylistic rules (defer to Prettier)
- Rationale: Focus linting effort on functional correctness, not style preferences

**Decision 5: No Pre-commit Hooks Initially**
- Start with IDE integration and CI checks
- Add hooks later if adoption proves successful
- Rationale: Reduce initial friction for contributors while establishing patterns

## Risks / Trade-offs

**Risk: Initial format churn** → Mitigation: Single formatting commit to establish baseline
**Risk: Contributor learning curve** → Mitigation: Auto-format on save reduces manual effort  
**Risk: Build time increase** → Mitigation: Focus on essential rules only, parallel CI checks
**Risk: Existing code violations** → Mitigation: Fix violations as part of implementation, not separately
**Trade-off: Less stylistic flexibility** → Benefit: Zero style debates, faster reviews