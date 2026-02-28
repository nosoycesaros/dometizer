import extend, { Attributes } from './extend'

const attributeDefaults: Attributes = {
  type: 'div',
}

/**
 * Create an HTMLElement of a given type and given properties
 *
 * @param {object} attributes
 * @param {string} [attributes.type=div] Type of HTMLElement to be created. defaults to div
 * @param {Array<string>} [attributes.className=[]] List of CSS classes to add to the element
 * @param {string} [attributes.text] Text content for the element
 * @param {string} [attributes.id] ID attribute for the element
 * @param {Array<HTMLElement>} [attributes.children=[]] Child elements to append
 * @param {Object} [attributes.events={}] Event listeners to attach (e.g., { click: handler, mouseover: handler })
 * @param {Object} [attributes.dataset={}] Data attributes to set (e.g., { action: 'submit', target: '#form' })
 * @param {Object} [attributes.styles={}] CSS styles to apply (e.g., { backgroundColor: 'blue', width: '100px' })
 *
 * @example
 * // Basic usage
 * create({ type: 'button', text: 'Click me', className: ['btn', 'btn-primary'] })
 *
 * @example
 * // With event listeners
 * create({
 *   type: 'button',
 *   text: 'Interactive Button',
 *   events: {
 *     click: (e) => console.log('Clicked!'),
 *     mouseover: (e) => console.log('Hovered!')
 *   }
 * })
 *
 * @example
 * // With dataset and styles
 * create({
 *   type: 'div',
 *   text: 'Styled Component',
 *   dataset: { component: 'modal', target: '#dialog' },
 *   styles: { padding: '20px', backgroundColor: 'lightblue' }
 * })
 */
export default function create(attributes: Attributes) {
  const { type, ...rest } = { ...attributeDefaults, ...attributes }
  const element = document.createElement(type ? type : 'div')

  return extend(element, rest)
}
