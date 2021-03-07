const outsideContainerClass = 'ReactShadowDOMOutsideContainer'

export function getOutsideContainer(element: HTMLElement): Element {
  return element.getElementsByClassName(outsideContainerClass)[0]
}

interface createOutsideContainerParameters {
  document: Document,
  element: HTMLElement,
  styles: string
}

export function createOutsideContainer({
  document,
  element,
  styles
}: createOutsideContainerParameters): Element {
  const container = document.createElement('div')
  container.setAttribute('class', outsideContainerClass)
  container.setAttribute('style', styles.trim())
  element.appendChild(container)
  return container
}
