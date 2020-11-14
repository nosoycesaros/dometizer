![dometizer-logo](https://user-images.githubusercontent.com/5192755/99138507-0ffc1900-25ff-11eb-972d-ffbb5f34ffc8.png)

An easy way to create complex DOM elements with a lot of attributes using vanilla JS

[![npm version](https://img.shields.io/npm/v/dometizer.svg?style=flat)](https://www.npmjs.com/package/dometizer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/dometizer.svg?label=minzip)](https://bundlephobia.com/result?p=dometizer)
[![npm](https://img.shields.io/npm/dt/dometizer.svg)](https://www.npmjs.com/package/dometizer)
[![GitHub](https://img.shields.io/npm/l/dometizer)](LICENSE)
[![twitter](https://img.shields.io/badge/follow-on%20twitter-4AA1EC.svg)](https://twitter.com/nosoycesaros)

## Getting Started
### `yarn add dometizer`

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
