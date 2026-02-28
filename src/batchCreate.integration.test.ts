/// <reference lib="dom" />
import batchCreate from './batchCreate'
import append from './append'
import create from './create'
import extend from './extend'

describe('batchCreate Integration', () => {
  test('integration with existing append() function', () => {
    const container = document.createElement('div')
    const data = [
      { name: 'Card 1', active: true },
      { name: 'Card 2', active: false },
      { name: 'Card 3', active: true },
    ]

    // Create elements with batchCreate
    const cards = batchCreate(data, (item, index) => ({
      type: 'article',
      className: ['card', item.active ? 'active' : 'inactive'],
      text: item.name,
      id: `card-${index}`,
    }))

    // Use existing append() function to add them to container
    append(container, cards)

    // Verify integration works correctly
    expect(container.children).toHaveLength(3)
    expect(container.children[0].tagName).toBe('ARTICLE')
    expect(container.children[0].classList.contains('card')).toBe(true)
    expect(container.children[0].classList.contains('active')).toBe(true)
    expect(container.children[1].classList.contains('inactive')).toBe(true)

    // Verify DocumentFragment optimization is preserved in append()
    expect(container.children[0].textContent).toBe('Card 1')
    expect(container.children[2].textContent).toBe('Card 3')
  })

  test('integration with create() function for nested structures', () => {
    const data = [
      { title: 'Article 1', content: 'Content 1', tags: ['tag1', 'tag2'] },
      { title: 'Article 2', content: 'Content 2', tags: ['tag3'] },
    ]

    const articles = batchCreate(data, (item) => ({
      type: 'article',
      className: ['blog-post'],
      children: [
        // Use create() function within batchCreate template
        create({ type: 'h2', text: item.title, className: ['title'] }),
        create({
          type: 'div',
          className: ['content'],
          text: item.content,
        }),
        create({
          type: 'div',
          className: ['tags'],
          children: item.tags.map((tag) => create({ type: 'span', text: tag, className: ['tag'] })),
        }),
      ],
    }))

    expect(articles).toHaveLength(2)

    // Verify nested structure created with create()
    const firstArticle = articles[0]
    expect(firstArticle.children).toHaveLength(3)
    expect(firstArticle.children[0].tagName).toBe('H2')
    expect(firstArticle.children[0].textContent).toBe('Article 1')
    expect(firstArticle.children[2].children).toHaveLength(2) // 2 tags

    // Verify nested tags
    const tagsContainer = firstArticle.children[2]
    expect(tagsContainer.children[0].textContent).toBe('tag1')
    expect(tagsContainer.children[1].textContent).toBe('tag2')
  })

  test('integration with extend() function', () => {
    const baseElements = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
    ]

    const data = [
      { name: 'Enhanced 1', color: 'red' },
      { name: 'Enhanced 2', color: 'blue' },
      { name: 'Enhanced 3', color: 'green' },
    ]

    // Use batchCreate with existing elements enhanced via extend()
    const enhancedElements = batchCreate(data, (item, index) => {
      const baseElement = baseElements[index]
      // Use extend() to enhance the base element
      return {
        type: 'div', // This will create a new element, but we can test the pattern
        className: ['enhanced'],
        text: item.name,
        styles: { color: item.color },
        children: [extend(baseElement, { className: ['base'] })],
      }
    })

    expect(enhancedElements).toHaveLength(3)
    expect(enhancedElements[0].classList.contains('enhanced')).toBe(true)
    expect(enhancedElements[0].style.color).toBe('red')
    expect(enhancedElements[0].children[0].classList.contains('base')).toBe(true)
  })

  test('chaining batchCreate operations', () => {
    const primaryData = [
      { name: 'Section 1', items: ['Item 1.1', 'Item 1.2'] },
      { name: 'Section 2', items: ['Item 2.1', 'Item 2.2', 'Item 2.3'] },
    ]

    const sections = batchCreate(primaryData, (section) => ({
      type: 'section',
      className: ['section'],
      children: [
        create({ type: 'h3', text: section.name }),
        // Chain another batchCreate operation
        ...batchCreate(section.items, (item) => ({
          type: 'p',
          text: item,
          className: ['item'],
        })),
      ],
    }))

    expect(sections).toHaveLength(2)

    // First section should have h3 + 2 paragraphs
    expect(sections[0].children).toHaveLength(3)
    expect(sections[0].children[0].tagName).toBe('H3')
    expect(sections[0].children[1].tagName).toBe('P')
    expect(sections[0].children[2].tagName).toBe('P')

    // Second section should have h3 + 3 paragraphs
    expect(sections[1].children).toHaveLength(4)
    expect(sections[1].children[3].textContent).toBe('Item 2.3')
  })

  test('mixed operations with container auto-append', () => {
    const container = document.createElement('div')
    const data = [
      { type: 'header', text: 'Header' },
      { type: 'main', text: 'Main Content' },
      { type: 'footer', text: 'Footer' },
    ]

    // Use batchCreate with container auto-append
    const elements = batchCreate(
      data,
      (item) => ({
        type: item.type,
        text: item.text,
        className: ['layout-element'],
      }),
      {
        container, // Auto-append to container
      }
    )

    // Elements should be returned AND appended to container
    expect(elements).toHaveLength(3)
    expect(container.children).toHaveLength(3)

    // Verify they're the same elements
    expect(container.children[0]).toBe(elements[0])
    expect(container.children[1]).toBe(elements[1])
    expect(container.children[2]).toBe(elements[2])

    // Now add more elements using regular append
    const additionalElements = [create({ type: 'aside', text: 'Sidebar', className: ['sidebar'] })]

    append(container, additionalElements)

    // Container should now have 4 elements total
    expect(container.children).toHaveLength(4)
    expect(container.children[3].tagName).toBe('ASIDE')
  })

  test('performance consistency with mixed operations', () => {
    const largeData = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }))

    let totalTime = 0

    const elements = batchCreate(
      largeData,
      (item) => ({
        type: 'div',
        className: ['performance-test'],
        children: [
          // Mix in create() calls
          create({ type: 'span', text: item.name }),
          create({ type: 'small', text: `#${item.id}` }),
        ],
      }),
      {
        onComplete: (metrics) => {
          totalTime = metrics.totalTime
        },
      }
    )

    // Should complete in reasonable time despite mixed operations
    expect(elements).toHaveLength(1000)
    expect(totalTime).toBeGreaterThan(0)
    expect(totalTime).toBeLessThan(1000) // Should be under 1 second

    // Verify nested structure was created correctly
    expect(elements[0].children).toHaveLength(2)
    expect(elements[0].children[0].tagName).toBe('SPAN')
    expect(elements[0].children[1].tagName).toBe('SMALL')
  })
})
