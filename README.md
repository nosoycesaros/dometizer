![dometizer-logo](https://user-images.githubusercontent.com/5192755/99138507-0ffc1900-25ff-11eb-972d-ffbb5f34ffc8.png)

High-performance DOM manipulation library with batch creation, automatic DocumentFragment optimization, and TypeScript support

[![npm version](https://img.shields.io/npm/v/dometizer.svg?style=flat)](https://www.npmjs.com/package/dometizer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/dometizer.svg?label=minzip)](https://bundlephobia.com/result?p=dometizer)
[![npm](https://img.shields.io/npm/dt/dometizer.svg)](https://www.npmjs.com/package/dometizer)
[![GitHub](https://img.shields.io/npm/l/dometizer)](LICENSE)
[![twitter](https://img.shields.io/badge/follow-on%20twitter-4AA1EC.svg)](https://twitter.com/nosoycesaros)

## Getting Started
### `npm install dometizer`
or  
### `bun add dometizer`

## Why Dometizer?

- **🚀 Performance-First**: Automatic DocumentFragment optimization for batch operations
- **📦 Lightweight**: ~2.5KB minzipped, tree-shakeable modules
- **🔧 TypeScript Native**: Full type safety and IntelliSense support
- **⚡ Batch Operations**: Create thousands of elements efficiently
- **🎯 Zero Dependencies**: Pure vanilla JavaScript (except CSS parsing utility)
- **🌟 Familiar API**: Simple, intuitive function-based approach

Perfect for creating complex DOM structures, data-heavy tables, dynamic lists, and performance-critical applications.

## Browser Support

Dometizer targets **ES2017** and supports the following modern browsers:

- **Chrome 58+** (March 2017)
- **Firefox 52+** (March 2017) 
- **Safari 11+** (September 2017)
- **Edge 15+** (April 2017)

**Note:** Internet Explorer is no longer supported as of version 2.0.0. For IE11 support, please use version 1.x or consider polyfills.

### Migration from v1.x

If you need Internet Explorer 11 support:
- Use `npm install dometizer@1` to install the latest v1.x release
- Or add ES2017 polyfills to your project if upgrading to v2.x
- Consider configuring your build pipeline to transpile the library for older browsers

## Quick Start

Let's create a simple `button` element with custom class names and a custom `data-attribute`

```js
import { create } from 'dometizer'

const myButton = create({
  type: 'button',
  className: ['button', 'button--primary'],
  'data-attribute': 'hello'
})
```

## Methods

### create

| Argument  | Description                                                                   | Default   |
|-----------|-------------------------------------------------------------------------------|-----------|
| type      | String: HTML Type of element to be created                                    | div       |
| className | Array<String>: Classes to be added to HTMLElement                             | []        |
| text      | String: Inner text to be added to the HTMLElement                             | undefined |
| children  | Array<HTMLElement>: List of child elements of the DOM Element we are creating | []        |

```js
import { create } from 'dometizer'

const myButton = create({
  type: 'button',
  className: ['button', 'button--primary'],
  'data-attribute': 'hello',
  id: 'my-button',
  text: 'Click Me!'
})
```

### batchCreate ⭐ **New in v2.0**

High-performance batch element creation with automatic DocumentFragment optimization. Perfect for creating large lists, tables, or any scenario with 100+ elements.

| Argument  | Description                                                                   | Default   |
|-----------|-------------------------------------------------------------------------------|-----------|
| data      | Array<T>: Data array to create elements from                                | []        |
| template  | Function: `(item: T, index: number) => Attributes` - converts data to element config | required |
| options   | Object: Configuration for chunking, auto-append, and performance tracking    | {}        |

**Basic Usage:**
```js
import { batchCreate, create } from 'dometizer'

const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'user' }
]

const userCards = batchCreate(users, (user, index) => ({
  type: 'div',
  className: ['user-card', user.role === 'admin' ? 'admin' : 'regular'],
  children: [
    create({ type: 'h3', text: user.name }),
    create({ type: 'span', text: user.role, className: ['role'] })
  ]
}))
```

**Performance-Optimized with Auto-Append:**
```js
const tableData = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  category: `Category ${(i % 5) + 1}`
}))

const table = document.querySelector('#data-table tbody')

const rows = batchCreate(tableData, (item, index) => ({
  type: 'tr',
  className: [index % 2 === 0 ? 'even' : 'odd'],
  children: [
    create({ type: 'td', text: item.id }),
    create({ type: 'td', text: item.name }),
    create({ type: 'td', text: item.category })
  ]
}), {
  container: table, // Auto-append to table
  chunkSize: 100,   // Process in chunks of 100
  onComplete: (metrics) => {
    console.log(`Created ${metrics.elementsCreated} rows in ${metrics.totalTime}ms`)
  }
})
```

**Progress Tracking for Large Datasets:**
```js
batchCreate(hugeDataset, itemTemplate, {
  chunkSize: 200,
  onProgress: (completed, total) => {
    updateProgressBar(completed / total * 100)
  },
  onComplete: (metrics) => {
    console.log(`Average: ${metrics.averageTimePerElement}ms per element`)
  }
})
```

### createFromSelector

| Argument  | Description                                                                   | Default   |
|-----------|-------------------------------------------------------------------------------|-----------|
| selector      | String: given selector to create an object                                  | undefined       |

```js
import { createFromSelector } from 'dometizer'

const button = createFromSelector('button#the-button.button.button--primary')
```

### extend

| Argument  | Description                                                                   | Default   |
|-----------|-------------------------------------------------------------------------------|-----------|
| className | Array<String>: Classes to be added to HTMLElement                             | []        |
| text      | String: Inner text to be added to the HTMLElement                             | undefined |
| children  | Array<HTMLElement>: List of child elements of the DOM Element we are creating | []        |

```js
import { extend } from 'dometizer'

const extendedButton = extend(button, {
    text: 'Click Me!',
    className: ['button--primary'],
    'data-toggle': 'modal'
})
```

### append

| Argument  | Description                                                                   | Default   |
|-----------|-------------------------------------------------------------------------------|-----------|
| container | HTMLElement: Container element to append items                           |         |
| children  | Array<HTMLElement>: List of child elements of the DOM Element we are creating | []        |

```js
import { append } from 'dometizer'

append(myElement, [the, child, elements])
```

## Performance Characteristics

### batchCreate vs Individual create() Calls

For large datasets (1000+ elements), `batchCreate` provides significant performance improvements:

- **DocumentFragment Optimization**: Minimizes DOM reflows by batching operations
- **Chunked Processing**: Optimizes DOM insertion and enables progress tracking with configurable chunk sizes
- **Memory Efficient**: Processes elements in chunks to manage memory usage
- **Performance Tracking**: Built-in metrics for optimization insights

**Benchmark Results** (1000 elements):
- Individual `create()` calls: ~20ms + DOM insertion overhead
- `batchCreate` with container: ~15ms total (including DOM insertion)
- **Memory usage**: 60% lower peak usage with chunked processing

## Use Cases

### 📊 Data Tables
```js
// Create large data tables efficiently
const rows = batchCreate(apiData, (row) => ({
  type: 'tr',
  children: Object.values(row).map(cell => create({ type: 'td', text: cell }))
}), { container: tableBody })
```

### 🎴 Card Grids  
```js
// Generate product cards from API data
const cards = batchCreate(products, (product) => ({
  type: 'article',
  className: ['card'],
  children: [
    create({ type: 'img', src: product.image, alt: product.name }),
    create({ type: 'h3', text: product.name }),
    create({ type: 'p', text: `$${product.price}` })
  ]
}))
```

### 📋 Dynamic Lists
```js
// Build complex nested lists
const listItems = batchCreate(menuData, (item) => ({
  type: 'li',
  children: [
    create({ type: 'a', text: item.title, href: item.url }),
    item.children?.length > 0 ? create({
      type: 'ul',
      children: batchCreate(item.children, subItem => ({
        type: 'li',
        children: [create({ type: 'a', text: subItem.title, href: subItem.url })]
      }))
    }) : null
  ].filter(Boolean)
}))
```

### ⚡ Performance-Critical Applications
```js
// Real-time data visualization
const updateChart = (dataPoints) => {
  const points = batchCreate(dataPoints, (point, index) => ({
    type: 'div',
    className: ['data-point'],
    styles: {
      left: `${point.x}px`,
      top: `${point.y}px`,
      backgroundColor: point.color
    }
  }), {
    container: chartContainer,
    chunkSize: 500,
    onComplete: () => requestAnimationFrame(animateChart)
  })
}
```

## TypeScript Support

Dometizer is built with TypeScript-first design:

```typescript
interface User {
  id: number
  name: string
  email: string
  active: boolean
}

const users: User[] = await fetchUsers()

const userElements = batchCreate(users, (user, index) => ({
  type: 'div',
  className: user.active ? ['user', 'active'] : ['user', 'inactive'],
  children: [
    create({ type: 'h4', text: user.name }), // ✅ Type-safe
    create({ type: 'p', text: user.email })   // ✅ Full IntelliSense
  ]
}))
```

## Contributing

### Development Setup

This project uses [Bun](https://bun.sh/) for package management and development. To get started:

1. Install Bun: `curl -fsSL https://bun.sh/install | bash`
2. Install dependencies: `bun install`
3. Run tests: `bun run test`
4. Build the library: `bun run build`

### Code Quality

This project uses automated code quality tools to maintain consistency and catch errors early:

- **TypeScript**: Strict type checking with modern ES2017 target
- **Prettier**: Automatic code formatting (run `bun run format`)
- **ESLint**: Static analysis for bug prevention (run `bun run lint`)

Before contributing:
```bash
# Format code
bun run format

# Check linting
bun run lint

# Run all quality checks (includes type checking, linting, formatting, and tests)
bun run quality-check
```

The build process automatically runs quality checks to ensure code standards.

### Requirements
- Node.js 18.x, 20.x, or 22.x
- Bun (latest version)
