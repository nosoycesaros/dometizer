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
- **⚡ Batch Operations**: Create thousands of elements efficiently with progress tracking
- **🎯 Zero Dependencies**: Pure vanilla JavaScript (except CSS parsing utility)
- **🌟 Comprehensive API**: Events, datasets, styles, and attributes in one unified interface
- **🔗 Familiar Patterns**: Simple, intuitive function-based approach that scales

Perfect for creating complex DOM structures, interactive components, data-heavy tables, dynamic lists, and performance-critical applications.

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

## API at a Glance

Dometizer provides a comprehensive toolkit for DOM manipulation:

```js
import { create, extend, append, batchCreate, createFromSelector } from 'dometizer'

// 🎯 Create elements with full feature support
create({
  type: 'div',
  className: ['card'],
  text: 'Hello World',
  events: { click: handleClick },
  dataset: { id: '123' },
  styles: { padding: '1rem' }
})

// 🔧 Enhance existing elements  
extend(existingElement, { className: ['enhanced'] })

// 📦 High-performance batch creation
batchCreate(data, item => ({ type: 'div', text: item.name }))

// 🎨 Create from CSS selectors
createFromSelector('button#submit.btn.btn-primary')

// 📌 DOM utilities
append(container, [child1, child2])
```

## Methods

### create

Create DOM elements with comprehensive attribute support, event handling, and styling.

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| type      | `string` | HTML element type to create | `"div"` |
| className | `string[]` | CSS classes to add | `[]` |
| text      | `string` | Inner text content | `undefined` |
| children  | `HTMLElement[]` | Child elements to append | `[]` |
| id        | `string` | Element ID attribute | `undefined` |
| events    | `EventHandlers` | Event listeners to attach | `{}` |
| dataset   | `DataAttributes` | Data attributes (data-*) | `{}` |
| styles    | `StyleProperties` | CSS styles to apply | `{}` |
| ...attrs  | `any` | Additional HTML attributes | - |

**Basic Usage:**
```js
import { create } from 'dometizer'

const myButton = create({
  type: 'button',
  className: ['button', 'button--primary'],
  text: 'Click Me!',
  id: 'my-button'
})
```

**With Event Handling:**
```js
const interactiveButton = create({
  type: 'button',
  text: 'Interactive Button',
  className: ['btn', 'btn-primary'],
  events: {
    click: (e) => console.log('Button clicked!'),
    mouseover: (e) => e.target.classList.add('hovered'),
    mouseout: (e) => e.target.classList.remove('hovered')
  }
})
```

**With Dataset and Styles:**
```js
const styledCard = create({
  type: 'article',
  className: ['card'],
  dataset: {
    component: 'user-card',
    userId: '123',
    status: 'active'
  },
  styles: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
})
```

**Complex Nested Structure:**
```js
const userProfile = create({
  type: 'section',
  className: ['user-profile'],
  children: [
    create({ 
      type: 'img', 
      src: user.avatar, 
      alt: user.name,
      className: ['avatar']
    }),
    create({
      type: 'div',
      className: ['user-info'],
      children: [
        create({ type: 'h3', text: user.name }),
        create({ type: 'p', text: user.email, className: ['email'] })
      ]
    })
  ]
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

Enhance existing DOM elements with the same comprehensive attribute support as `create()`.

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| element   | `HTMLElement` | Element to extend (cloned, original unchanged) | *required* |
| className | `string[]` | CSS classes to add | `[]` |
| text      | `string` | Inner text content to set | `undefined` |
| children  | `HTMLElement[]` | Child elements to append | `[]` |
| id        | `string` | Element ID attribute | `undefined` |
| events    | `EventHandlers` | Event listeners to attach | `{}` |
| dataset   | `DataAttributes` | Data attributes (data-*) to set | `{}` |
| styles    | `StyleProperties` | CSS styles to apply | `{}` |
| ...attrs  | `any` | Additional HTML attributes | - |

**Basic Enhancement:**
```js
import { extend } from 'dometizer'

const enhancedButton = extend(existingButton, {
  text: 'Enhanced!',
  className: ['button--primary', 'active'],
  'data-toggle': 'modal'
})
```

**Adding Interactivity:**
```js
const interactiveElement = extend(staticElement, {
  events: {
    click: (e) => showModal(e.target.dataset.modalId),
    keydown: (e) => e.key === 'Enter' && e.target.click()
  },
  dataset: {
    modalId: 'user-settings',
    keyboard: 'true'
  },
  styles: {
    cursor: 'pointer',
    userSelect: 'none'
  }
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

### 📊 Interactive Data Tables
```js
// Create large data tables with event handling
const rows = batchCreate(apiData, (row, index) => ({
  type: 'tr',
  className: [index % 2 === 0 ? 'even' : 'odd'],
  dataset: { rowId: row.id, index },
  events: {
    click: (e) => selectRow(row.id),
    dblclick: (e) => editRow(row.id)
  },
  children: Object.values(row).map(cell => create({ 
    type: 'td', 
    text: cell,
    events: {
      focus: (e) => highlightCell(e.target)
    }
  }))
}), { 
  container: tableBody,
  onComplete: (metrics) => console.log(`Table rendered in ${metrics.totalTime}ms`)
})
```

### 🎴 Interactive Card Grids
```js
// Generate product cards with rich interactions
const cards = batchCreate(products, (product) => ({
  type: 'article',
  className: ['card', product.featured ? 'featured' : ''],
  dataset: {
    productId: product.id,
    category: product.category,
    price: product.price
  },
  events: {
    click: (e) => viewProduct(product.id),
    mouseenter: (e) => preloadProductDetails(product.id),
    focus: (e) => announceProduct(product.name) // Accessibility
  },
  styles: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  children: [
    create({ 
      type: 'img', 
      src: product.image, 
      alt: product.name,
      events: {
        error: (e) => e.target.src = '/images/placeholder.jpg'
      }
    }),
    create({ type: 'h3', text: product.name }),
    create({ 
      type: 'p', 
      text: `$${product.price}`,
      className: ['price']
    }),
    create({
      type: 'button',
      text: 'Add to Cart',
      className: ['btn', 'btn-primary'],
      events: {
        click: (e) => {
          e.stopPropagation() // Don't trigger card click
          addToCart(product.id)
        }
      }
    })
  ]
}))
```

### 📋 Dynamic Form Components
```js
// Build complex forms with validation and interactivity
const formFields = batchCreate(fieldConfigs, (field) => ({
  type: 'div',
  className: ['field-group'],
  children: [
    create({ 
      type: 'label', 
      text: field.label,
      for: field.id 
    }),
    create({
      type: field.type,
      id: field.id,
      name: field.name,
      required: field.required,
      placeholder: field.placeholder,
      events: {
        input: (e) => validateField(field.id, e.target.value),
        blur: (e) => showFieldErrors(field.id),
        focus: (e) => clearFieldErrors(field.id)
      },
      dataset: {
        validation: field.validation,
        errorContainer: `${field.id}-errors`
      }
    }),
    create({
      type: 'div',
      id: `${field.id}-errors`,
      className: ['field-errors'],
      styles: { display: 'none' }
    })
  ]
}))
```

### ⚡ Real-time Data Visualization
```js
// High-performance chart updates with event handling
const updateChart = (dataPoints) => {
  const points = batchCreate(dataPoints, (point, index) => ({
    type: 'div',
    className: ['data-point', `category-${point.category}`],
    dataset: {
      value: point.value,
      timestamp: point.timestamp,
      category: point.category
    },
    events: {
      mouseenter: (e) => showTooltip(point, e.clientX, e.clientY),
      mouseleave: (e) => hideTooltip(),
      click: (e) => drillDownData(point.category, point.timestamp)
    },
    styles: {
      left: `${point.x}px`,
      top: `${point.y}px`,
      backgroundColor: point.color,
      transform: `scale(${point.size})`,
      transition: 'all 0.3s ease'
    }
  }), {
    container: chartContainer,
    chunkSize: 500,
    onProgress: (completed, total) => {
      updateLoadingBar(completed / total * 100)
    },
    onComplete: () => {
      hideLoadingBar()
      requestAnimationFrame(() => animateChartEntrance())
    }
  })
}
```

## TypeScript Support

Dometizer is built with TypeScript-first design and exports comprehensive types for enhanced development experience:

```typescript
import { 
  create, 
  batchCreate, 
  extend, 
  type BatchCreateOptions, 
  type BatchMetrics 
} from 'dometizer'

interface User {
  id: number
  name: string
  email: string
  active: boolean
}

const users: User[] = await fetchUsers()

// Full type safety for element attributes
const userElements = batchCreate(users, (user, index) => ({
  type: 'div',
  className: user.active ? ['user', 'active'] : ['user', 'inactive'],
  dataset: {
    userId: user.id.toString(),
    index: index.toString()
  },
  events: {
    click: (e: Event) => selectUser(user.id),
    mouseover: (e: Event) => showUserPreview(user)
  },
  children: [
    create({ type: 'h4', text: user.name }), // ✅ Type-safe
    create({ type: 'p', text: user.email })   // ✅ Full IntelliSense
  ]
}))

// Type-safe batch options
const options: BatchCreateOptions = {
  chunkSize: 100,
  container: document.querySelector('#users-container')!,
  onProgress: (completed: number, total: number) => {
    console.log(`Progress: ${completed}/${total}`)
  },
  onComplete: (metrics: BatchMetrics) => {
    console.log(`Created ${metrics.elementsCreated} elements in ${metrics.totalTime}ms`)
  }
}
```

### Available Types

```typescript
// Event handlers with proper typing
interface EventHandlers {
  [event: string]: ((event: Event) => void) | null | undefined
}

// Data attributes (converted to data-* attributes)
interface DataAttributes {
  [key: string]: string | number | boolean | null | undefined
}

// CSS style properties
interface StyleProperties {
  [property: string]: string | number | null | undefined
}

// Complete element attributes interface
interface Attributes {
  type?: string
  className?: Array<string>
  children?: Array<HTMLElement>
  text?: string
  id?: string
  events?: EventHandlers
  dataset?: DataAttributes
  styles?: StyleProperties
  [rest: string]: any // Additional HTML attributes
}
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
