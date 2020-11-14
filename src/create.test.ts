import create from './create'

test('Create an element with attributes', () => {
    const properties = {
        type: 'button',
        className: ['button', 'button--primary'],
        'data-attribute': 'hello',
        id: 'my-button',
        text: 'Click Me!'
    }
    const button = create(properties)

    expect(button.nodeName).toBe(properties.type.toUpperCase())
    expect(button.dataset.attribute).toBe(properties['data-attribute'])
    expect(button.id).toBe(properties.id)
    expect(button.innerHTML).toBe(properties.text)
    expect(Array.from(button.classList)).toEqual( expect.arrayContaining(properties.className) )
})