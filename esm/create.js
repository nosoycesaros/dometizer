const extend = require('./extend.js');

/**
 * Create an HTMLElement of a given type and gyven properties
 * 
 * @param {object} attributes 
 * @param {string} [attributes.type=div] Type of HTMLElement to be created. defaults to div
 */
function create({ type, ...attributes }) {
    const element = document.createElement(type ? type : 'div');

    return extend(element, attributes)
}

module.exports = create;
