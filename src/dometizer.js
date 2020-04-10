import { createParser } from 'scalpel';

class DOMetizer {
  constructor() {
    this.parser = createParser()
  }

  create({ type, className = [], children = [], text, ...attributes }) {
    const element = document.createElement(type ? type : 'div')
    const textNode = text ? [document.createTextNode(text)] : []

    element.classList.add(...className)
    this.append(element, [...textNode, ...children])

    Object.entries(attributes).forEach(attr => element.setAttribute(attr[0], attr[1]))

    return element
  }

  parseSelector(selector) {
    const parsed = this.parser.parse(selector)[0].body

    const a = parsed.slice().reduce((acc, prop) => {
      if (acc.hasOwnProperty(prop.type)) {
        acc[prop.type].push(prop.name)
      } else {
        acc[prop.type] = [prop.name]
      }

      console.log(acc)

      return acc
    }, {})

    return parsed
  }

  createWithSelector(selector) {
    const attributes = {}

    console.log( this.parseSelector(selector) )

    // parsed.forEach(property => {
    //   attributes.type = property.typeSelector
    // })

  }

  append(element, children) {
    children.forEach(child => element.appendChild(child))
  }
}

const o = new DOMetizer()

export default o