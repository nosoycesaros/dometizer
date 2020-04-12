import {
  create,
  createFromSelector,
  append,
  extend
} from './dometizer'

const title = create({
    type: 'h1',
    text: 'This is a Title'
})

const subtitle = create({
    type: 'h4',
    text: 'The fantabulous subtitle',
    className: ['subtitle']
})

const container = create({
    className: ['container', 'container--fluid'],
    id: 'main-container',
    'data-argument': 'hello'
})


const button = createFromSelector('button#the-button.button')

const extendedButton = extend(button, {
    text: 'Click Me!',
    className: ['button--primary'],
    'data-toggle': 'modal'
})

append(container, [title, subtitle, extendedButton])

document.body.appendChild(container);