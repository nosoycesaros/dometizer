/**
 * Append an array of HTMLElements to a given container
 * 
 * @param {HTMLElement} container Container element to append items
 * @param {Array<HTMLElement>} children List of HTMLElements to append to the container
 */
export default function append(container: HTMLElement, children: Array<HTMLElement | DocumentFragment>) {
    const fragment: DocumentFragment = document.createDocumentFragment();

    children.forEach(child => fragment.appendChild(child));
    container.appendChild(fragment);
}