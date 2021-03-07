const outsideContainerClass = 'ReactShadowDOMOutsideContainer'

export function getOutsideContainer(element: HTMLElement): Element {
  return element.getElementsByClassName(outsideContainerClass)[0]
}

export function createOutsideContainer(
  document: Document,
  element: HTMLElement
): Element {
  const container = document.createElement('div')
  container.setAttribute('class', outsideContainerClass)
  element.appendChild(container)
  return container
}
