const outsideContainerClass = 'ReactShadowDOMOutsideContainer'

export function getOutsideContainer(element: HTMLElement): Element {
  return element.getElementsByClassName(outsideContainerClass)[0]
}

interface createOutsideContainerParameters {
  document: Document
  element: HTMLElement
  style: string
}

export function createOutsideContainer({
  document,
  element,
  style,
}: createOutsideContainerParameters): Element {
  const container = document.createElement('div')
  container.setAttribute('class', outsideContainerClass)
  container.setAttribute('style', style)
  element.appendChild(container)
  return container
}
