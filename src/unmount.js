import ReactDOM from 'react-dom'

function unmount(outsideContainer) {
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
