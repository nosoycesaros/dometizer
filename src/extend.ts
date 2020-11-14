import append from './append'

export interface Attributes {
  type?: string,
  className?: Array<string>,
  children?: Array<HTMLElement>,
  text?: string,
  id?: string,
  [rest: string]: any
}

const attributeDefaults: Attributes = {
  className: [],
  children: [],
  text: undefined
}

/**
 * Extends an HTMLElement with given attributes in second parameter
 * 
 * @param {HTMLElement} element element to be extended
 * @param {object} attributes list of attributes to extend
 * @param {array} [attributes.className = []] List of classes to add to the given element
 * @param {array} [attributes.children = []] List of HTMLElements to append as children of given element
 */
export default function extend(element: HTMLElement, attributes: Attributes) {
  const { className, children, text, ...rest } = { ...attributeDefaults, ...attributes }

  const newElement: HTMLElement = <HTMLElement>element.cloneNode(true)
  const textNode: DocumentFragment[] = text !== undefined ? [document.createRange().createContextualFragment(text)] : []

  newElement.classList.add(...className)
  append(newElement, [...textNode, ...children])

  Object.entries(rest).forEach(attr => { newElement.setAttribute(attr[0], attr[1]) })

  return newElement
}