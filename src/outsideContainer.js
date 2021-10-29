const outsideContainerClass = 'ReactShadowDOMOutsideContainer'
let currentContainer

function getOutsideContainer(element) {
  return currentContainer
}

function createOutsideContainer({ document, element, style }) {
  const container = document.createElement('div')
  currentContainer = container
  container.setAttribute('class', outsideContainerClass)
  container.setAttribute('style', style)
  element.appendChild(container)
  return container
}

export { getOutsideContainer, createOutsideContainer }
