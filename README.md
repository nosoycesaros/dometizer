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

## Arguments

| Argument  | Description                                                                   | Default   |
|-----------|-------------------------------------------------------------------------------|-----------|
| type      | String: HTML Type of element to be created                                    | div       |
| className | Array<String>: Classes to be added to HTMLElement                             | []        |
| text      | String: Inner text to be added to the HTMLElement                             | undefined |
| children  | Array<HTMLElement>: List of child elements of the DOM Element we are creating | []        |