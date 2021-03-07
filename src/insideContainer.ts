const insideContainerClass = 'ReactShadowDOMInsideContainer'

export function createInsideContainer(
  document: Document,
  shadow: ShadowRoot
): Element {
  const insideContainer = document.createElement('div')

  insideContainer.setAttribute('class', insideContainerClass)
  shadow.appendChild(insideContainer)

  return insideContainer
}
