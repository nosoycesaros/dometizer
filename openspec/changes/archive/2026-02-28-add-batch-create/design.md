## Context

Dometizer currently provides individual DOM element creation via `create()` function with automatic DocumentFragment usage in `append()`. However, for large datasets, developers must manually loop through data and call `create()` multiple times, then manually manage DOM insertion. This leads to:

- Multiple DOM reflows when elements are added individually
- Boilerplate code for common batch creation patterns  
- No built-in performance optimization for large datasets
- Suboptimal use of DocumentFragment API

The target use case is creating 100+ DOM elements from structured data (tables, lists, cards) where performance matters.

## Goals / Non-Goals

**Goals:**
- Provide high-performance batch DOM element creation using DocumentFragment optimization
- Maintain full TypeScript type safety and inference
- Integrate seamlessly with existing Dometizer API (`create`, `append`, `extend`)
- Support both simple usage (just data + template) and advanced options (chunking, metrics)
- Achieve 5-10x performance improvement over individual `create()` calls for large datasets
- Keep bundle size impact minimal (1-2KB for core functionality)

**Non-Goals:**
- Replacing individual `create()` function - both should coexist
- Advanced template systems or reactive updates (that's v2.1+ territory)
- Web Worker offloading or complex async processing (initial version)
- Breaking changes to existing API

## Decisions

**1. Function Signature**
```typescript
batchCreate<T>(data: T[], template: (item: T, index: number) => Attributes, options?: BatchCreateOptions): HTMLElement[]
```
- **Rationale**: Consistent with functional programming patterns, strong type inference
- **Alternative considered**: Object-based config → Rejected for verbosity
- **Alternative considered**: Returning DocumentFragment → Rejected for API consistency

**2. Automatic DocumentFragment Usage**
- **Decision**: Always use DocumentFragment internally, expose HTMLElement[]
- **Rationale**: Performance optimization should be automatic and invisible
- **Alternative considered**: Optional fragments → Rejected as adds complexity without benefit

**3. Chunked Processing Strategy**
```typescript
interface BatchCreateOptions {
  chunkSize?: number;  // Default: 100
  container?: HTMLElement;  // Auto-append if provided
  onProgress?: (completed: number, total: number) => void;
}
```
- **Rationale**: Balance between performance and responsiveness
- **Alternative considered**: Automatic chunk sizing → Rejected for unpredictability
- **Alternative considered**: Always async → Rejected for API simplicity in v2.0

**4. Template Function Design**
- **Decision**: `(item: T, index: number) => Attributes` - returns existing Attributes interface
- **Rationale**: Leverages existing `create()` function, maintains type safety
- **Alternative considered**: Custom template DSL → Rejected for complexity and bundle size

**5. Performance Tracking**
```typescript
interface BatchMetrics {
  totalTime: number;
  elementsCreated: number;
  averageTimePerElement: number;
}
```
- **Decision**: Optional metrics via callback in options
- **Rationale**: Valuable for debugging performance issues
- **Alternative considered**: Always return metrics → Rejected for API simplicity

## Risks / Trade-offs

**Bundle Size Growth** → Keep core implementation minimal, advanced features in separate functions
- Risk: Feature creep increases bundle size beyond 2KB target
- Mitigation: Strict code review, tree-shakeable exports, feature flags

**Performance Regression for Small Datasets** → Benchmark against existing `create()` calls
- Risk: Overhead makes small datasets (1-10 elements) slower
- Mitigation: Comprehensive performance testing, fallback threshold detection

**Template Function Performance** → Profile template execution overhead
- Risk: Template function calls add significant overhead
- Mitigation: Optimize template calling pattern, consider template compilation in future

**Memory Usage with Large Datasets** → Implement chunked processing correctly
- Risk: Large DocumentFragments consume excessive memory
- Mitigation: Configurable chunk sizes, memory usage monitoring

**Breaking Changes in Future** → Design extensible options interface
- Risk: Adding features in v2.1+ requires breaking changes
- Mitigation: Forward-compatible options design, semantic versioning