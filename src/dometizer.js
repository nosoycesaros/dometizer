import { createParser } from 'scalpel';

class DOMetizer {
  constructor() {
    this.parser = createParser()
  }

  create({ type, ...attributes }) {
    const element = document.createElement(type ? type : 'div')

    return this.extend(element, attributes)
  }

  parseSelector(selector) {
    const parsed = this.parser.parse(selector)[0].body
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

  createWithSelector(selector) {
    const attributes = this.parseSelector(selector)

    return this.create({
      type: attributes.typeSelector[0],
      className: attributes.classSelector,
      id: attributes.idSelector[0]
    })
  }

  append(element, children) {
    children.forEach(child => element.appendChild(child))
  }

  extend(element, { className = [], children = [], text, ...attributes }) {
    const textNode = text ? [document.createTextNode(text)] : []

    element.classList.add(...className)
    this.append(element, [...textNode, ...children])

    Object.entries(attributes).forEach(attr => element.setAttribute(attr[0], attr[1]))

    return element
  }
}

const o = new DOMetizer()

export default o