# DOMetizer
An easy way to create complex DOM elements with a lot of attributes using vanilla JS

## Getting Started
Let's create a simple `button` element with custom class names and a custom `data-attribute`

```js
import o from './dometizer'

const myButton = o.create({
  type: 'button',
  className: ['button button--primary'],
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
const myButton = o.create({
  type: 'button',
  className: ['button button--primary'],
  'data-attribute': 'hello',
  id: 'my-button',
  text: 'Click Me!'
})
```

### createWithSelector

```js
const button = o.createWithSelector('button#the-button.button.button--primary')
```

### extend

```js
o.extend(button, {
    text: 'Click Me!',
    className: ['button--primary'],
    'data-toggle': 'modal'
})
```

### append

```js
o.append(myElement, [the, child, elements])
```