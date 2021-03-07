import ReactDOM from 'react-dom'
import { getOutsideContainer } from './outsideContainer'

export function cleanup(
  element: HTMLElement
): void {
  let outsideContainer: Element = getOutsideContainer(element)

  if(outsideContainer && outsideContainer.shadowRoot) {
    let insideContainer: Element = <Element>outsideContainer.shadowRoot!.childNodes[0]
    if (insideContainer) {
      ReactDOM.unmountComponentAtNode(insideContainer)
    }
    outsideContainer.remove()
  }
}
