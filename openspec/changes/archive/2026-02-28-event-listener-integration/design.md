## Context

The current Dometizer library has basic element creation and extension capabilities through `create()` and `extend()` functions. However, developers must perform additional DOM operations after element creation to attach event listeners, set data attributes, and apply inline styles. This results in multiple DOM manipulations and verbose code patterns.

The library's existing `Attributes` interface supports basic properties like `type`, `className`, `children`, `text`, and a generic `[rest: string]: any` for additional attributes. This change expands the interface to directly support events, dataset, and styles parameters while optimizing performance through reduced DOM operations.

## Goals / Non-Goals

**Goals:**
- Add `events`, `dataset`, and `styles` parameters to both `create()` and `extend()` functions
- Optimize performance using `Object.assign()` patterns and batched operations
- Maintain backward compatibility with existing API
- Reduce DOM manipulation overhead for interactive components
- Provide TypeScript-friendly interfaces with proper type safety

**Non-Goals:**
- Changing the core function signatures or breaking existing functionality
- Adding complex event delegation or custom event systems
- Supporting CSS-in-JS libraries or advanced styling abstractions
- Adding validation beyond basic type checking

## Decisions

### Decision 1: Extend Attributes interface vs. separate parameters
**Choice**: Extend the existing `Attributes` interface with optional `events`, `dataset`, and `styles` properties.

**Rationale**: This maintains API consistency and leverages the existing pattern of using a single configuration object. Alternative of separate parameters would break the fluent API design and require overloaded function signatures.

**Alternatives considered**:
- Separate parameters: Would require function overloads and break existing patterns
- New wrapper functions: Would fragment the API and confuse users

### Decision 2: Object.assign() for basic properties vs. individual assignment
**Choice**: Use `Object.assign()` for settable properties (className, innerHTML, textContent) when multiple are present.

**Rationale**: `Object.assign()` reduces the number of property access operations and can be more efficient for multiple simultaneous assignments. However, preserve current individual assignment for single properties to avoid overhead.

**Alternatives considered**:
- Always use Object.assign(): Overhead for single properties
- Never use Object.assign(): Missed optimization opportunity for multiple properties

### Decision 3: Event handler validation approach
**Choice**: Use `typeof handler === 'function'` check before `addEventListener()`.

**Rationale**: Simple, performant validation that prevents runtime errors. Follows the pattern from the inspiration code and aligns with DOM standards.

**Alternatives considered**:
- No validation: Risk of runtime errors
- Complex validation: Unnecessary overhead for this use case

### Decision 4: Null/undefined value handling
**Choice**: Skip operations for `null` and `undefined` values using conditional checks before DOM operations.

**Rationale**: Prevents setting invalid attributes and improves performance by avoiding unnecessary DOM calls. Empty strings are still valid and should be processed.

**Alternatives considered**:
- Process all values: Risk of setting invalid attributes
- Convert to empty strings: Changes user intent

## Risks / Trade-offs

**Bundle size increase** → Mitigation: New functionality is optional and the increase should be minimal (estimated <1KB)

**Memory allocation from iteration** → Mitigation: Use efficient `Object.entries()` iteration pattern and avoid creating intermediate arrays

**Performance regression for simple cases** → Mitigation: Preserve existing fast paths for common use cases, only add overhead when new features are used

**Type safety complexity** → Mitigation: Use union types and optional properties to maintain type safety while allowing flexibility

**Event handler memory leaks** → Mitigation: Document that users are responsible for cleanup, consistent with standard DOM patterns

## Migration Plan

**Phase 1**: Implement enhanced `Attributes` interface and update TypeScript definitions
**Phase 2**: Update `create()` function with new parameter handling
**Phase 3**: Update `extend()` function with new parameter handling  
**Phase 4**: Add comprehensive test coverage for all new features
**Phase 5**: Update documentation and examples

**Rollback strategy**: All changes are backward compatible, so rollback simply involves reverting commits. No migration needed for existing code.

## Open Questions

- Should we add a performance benchmark to measure the improvement?
- Do we need special handling for React synthetic events or other framework interop?
- Should `styles` parameter support CSS custom properties (CSS variables)?