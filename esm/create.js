import './append.js';
import extend from './extend.js';

function create({ type, ...attributes }) {
    const element = document.createElement(type ? type : 'div');

    return extend(element, attributes)
}

export default create;
