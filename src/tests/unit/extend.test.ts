/// <reference lib="dom" />
import extend from '@functions/extend'

test('Extend button with new classes', () => {
  const button = document.createElement('button')
  const extendedButton = extend(button, {
    text: 'Click Me!',
    className: ['button--primary'],
    'data-toggle': 'modal',
  })

  expect(extendedButton.innerHTML).toBe('Click Me!')
  expect(Array.from(extendedButton.classList)).toContain('button--primary')
  expect(extendedButton.dataset.toggle).toBe('modal')
})

test('Extend element with event listeners', () => {
  let clickCount = 0
  let focusCount = 0

  const handleClick = () => {
    clickCount++
  }
  const handleFocus = () => {
    focusCount++
  }

  const input = document.createElement('input')
  const extendedInput = extend(input, {
    events: {
      click: handleClick,
      focus: handleFocus,
    },
  })

  // Simulate events
  extendedInput.dispatchEvent(new Event('click'))
  extendedInput.dispatchEvent(new Event('focus'))
  extendedInput.dispatchEvent(new Event('click'))

  expect(clickCount).toBe(2)
  expect(focusCount).toBe(1)
})

test('Extend element with dataset parameters', () => {
  const div = document.createElement('div')
  const extendedDiv = extend(div, {
    dataset: {
      component: 'modal',
      target: '#dialog',
      dismissible: true,
    },
  })

  expect(extendedDiv.dataset.component).toBe('modal')
  expect(extendedDiv.dataset.target).toBe('#dialog')
  expect(extendedDiv.dataset.dismissible).toBe('true')
})

test('Extend element with styles parameters', () => {
  const div = document.createElement('div')
  const extendedDiv = extend(div, {
    styles: {
      padding: '10px',
      margin: '5px',
      borderRadius: '4px',
    },
  })

  expect(extendedDiv.style.padding).toBe('10px')
  expect(extendedDiv.style.margin).toBe('5px')
  expect(extendedDiv.style.borderRadius).toBe('4px')
})

test('Extend element with null/undefined event handlers', () => {
  const button = document.createElement('button')
  const extendedButton = extend(button, {
    events: {
      click: null,
      focus: undefined,
      valid: () => {}, // Valid handler should work
    },
  })

  // Should not throw errors and valid handler should be attached
  expect(() => {
    extendedButton.dispatchEvent(new Event('click'))
    extendedButton.dispatchEvent(new Event('focus'))
  }).not.toThrow()
})

test('Extend backward compatibility', () => {
  const div = document.createElement('div')
  const extended = extend(div, {
    className: ['test-class'],
    id: 'test-id',
    'aria-label': 'Test Label',
  })

  expect(extended.classList.contains('test-class')).toBe(true)
  expect(extended.id).toBe('test-id')
  expect(extended.getAttribute('aria-label')).toBe('Test Label')
})
