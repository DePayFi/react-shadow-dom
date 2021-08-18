const insideContainerClass = 'ReactShadowDOMInsideContainer'

function createInsideContainer({ document, shadow, style }) {
  const container = document.createElement('div')
  container.setAttribute('class', insideContainerClass)
  shadow.appendChild(container)

  if (style && style.length) {
    const styleElement = document.createElement('style')
    styleElement.type = 'text/css'
    styleElement.appendChild(document.createTextNode(style))
    shadow.appendChild(styleElement)
  }

  return container
}

export { createInsideContainer }
