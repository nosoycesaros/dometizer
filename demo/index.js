const title = dometizer.create({
    type: 'h1',
    text: 'This is a Title'
})

const subtitle = dometizer.create({
    type: 'h4',
    text: 'The fantabulous subtitle',
    className: ['subtitle']
})

const container = dometizer.create({
    className: ['container', 'container--fluid'],
    id: 'main-container',
    'data-argument': 'hello'
})

const button = dometizer.createFromSelector('button#the-button.button')

const extendedButton = dometizer.extend(button, {
    text: 'Click Me!',
    className: ['button--primary'],
    'data-toggle': 'modal'
})

dometizer.append(container, [title, subtitle, extendedButton])

document.body.appendChild(container);