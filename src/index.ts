import ReactDOM from 'react-dom'
import { cleanup } from './cleanup'
import { createInsideContainer } from './insideContainer'
import { createOutsideContainer } from './outsideContainer'
import { createShadow } from './shadow'
import { ReactElement } from 'react'
import { trimStyle } from './trimStyle'

interface ReactShadowDOMParameters {
  document: Document
  element: HTMLElement
  content: any
  outsideStyle?: string
  insideStyle?: string
}

export default function ReactShadowDOM({
  document,
  element,
  content,
  outsideStyle = '',
  insideStyle = '',
}: ReactShadowDOMParameters): ReactElement {
  cleanup(element)
  const outsideContainer = createOutsideContainer({
    document,
    element,
    style: trimStyle(outsideStyle),
  })
  const shadow = createShadow(outsideContainer)
  const insideContainer = createInsideContainer({ document, shadow, style: trimStyle(insideStyle) })
  if (typeof content === 'function') {
    content = content(insideContainer)
  }
  ReactDOM.render(content, insideContainer)
  return content
}
