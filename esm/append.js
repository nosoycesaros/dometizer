/**
 * Append an array of HTMLElements to a given container
 * 
 * @param {HTMLElement} container Container element to append items
 * @param {Array<HTMLElement>} children List of HTMLElements to append to the container
 */
function append(container, children) {
    const fragment = document.createDocumentFragment();
    children.forEach(child => fragment.appendChild(child));
    container.appendChild(fragment);
}

module.exports = append;
