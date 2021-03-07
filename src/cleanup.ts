import ReactDOM from 'react-dom'
import { getOutsideContainer } from './outsideContainer'

export function cleanup(element: HTMLElement): void {
  const outsideContainer: Element = getOutsideContainer(element)

  if (outsideContainer && outsideContainer.shadowRoot) {
    const shadowRoot = outsideContainer.shadowRoot
    if (shadowRoot) {
      const insideContainer: Element = <Element>shadowRoot.childNodes[0]
      if (insideContainer) {
        ReactDOM.unmountComponentAtNode(insideContainer)
      }
    }
    outsideContainer.remove()
  }
}
