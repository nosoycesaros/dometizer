# Dometizer Agent Guide

This guide provides essential information for agentic coding assistants working on the Dometizer project.

## Project Overview

Dometizer is a TypeScript/JavaScript library for creating complex DOM elements with a fluent API. It's distributed as a lightweight npm package with UMD, ES modules, and CommonJS support.

## Build, Lint, and Test Commands

### Available Scripts

```bash
# Run all tests
npm test
# or
yarn test

# Run a single test file
npx jest src/create.test.ts
npx jest src/append.test.ts
npx jest src/extend.test.ts
npx jest src/createFromSelector.test.ts

# Run tests in watch mode
npx jest --watch

# Run tests with coverage
npx jest --coverage

# Build the library
npm run build
# or
yarn build

# Build with verbose output
npx rollup --config --verbose
```

### Testing Framework
- **Jest** with **ts-jest** preset for TypeScript support
- Tests are co-located with source files (`.test.ts` pattern)
- Uses JSDOM environment for DOM manipulation testing
- Test files follow the pattern: `functionName.test.ts`

## Code Style Guidelines

### File Structure
```
src/
├── main.ts              # Main export file
├── create.ts/.test.ts   # Core functionality with tests
├── append.ts/.test.ts   # Helper functions with tests
├── extend.ts/.test.ts   # Extension utilities with tests
└── createFromSelector.ts/.test.ts
```

### TypeScript Configuration
- **Target**: ES5 for broad compatibility
- **Module**: ES6 modules
- **Strict**: `noImplicitAny: true`
- **Declarations**: Generated in `dist/` directory
- **ESModule Interop**: Enabled

### Import/Export Style
```typescript
// Named exports with default fallback
export { default as create } from './create'
export { default as append } from './append'

// Default exports for individual modules
export default function create(attributes: Attributes) { ... }

// Import internal dependencies
import extend, { Attributes } from './extend'
import append from './append'
```

### Naming Conventions
- **Files**: camelCase (e.g., `createFromSelector.ts`)
- **Functions**: camelCase with descriptive names (e.g., `createFromSelector`)
- **Interfaces**: PascalCase (e.g., `Attributes`)
- **Constants**: camelCase for objects, UPPER_CASE for primitives
- **Variables**: camelCase with meaningful names

### Code Formatting
- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Single quotes for strings
- **Semicolons**: Not required but used consistently
- **Line Length**: Keep reasonable (no strict limit observed)
- **Trailing Commas**: Used in objects and arrays

### Type Definitions
```typescript
// Interfaces for complex objects
export interface Attributes {
  type?: string,
  className?: Array<string>,
  children?: Array<HTMLElement>,
  text?: string,
  id?: string,
  [rest: string]: any  // Index signature for additional attributes
}

// Use explicit typing for function parameters
function extend(element: HTMLElement, attributes: Attributes)

// Use type casting when necessary
const newElement: HTMLElement = <HTMLElement>element.cloneNode(true)
```

### Function Documentation
Use JSDoc comments for public functions:
```typescript
/**
 * Create an HTMLElement of a given type and given properties
 * 
 * @param {object} attributes 
 * @param {string} [attributes.type=div] Type of HTMLElement to be created. defaults to div
 */
export default function create(attributes: Attributes) {
```

### Error Handling
- Use defensive programming with default values
- Provide fallbacks for undefined/null values:
```typescript
const attributeDefaults: Attributes = {
    type: 'div'
}

const { type, ...rest } = { ...attributeDefaults, ...attributes }
const element = document.createElement(type ? type : 'div');
```

### DOM Manipulation Best Practices
- Use `DocumentFragment` for efficient DOM operations
- Clone elements before modification to avoid side effects:
```typescript
const newElement: HTMLElement = <HTMLElement>element.cloneNode(true)
```
- Use modern DOM APIs (`classList.add`, `setAttribute`)

### Testing Style
```typescript
// Descriptive test names
test('Create an element with attributes', () => {

// Use realistic test data
const properties = {
    type: 'button',
    className: ['button', 'button--primary'],
    'data-attribute': 'hello'
}

// Clear expectations with specific assertions
expect(button.nodeName).toBe(properties.type.toUpperCase())
expect(Array.from(button.classList)).toEqual(expect.arrayContaining(properties.className))
```

### Dependencies
- **Runtime**: Minimal dependencies (`scalpel` for CSS parsing)
- **Development**: Standard TypeScript/Jest/Rollup toolchain
- Avoid adding unnecessary dependencies to keep bundle size small

## Build Output
- **UMD**: `dist/index.umd.js` (browser globals)
- **ES Modules**: `dist/index.es.js` (modern bundlers)
- **CommonJS**: `dist/index.js` (Node.js)
- **TypeScript Declarations**: `dist/main.d.ts`

## Library Design Principles
- **Fluent API**: Functions should be chainable where possible
- **Vanilla JS**: No framework dependencies
- **TypeScript First**: Full type safety and IntelliSense support  
- **Lightweight**: Minimal bundle size impact
- **Browser Compatible**: Works across modern browsers (ES5 target)

## Git Workflow
- Tests must pass before commits
- Use semantic versioning for releases
- GitHub Actions handle testing on Node.js 10.x, 12.x, 14.x
- Automated npm publishing on releases

## Notes for Agents
- Always run tests after making changes
- Maintain the co-located test pattern
- Keep the API simple and focused on DOM manipulation
- Preserve TypeScript type safety
- Follow existing code patterns for consistency
- Consider bundle size impact when adding features