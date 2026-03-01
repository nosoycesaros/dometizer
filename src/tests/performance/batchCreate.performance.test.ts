/// <reference lib="dom" />
import batchCreate from '@functions/batchCreate'
import create from '@functions/create'

describe('batchCreate Performance Benchmarks', () => {
  // Generate test data of various sizes
  const generateTestData = (size: number) =>
    Array.from({ length: size }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      category: `Category ${(i % 5) + 1}`,
      active: i % 2 === 0,
    }))

  test('performance comparison against individual create() calls', () => {
    const testSizes = [10, 100, 1000]
    const results: Array<{
      size: number
      batchTime: number
      individualTime: number
      improvement: number
    }> = []

    testSizes.forEach((size) => {
      const data = generateTestData(size)
      const template = (item: any, index: number) => ({
        type: 'div',
        className: ['item', item.active ? 'active' : 'inactive'],
        text: item.name,
        id: `item-${item.id}`,
        'data-category': item.category,
        'data-index': index.toString(),
      })

      // Test batchCreate performance
      const batchStart = performance.now()
      const batchElements = batchCreate(data, template)
      const batchEnd = performance.now()
      const batchTime = batchEnd - batchStart

      // Test individual create() calls performance
      const individualStart = performance.now()
      const individualElements = data.map((item, index) => create(template(item, index)))
      const individualEnd = performance.now()
      const individualTime = individualEnd - individualStart

      const improvement = individualTime / batchTime

      results.push({ size, batchTime, individualTime, improvement })

      // Verify both methods create same number of elements
      expect(batchElements).toHaveLength(size)
      expect(individualElements).toHaveLength(size)

      // Log results for manual inspection
      console.log(
        `Size ${size}: batchCreate: ${batchTime.toFixed(2)}ms, individual: ${individualTime.toFixed(2)}ms, improvement: ${improvement.toFixed(2)}x`
      )
    })

    // For larger datasets, batchCreate should be faster or at least comparable
    const largestTest = results[results.length - 1]
    expect(largestTest.improvement).toBeGreaterThanOrEqual(0.8) // At least 80% of individual performance
  })

  test('benchmark with various data sizes (10, 100, 1000, 10000 elements)', () => {
    const sizes = [10, 100, 1000, 10000]
    const benchmarkResults: Array<{
      size: number
      time: number
      elementsPerMs: number
      avgTimePerElement: number
    }> = []

    sizes.forEach((size) => {
      const data = generateTestData(size)
      let totalTime = 0
      let elementsCreated = 0

      const elements = batchCreate(
        data,
        (item, index) => ({
          type: 'article',
          className: ['benchmark-item'],
          children: [
            create({ type: 'h3', text: item.name }),
            create({ type: 'p', text: `Category: ${item.category}` }),
            create({ type: 'span', text: `Index: ${index}` }),
          ],
        }),
        {
          onComplete: (metrics) => {
            totalTime = metrics.totalTime
            elementsCreated = metrics.elementsCreated
          },
        }
      )

      const elementsPerMs = elementsCreated / totalTime
      const avgTimePerElement = totalTime / elementsCreated

      benchmarkResults.push({
        size,
        time: totalTime,
        elementsPerMs,
        avgTimePerElement,
      })

      // Verify elements were created correctly
      expect(elements).toHaveLength(size)
      expect(elements[0].tagName).toBe('ARTICLE')
      expect(elements[0].children).toHaveLength(3) // h3, p, span

      console.log(
        `Size ${size}: ${totalTime.toFixed(2)}ms total, ${elementsPerMs.toFixed(2)} elements/ms, ${avgTimePerElement.toFixed(4)}ms per element`
      )
    })

    // Performance should scale reasonably - larger datasets shouldn't have drastically worse per-element performance
    const small = benchmarkResults[0] // 10 elements
    const large = benchmarkResults[benchmarkResults.length - 1] // 10000 elements

    // Large dataset per-element time shouldn't be more than 10x slower than small dataset
    expect(large.avgTimePerElement).toBeLessThan(small.avgTimePerElement * 10)
  })

  test('measure DOM reflow impact and DocumentFragment effectiveness', () => {
    const data = generateTestData(500)
    const container = document.createElement('div')
    document.body.appendChild(container)

    // Track only real DOM updates (container appendChild with DocumentFragment)
    let realDOMUpdates = 0
    const originalAppendChild = container.appendChild
    container.appendChild = function (this: HTMLElement, child: Node) {
      if (child instanceof DocumentFragment) {
        realDOMUpdates++
      }
      return originalAppendChild.call(this, child)
    }

    const start = performance.now()
    const elements = batchCreate(
      data,
      (item) => ({
        type: 'div',
        text: item.name,
        className: ['test-item'],
      }),
      {
        container,
        chunkSize: 100, // Should result in 5 chunks for 500 elements
      }
    )
    const end = performance.now()

    // Verify elements were created and appended
    expect(elements).toHaveLength(500)
    expect(container.children).toHaveLength(500)

    // With chunked processing, we should have 5 DocumentFragment appends to container
    // (500 elements / 100 chunk size = 5 chunks)
    expect(realDOMUpdates).toBe(5)

    console.log(`Real DOM updates for 500 elements: ${realDOMUpdates} (DocumentFragment chunks)`)
    console.log(`Total time with DOM append: ${(end - start).toFixed(2)}ms`)

    // Clean up
    document.body.removeChild(container)
  })

  test('verify performance characteristics for large datasets', () => {
    const largeData = generateTestData(2000)
    const template = (item: any, index: number) => ({
      type: 'div',
      className: ['large-item'],
      text: `${item.name} - ${item.category}`,
      'data-id': item.id.toString(),
      'data-index': index.toString(),
    })

    // Test batchCreate
    const batchStart = performance.now()
    const batchElements = batchCreate(largeData, template, {
      chunkSize: 200, // Reasonable chunk size
    })
    const batchEnd = performance.now()
    const batchTime = batchEnd - batchStart

    // Test individual create calls (simulating non-batch approach)
    const individualStart = performance.now()
    const individualElements: HTMLElement[] = []
    for (let i = 0; i < largeData.length; i++) {
      const element = create(template(largeData[i], i))
      individualElements.push(element)
    }
    const individualEnd = performance.now()
    const individualTime = individualEnd - individualStart

    const performanceRatio = individualTime / batchTime

    console.log(`Large dataset (2000 elements):`)
    console.log(`  batchCreate: ${batchTime.toFixed(2)}ms`)
    console.log(`  individual creates: ${individualTime.toFixed(2)}ms`)
    console.log(`  Performance ratio: ${performanceRatio.toFixed(2)}x`)

    // Verify both approaches create same elements
    expect(batchElements).toHaveLength(2000)
    expect(individualElements).toHaveLength(2000)

    // batchCreate should be competitive (not significantly slower)
    // In test environment, we don't see DOM rendering benefits, so we test for reasonable performance
    expect(batchTime).toBeLessThan(individualTime * 3) // No more than 3x slower

    // Elements should be properly created
    expect(batchElements[0].tagName).toBe('DIV')
    expect(batchElements[0].classList.contains('large-item')).toBe(true)
  })

  test('memory usage patterns with chunked processing', () => {
    const hugeData = generateTestData(5000)
    const memoryResults: Array<{ chunkSize: number; time: number; completed: boolean }> = []

    // Test different chunk sizes to see memory impact
    const chunkSizes = [50, 100, 500, 1000]

    chunkSizes.forEach((chunkSize) => {
      const start = performance.now()
      let completed = false

      try {
        const elements = batchCreate(
          hugeData,
          (item) => ({
            type: 'div',
            text: item.name,
            className: ['memory-test'],
          }),
          {
            chunkSize,
            onComplete: () => {
              completed = true
            },
          }
        )

        const end = performance.now()
        const time = end - start

        expect(elements).toHaveLength(5000)
        expect(completed).toBe(true)

        memoryResults.push({ chunkSize, time, completed })

        console.log(`Chunk size ${chunkSize}: ${time.toFixed(2)}ms`)
      } catch (error) {
        memoryResults.push({ chunkSize, time: -1, completed: false })
        console.log(`Chunk size ${chunkSize}: FAILED - ${error}`)
      }
    })

    // All chunk sizes should complete successfully
    memoryResults.forEach((result) => {
      expect(result.completed).toBe(true)
      expect(result.time).toBeGreaterThan(0)
    })

    // Performance should be reasonable across different chunk sizes
    const times = memoryResults.map((r) => r.time)
    const minTime = Math.min(...times)
    const maxTime = Math.max(...times)

    // Worst case shouldn't be more than 3x slower than best case
    expect(maxTime / minTime).toBeLessThan(3)
  })
})
