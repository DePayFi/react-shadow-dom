import ReactDOM from 'react-dom'
import { getOutsideContainer } from './outsideContainer'

function unmount(element) {
  const outsideContainer = getOutsideContainer(element)

  if (outsideContainer && outsideContainer.shadowRoot) {
    const shadowRoot = outsideContainer.shadowRoot

    if (shadowRoot) {
      const insideContainer = shadowRoot.childNodes[0]
      if (insideContainer) {
        ReactDOM.unmountComponentAtNode(insideContainer)
      }
    }

    outsideContainer.remove()
  }
}

export { unmount }
