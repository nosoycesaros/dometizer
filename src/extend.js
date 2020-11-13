const append = require('./append')

/**
 * Extends an HTMLElement with given attributes in second parameter
 * 
 * @param {HTMLElement} element element to be extended
 * @param {object} attributes list of attributes to extend
 * @param {array} [attributes.className = []] List of classes to add to the given element
 * @param {array} [attributes.children = []] List of HTMLElements to append as children of given element
 */
function extend(element, { className = [], children = [], text, ...attributes }) {
  const newElement = element.cloneNode(true)
  const textNode = text ? [document.createTextNode(text)] : []

  newElement.classList.add(...className)
  append(newElement, [...textNode, ...children])

  Object.entries(attributes).forEach(attr => newElement.setAttribute(attr[0], attr[1]))

  return newElement
}

module.exports = extend