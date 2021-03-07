const insideContainerClass = 'ReactShadowDOMInsideContainer'

interface createInsideContainerParameters {
  document: Document,
  shadow: ShadowRoot,
  style: string
}

export function createInsideContainer({
  document,
  shadow,
  style
}: createInsideContainerParameters): Element {
  const container = document.createElement('div')

  container.setAttribute('class', insideContainerClass)
  container.setAttribute('style', style)
  shadow.appendChild(container)

  return container
}
