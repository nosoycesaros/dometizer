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
    id: 'main-container',
    'data-argument': 'hello'
})


const button = o.createWithSelector('button#the-button.button')

o.extend(button, {
    text: 'Click Me!',
    className: ['button--primary'],
    'data-toggle': 'modal'
})

o.append(container, [title, subtitle, button])

document.body.appendChild(container);