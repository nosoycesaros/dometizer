import DOMetizer from './dometizer'

const title = new DOMetizer({
    type: 'h1',
    text: 'This is a Title'
})

const subtitle = new DOMetizer({
    type: 'h4',
    text: 'The fantabulous subtitle',
    className: ['subtitle']
})

const container = new DOMetizer({
    className: ['container'],
    'data-argument': 'hello',
    children: [
        title.element,
        subtitle.element
    ]
})

document.body.appendChild(container.element);