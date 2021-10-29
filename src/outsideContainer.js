const outsideContainerClass = 'ReactShadowDOMOutsideContainer'

function createOutsideContainer({ document, element, style }) {
  const container = document.createElement('div')
  container.setAttribute('class', outsideContainerClass)
  container.setAttribute('style', style)
  element.appendChild(container)
  return container
}

export { createOutsideContainer }
