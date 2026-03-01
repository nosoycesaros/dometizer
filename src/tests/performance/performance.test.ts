/// <reference lib="dom" />
import create from '@functions/create'

test('Performance benchmark - event listener integration', () => {
  const iterations = 1000

  // Test traditional approach (separate operations)
  const startTraditional = performance.now()
  for (let i = 0; i < iterations; i++) {
    const element = create({ type: 'button', text: 'Test' })
    element.addEventListener('click', () => {})
    element.dataset.action = 'test'
    element.style.backgroundColor = 'blue'
  }
  const endTraditional = performance.now()

  // Test new integrated approach
  const startIntegrated = performance.now()
  for (let i = 0; i < iterations; i++) {
    const _element = create({
      type: 'button',
      text: 'Test',
      events: { click: () => {} },
      dataset: { action: 'test' },
      styles: { backgroundColor: 'blue' },
    })
  }
  const endIntegrated = performance.now()

  const traditionalTime = endTraditional - startTraditional
  const integratedTime = endIntegrated - startIntegrated

  console.log(`Traditional approach: ${traditionalTime}ms`)
  console.log(`Integrated approach: ${integratedTime}ms`)
  console.log(
    `Performance improvement: ${(((traditionalTime - integratedTime) / traditionalTime) * 100).toFixed(1)}%`
  )

  // Integrated approach should be at least as fast (allowing for some variance)
  expect(integratedTime).toBeLessThanOrEqual(traditionalTime * 1.2)
})

test('Performance regression check - simple cases', () => {
  const iterations = 1000

  // Test simple element creation using minimal parameters (should have no regression)
  // This tests the core path without events, dataset, or styles
  const start = performance.now()
  for (let i = 0; i < iterations; i++) {
    create({ type: 'div' }) // Minimal usage - just type
  }
  const end = performance.now()

  const timePerElement = (end - start) / iterations

  console.log(`Simple case performance: ${timePerElement.toFixed(4)}ms per element`)

  // Should be very fast for simple cases (under 0.5ms per element in most environments)
  // This ensures our new features don't add overhead when not used
  expect(timePerElement).toBeLessThan(0.5)
})
