const extend = require('./extend')

test('Extend button with new classes', () => {
    const button = document.createElement('button')
    const extendedButton = extend(button, {
        text: 'Click Me!',
        className: ['button--primary'],
        'data-toggle': 'modal'
    })

    expect(extendedButton.innerHTML).toBe('Click Me!')
    expect([...extendedButton.classList]).toContain('button--primary')
    expect(extendedButton.dataset.toggle).toBe('modal')
})