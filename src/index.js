import o from './dometizer'

const title = o.create({
    type: 'h1',
    text: 'This is a Title'
})

const subtitle = o.create({
    type: 'h4',
    text: 'The fantabulous subtitle',
    className: ['subtitle']
})

const container = o.create({
    className: ['container'],
    'data-argument': 'hello'
})

o.append(container, [title, subtitle])

document.body.appendChild(container);