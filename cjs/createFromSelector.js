'use strict';

require('./append.js');
require('./extend.js');
var create = require('./create.js');
var scalpel = require('scalpel');

function parseSelector(selector) {
  const parser = scalpel.createParser();
  const parsed = parser.parse(selector)[0].body;
  const processed = parsed.slice().reduce((acc, prop) => {
    if (acc.hasOwnProperty(prop.type)) {
      acc[prop.type].push(prop.name);
    } else {
      acc[prop.type] = [prop.name];
    }

    return acc
  }, {});

  return processed
}

function createFromSelector(selector) {
  const attributes = parseSelector(selector);

  return create({
    type: attributes.typeSelector[0],
    className: attributes.classSelector,
    id: attributes.idSelector[0]
  })
}

module.exports = createFromSelector;
