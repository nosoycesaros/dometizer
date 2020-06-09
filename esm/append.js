function append(element, children) {
    const fragment = document.createDocumentFragment();
    children.forEach(child => fragment.appendChild(child));
    element.appendChild(fragment);
}

export default append;
