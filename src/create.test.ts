/// <reference lib="dom" />
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

test('Create element with event listeners', () => {
    let clickCount = 0
    let mouseoverCount = 0
    
    const handleClick = () => { clickCount++ }
    const handleMouseover = () => { mouseoverCount++ }
    
    const button = create({
        type: 'button',
        text: 'Test Button',
        events: {
            click: handleClick,
            mouseover: handleMouseover
        }
    })

    // Simulate events
    button.dispatchEvent(new Event('click'))
    button.dispatchEvent(new Event('mouseover'))
    button.dispatchEvent(new Event('click'))

    expect(clickCount).toBe(2)
    expect(mouseoverCount).toBe(1)
})

test('Create element with dataset parameters', () => {
    const element = create({
        type: 'div',
        dataset: {
            action: 'submit',
            target: '#form',
            enabled: true,
            count: 42
        }
    })

    expect(element.dataset.action).toBe('submit')
    expect(element.dataset.target).toBe('#form')
    expect(element.dataset.enabled).toBe('true')
    expect(element.dataset.count).toBe('42')
})

test('Create element with styles parameters', () => {
    const element = create({
        type: 'div',
        styles: {
            backgroundColor: 'blue',
            width: '100px',
            height: '50px'
        }
    })

    expect(element.style.backgroundColor).toBe('blue')
    expect(element.style.width).toBe('100px')
    expect(element.style.height).toBe('50px')
})

test('Handle null/undefined values gracefully', () => {
    const element = create({
        type: 'div',
        events: {
            click: null,
            mouseover: undefined
        },
        dataset: {
            valid: 'test',
            nullValue: null,
            undefinedValue: undefined
        },
        styles: {
            color: 'red',
            invalidStyle: null,
            undefinedStyle: undefined
        }
    })

    expect(element.dataset.valid).toBe('test')
    expect(element.dataset.nullValue).toBeUndefined()
    expect(element.dataset.undefinedValue).toBeUndefined()
    expect(element.style.color).toBe('red')
    expect(element.style.getPropertyValue('invalid-style')).toBe('')
})

test('Backward compatibility with existing usage', () => {
    const button = create({
        type: 'button',
        className: ['btn'],
        id: 'test',
        text: 'Old Style'
    })

    expect(button.nodeName).toBe('BUTTON')
    expect(button.classList.contains('btn')).toBe(true)
    expect(button.id).toBe('test')
    expect(button.innerHTML).toBe('Old Style')
})