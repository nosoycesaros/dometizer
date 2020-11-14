import extend, { Attributes } from './extend'

const attributeDefaults: Attributes = {
    type: 'div'
}

/**
 * Create an HTMLElement of a given type and gyven properties
 * 
 * @param {object} attributes 
 * @param {string} [attributes.type=div] Type of HTMLElement to be created. defaults to div
 */
export default function create(attributes: Attributes) {
    const { type, ...rest } = { ...attributeDefaults, ...attributes }
    const element = document.createElement(type ? type : 'div');

    return extend(element, rest)
}