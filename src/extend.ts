import append from './append'

export interface EventHandlers {
  [event: string]: ((event: Event) => void) | null | undefined
}

export interface DataAttributes {
  [key: string]: string | number | boolean | null | undefined
}

export interface StyleProperties {
  [property: string]: string | number | null | undefined
}

export interface Attributes {
  type?: string
  className?: Array<string>
  children?: Array<HTMLElement>
  text?: string
  id?: string
  events?: EventHandlers
  dataset?: DataAttributes
  styles?: StyleProperties
  [rest: string]: any
}

const attributeDefaults: Attributes = {
  className: [],
  children: [],
  events: {},
  dataset: {},
  styles: {},
}

/**
 * Extends an HTMLElement with given attributes in second parameter
 *
 * @param {HTMLElement} element element to be extended
 * @param {object} attributes list of attributes to extend
 * @param {array} [attributes.className = []] List of classes to add to the given element
 * @param {array} [attributes.children = []] List of HTMLElements to append as children of given element
 * @param {string} [attributes.text] Text content for the element
 * @param {string} [attributes.id] ID attribute for the element
 * @param {Object} [attributes.events={}] Event listeners to attach (e.g., { click: handler, focus: handler })
 * @param {Object} [attributes.dataset={}] Data attributes to set (e.g., { action: 'submit', toggle: 'modal' })
 * @param {Object} [attributes.styles={}] CSS styles to apply (e.g., { color: 'red', fontSize: '16px' })
 *
 * @example
 * // Basic usage
 * extend(myButton, { className: ['active'], text: 'Updated Text' })
 *
 * @example
 * // With event listeners
 * extend(myInput, {
 *   events: {
 *     focus: (e) => console.log('Input focused'),
 *     blur: (e) => console.log('Input blurred')
 *   }
 * })
 *
 * @example
 * // With dataset and styles
 * extend(myDiv, {
 *   dataset: { status: 'active', count: '42' },
 *   styles: { borderColor: 'green', opacity: '0.9' }
 * })
 */
export default function extend(element: HTMLElement, attributes: Attributes) {
  const { className, children, text, events, dataset, styles, ...rest } = {
    ...attributeDefaults,
    ...attributes,
  }

  const newElement: HTMLElement = <HTMLElement>element.cloneNode(true)
  const textNode: DocumentFragment[] =
    text !== undefined ? [document.createRange().createContextualFragment(text)] : []

  newElement.classList.add(...(className || []))
  append(newElement, [...textNode, ...(children || [])])

  // Handle events parameter
  if (events) {
    Object.entries(events).forEach(([event, handler]) => {
      if (typeof handler === 'function') {
        newElement.addEventListener(event, handler)
      }
    })
  }

  // Handle dataset parameter
  if (dataset) {
    Object.entries(dataset).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        newElement.dataset[key] = String(value)
      }
    })
  }

  // Handle styles parameter
  if (styles) {
    Object.entries(styles).forEach(([property, value]) => {
      if (value !== null && value !== undefined) {
        ;(newElement.style as any)[property] = value
      }
    })
  }

  // Handle remaining attributes with null/undefined filtering
  Object.entries(rest).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      newElement.setAttribute(key, value)
    }
  })

  return newElement
}
