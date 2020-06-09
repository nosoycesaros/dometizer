import extend from './extend'

export default function create({ type, ...attributes }) {
    const element = document.createElement(type ? type : 'div')

    return extend(element, attributes)
}