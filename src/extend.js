const append = require('./append')

function extend(element, { className = [], children = [], text, ...attributes }) {
  const newElement = element.cloneNode(true)
  const textNode = text ? [document.createTextNode(text)] : []

  newElement.classList.add(...className)
  append(newElement, [...textNode, ...children])

  Object.entries(attributes).forEach(attr => newElement.setAttribute(attr[0], attr[1]))

  return newElement
}

module.exports = extend