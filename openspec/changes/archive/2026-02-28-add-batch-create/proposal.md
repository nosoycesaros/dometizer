## Why

Dometizer needs efficient batch DOM element creation for v2.0. Current approach requires individual `create()` calls followed by manual DOM operations, leading to performance issues with large datasets. Production AEM codebases show critical performance problems from triple-nested loops with innerHTML concatenation and repeated DOM reflows. A `batchCreate` function with automatic DocumentFragment usage and performance optimization will differentiate Dometizer as the performance-focused DOM manipulation library.

## What Changes

- Add `batchCreate<T>(data: T[], template: (item: T, index: number) => Attributes, options?: BatchCreateOptions): HTMLElement[]` function
- Automatic DocumentFragment usage for optimized DOM operations
- Configurable chunk processing to avoid main thread blocking
- Optional performance tracking and metrics
- Integration with existing `create()` function and type system
- Optional auto-append to container element for immediate DOM insertion

## Capabilities

### New Capabilities
- `batch-dom-creation`: Efficiently create multiple DOM elements from data arrays using templates, with automatic DocumentFragment optimization and performance tracking

### Modified Capabilities
<!-- None - this is a new additive feature that doesn't change existing behavior -->

## Impact

- New export from main Dometizer package: `batchCreate` function
- Additional TypeScript interfaces: `BatchCreateOptions`, `BatchMetrics`  
- Bundle size increase: approximately 1-2KB for core functionality
- Performance improvement: 5-10x faster DOM creation for large datasets (100+ elements)
- Developer experience: Reduced boilerplate for common batch creation patterns
- Backward compatibility: Full - no breaking changes to existing API