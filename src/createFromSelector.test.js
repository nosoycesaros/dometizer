const createFromSelector = require('./createFromSelector')

test('Create element from selector', () => {
    const button = createFromSelector('button#the-button.button.button--primary')

    expect(button.nodeName).toBe('BUTTON')
    expect(button.id).toBe('the-button')
    expect([...button.classList]).toEqual(['button', 'button--primary'])
})