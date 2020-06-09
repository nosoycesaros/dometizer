'use strict';

require('./append.js');
var extend = require('./extend.js');

function create({ type, ...attributes }) {
    const element = document.createElement(type ? type : 'div');

    return extend(element, attributes)
}

module.exports = create;
