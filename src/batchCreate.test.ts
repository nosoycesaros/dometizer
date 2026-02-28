/// <reference lib="dom" />
import batchCreate, { BatchMetrics } from './batchCreate'

describe('batchCreate', () => {
  // Test data for various scenarios
  const simpleData = [
    { name: 'Item 1', value: 1 },
    { name: 'Item 2', value: 2 },
    { name: 'Item 3', value: 3 },
  ]

  const largeData = Array.from({ length: 250 }, (_, i) => ({
    name: `Item ${i + 1}`,
    value: i + 1,
  }))

  test('basic functionality: data array to HTMLElement[] conversion', () => {
    const elements = batchCreate(simpleData, (item, index) => ({
      type: 'div',
      text: item.name,
      'data-value': item.value.toString(),
      'data-index': index.toString(),
    }))

    expect(elements).toHaveLength(3)
    expect(elements[0]).toBeInstanceOf(HTMLElement)
    expect(elements[0].tagName).toBe('DIV')
    expect(elements[0].textContent).toBe('Item 1')
    expect(elements[0].getAttribute('data-value')).toBe('1')
    expect(elements[0].getAttribute('data-index')).toBe('0')

    expect(elements[2].textContent).toBe('Item 3')
    expect(elements[2].getAttribute('data-value')).toBe('3')
    expect(elements[2].getAttribute('data-index')).toBe('2')
  })

  test('template function receives correct item and index parameters', () => {
    const templateCalls: Array<{ item: any; index: number }> = []

    batchCreate(simpleData, (item, index) => {
      templateCalls.push({ item, index })
      return { type: 'div' }
    })

    expect(templateCalls).toHaveLength(3)
    expect(templateCalls[0]).toEqual({ item: simpleData[0], index: 0 })
    expect(templateCalls[1]).toEqual({ item: simpleData[1], index: 1 })
    expect(templateCalls[2]).toEqual({ item: simpleData[2], index: 2 })
  })

  test('empty array handling and edge cases', () => {
    let templateCallCount = 0
    const templateMock = () => {
      templateCallCount++
      return { type: 'div' }
    }

    const elements = batchCreate([], templateMock)

    expect(elements).toHaveLength(0)
    expect(elements).toEqual([])
    expect(templateCallCount).toBe(0)
  })

  test('chunked processing with custom chunk sizes', () => {
    let progressCalls: Array<{ completed: number; total: number }> = []

    const elements = batchCreate(
      largeData,
      (item) => ({
        type: 'span',
        text: item.name,
      }),
      {
        chunkSize: 50,
        onProgress: (completed, total) => {
          progressCalls.push({ completed, total })
        },
      }
    )

    expect(elements).toHaveLength(250)

    // Should have progress calls for each chunk
    expect(progressCalls.length).toBeGreaterThan(0)
    expect(progressCalls[0]).toEqual({ completed: 50, total: 250 })

    // Last progress call should be completion
    const lastCall = progressCalls[progressCalls.length - 1]
    expect(lastCall).toEqual({ completed: 250, total: 250 })
  })

  test('container auto-append functionality', () => {
    const container = document.createElement('div')

    const elements = batchCreate(
      simpleData,
      (item) => ({
        type: 'p',
        text: item.name,
      }),
      {
        container,
      }
    )

    // Elements should be returned
    expect(elements).toHaveLength(3)

    // Elements should be appended to container
    expect(container.children).toHaveLength(3)
    expect(container.children[0].textContent).toBe('Item 1')
    expect(container.children[1].textContent).toBe('Item 2')
    expect(container.children[2].textContent).toBe('Item 3')

    // Returned elements should be the same as those in container
    expect(container.children[0]).toBe(elements[0])
    expect(container.children[1]).toBe(elements[1])
    expect(container.children[2]).toBe(elements[2])
  })

  test('performance metrics and callback execution', () => {
    let capturedMetrics: BatchMetrics | null = null

    const elements = batchCreate(
      simpleData,
      (item) => ({
        type: 'div',
        text: item.name,
      }),
      {
        onComplete: (metrics) => {
          capturedMetrics = metrics
        },
      }
    )

    expect(elements).toHaveLength(3)
    expect(capturedMetrics).not.toBeNull()
    expect(capturedMetrics!.elementsCreated).toBe(3)
    expect(capturedMetrics!.totalTime).toBeGreaterThan(0)
    expect(capturedMetrics!.averageTimePerElement).toBeGreaterThan(0)
    expect(capturedMetrics!.averageTimePerElement).toBe(capturedMetrics!.totalTime / 3)
  })

  test('TypeScript type inference and compatibility', () => {
    interface TestItem {
      id: number
      title: string
      active: boolean
    }

    const typedData: TestItem[] = [
      { id: 1, title: 'First', active: true },
      { id: 2, title: 'Second', active: false },
    ]

    // This test ensures TypeScript type inference works correctly
    const elements = batchCreate(typedData, (item, index) => ({
      type: 'article',
      id: `item-${item.id}`, // item.id should be inferred as number
      text: item.title, // item.title should be inferred as string
      className: item.active ? ['active'] : ['inactive'], // item.active should be inferred as boolean
      'data-index': index.toString(),
    }))

    expect(elements).toHaveLength(2)
    expect(elements[0].id).toBe('item-1')
    expect(elements[0].textContent).toBe('First')
    expect(elements[0].classList.contains('active')).toBe(true)

    expect(elements[1].id).toBe('item-2')
    expect(elements[1].textContent).toBe('Second')
    expect(elements[1].classList.contains('inactive')).toBe(true)
  })

  test('error handling: template function errors do not stop batch processing', () => {
    const originalConsoleError = console.error
    const errorCalls: any[] = []
    console.error = (...args: any[]) => {
      errorCalls.push(args)
    }

    const mixedData = [
      { name: 'Good 1', value: 1 },
      { name: null, value: 2 }, // This will cause template error
      { name: 'Good 3', value: 3 },
    ]

    const elements = batchCreate(mixedData, (item) => {
      if (item.name === null) {
        throw new Error('Name cannot be null')
      }
      return {
        type: 'div',
        text: item.name,
      }
    })

    // Should continue processing despite error
    expect(elements).toHaveLength(2) // Only successful elements
    expect(elements[0].textContent).toBe('Good 1')
    expect(elements[1].textContent).toBe('Good 3')

    // Should log error
    expect(errorCalls).toHaveLength(1)
    expect(errorCalls[0][0]).toBe('batchCreate: Template function failed for item at index 1:')
    expect(errorCalls[0][1]).toBeInstanceOf(Error)
    expect(errorCalls[0][1].message).toBe('Name cannot be null')

    console.error = originalConsoleError
  })

  test('options validation: invalid chunk size falls back to default', () => {
    let progressCallCount = 0

    batchCreate(largeData, (_item) => ({ type: 'div' }), {
      chunkSize: -5, // Invalid chunk size - should fallback to minimum of 1
      onProgress: () => {
        progressCallCount++
      },
    })

    // Invalid chunk size becomes 1, so we expect 250 progress calls (one per element)
    expect(progressCallCount).toBe(250)
  })

  test('options validation: non-function callbacks are ignored', () => {
    const elements = batchCreate(
      simpleData,
      (item) => ({
        type: 'div',
        text: item.name,
      }),
      {
        onProgress: 'not a function' as any,
        onComplete: 123 as any,
      }
    )

    // Should complete without errors despite invalid callbacks
    expect(elements).toHaveLength(3)
  })

  test('metrics calculation when no elements are created (all template calls fail)', () => {
    const originalConsoleError = console.error
    const errorCalls: any[] = []
    console.error = (...args: any[]) => {
      errorCalls.push(args)
    }

    let capturedMetrics: BatchMetrics | null = null

    const elements = batchCreate(
      simpleData,
      () => {
        throw new Error('Template always fails')
      },
      {
        onComplete: (metrics) => {
          capturedMetrics = metrics
        },
      }
    )

    // No elements should be created
    expect(elements).toHaveLength(0)
    expect(capturedMetrics).not.toBeNull()
    expect(capturedMetrics!.elementsCreated).toBe(0)
    expect(capturedMetrics!.totalTime).toBeGreaterThan(0)

    // This is the key test - averageTimePerElement should be 0, not Infinity/NaN
    expect(capturedMetrics!.averageTimePerElement).toBe(0)
    expect(Number.isFinite(capturedMetrics!.averageTimePerElement)).toBe(true)

    // Verify error logging occurred
    expect(errorCalls).toHaveLength(3) // One for each item that failed

    console.error = originalConsoleError
  })
})
