const { createParser } = require('scalpel')
const create = require('./create')

/**
 * Parse a Selector to a useful format for Dometizer
 * @param {string} selector 
 */
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

/**
 * Use a given selector to create an element with different properties in it
 * @param {string} selector given selector to create an object
 */
function createFromSelector(selector) {
  const attributes = parseSelector(selector)

  return create({
    type: attributes.typeSelector[0],
    className: attributes.classSelector,
    id: attributes.idSelector[0]
  })
}

module.exports = createFromSelector