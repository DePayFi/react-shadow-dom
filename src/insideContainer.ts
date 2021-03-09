const insideContainerClass = 'ReactShadowDOMInsideContainer'

interface createInsideContainerParameters {
  document: Document
  shadow: ShadowRoot
  style: string
}

export function createInsideContainer({
  document,
  shadow,
  style,
}: createInsideContainerParameters): Element {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(style))
  shadow.appendChild(styleElement)

  const container = document.createElement('div')
  container.setAttribute('class', insideContainerClass)
  shadow.appendChild(container)

  return container
}
