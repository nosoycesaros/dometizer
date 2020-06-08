import { createParser } from 'scalpel'

function create({ type, ...attributes }) {
  const element = document.createElement(type ? type : 'div')

  return extend(element, attributes)
}

function parseSelector(selector) {
  const parser = createParser()
  const parsed = parser.parse(selector)[0].body
  const processed = parsed.slice().reduce((acc, prop) => {
    if (acc.hasOwnProperty(prop.type)) {
      acc[prop.type].push(prop.name)
    } else {
      acc[prop.type] = [prop.name]
    }

    return acc
  }, {})

  return processed
}

function createFromSelector(selector) {
  const attributes = parseSelector(selector)

  return create({
    type: attributes.typeSelector[0],
    className: attributes.classSelector,
    id: attributes.idSelector[0]
  })
}

function append(element, children) {
  const fragment = document.createDocumentFragment()
  children.forEach(child => fragment.appendChild(child))
  element.appendChild(fragment)
}

function extend(element, { className = [], children =[], text, ...attributes }) {
  const newElement = element.cloneNode(true)
  const textNode = text ? [document.createTextNode(text)] : []

  newElement.classList.add(...className)
  append(newElement, [...textNode, ...children])

  Object.entries(attributes).forEach(attr => newElement.setAttribute(attr[0], attr[1]))

  return newElement
}

export {
  create,
  createFromSelector,
  append,
  extend
}