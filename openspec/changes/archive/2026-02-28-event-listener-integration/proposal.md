## Why

Current Dometizer functions require separate DOM operations to attach event listeners after element creation, leading to performance overhead and verbose code patterns. By integrating event listener attachment directly into the `create()` and `extend()` functions, we eliminate multiple DOM manipulations and provide a more fluent, performant API that aligns with modern DOM creation patterns.

## What Changes

- Add `events` parameter to `create()` function configuration object for attaching event listeners during element creation
- Add `events` parameter to `extend()` function configuration object for attaching event listeners to existing elements
- Integrate `Object.assign()` optimization patterns to reduce DOM operation overhead
- Add `dataset` parameter support for data-* attributes in both functions
- Add `styles` parameter support for inline CSS properties in both functions
- Enhance null/undefined value checking to avoid setting empty attributes

## Capabilities

### New Capabilities
- `event-listener-integration`: Direct event listener attachment during element creation and extension
- `performance-optimized-creation`: Object.assign patterns and reduced DOM manipulation overhead
- `enhanced-attribute-handling`: Dataset, styles, and null-safe attribute management

### Modified Capabilities
<!-- No existing capabilities are being modified at the requirements level -->

## Impact

- **Core Functions**: `src/create.ts` and `src/extend.ts` will have expanded configuration interfaces
- **Type Definitions**: `Attributes` interface in `src/extend.ts` will be enhanced with new optional properties
- **Test Coverage**: New test cases needed for event listener attachment, dataset handling, and performance scenarios
- **Bundle Size**: Minimal increase due to additional configuration handling
- **Breaking Changes**: None - all new parameters are optional and maintain backward compatibility
- **Performance**: Significant improvement for interactive components by reducing post-creation DOM operations