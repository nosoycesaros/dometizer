export default class DOMetizer {
  constructor({ type, className = [], children = [], text, ...attributes }) {
      this.element = document.createElement(type ? type : 'div')
      this.element.classList.add(...className)
      const textNode = text ? [document.createTextNode(text)] : []
      this.append([...textNode, ...children])
      Object.entries(attributes).forEach(attr => this.element.setAttribute(attr[0], attr[1]))
  }

  append(children) {
      children.forEach(child => this.element.appendChild(child))
  }
}