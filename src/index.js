import ReactDOM from 'react-dom'
import { createInsideContainer } from './insideContainer'
import { createOutsideContainer } from './outsideContainer'
import { createShadow } from './shadow'
import { ReactElement } from 'react'
import { trimStyle } from './trimStyle'
import { unmount } from './unmount'

function ReactShadowDOM({
  document,
  element,
  content,
  outsideStyle = '',
  insideStyle = '',
  insideClasses = [],
}) {
  const outsideContainer = createOutsideContainer({
    document,
    element,
    style: trimStyle(outsideStyle),
  })

  const shadow = createShadow(outsideContainer)

  const insideContainer = createInsideContainer({
    document,
    shadow,
    style: trimStyle(insideStyle),
    classes: insideClasses,
  })

  if (typeof content === 'function') {
    content = content(insideContainer)
  }

  ReactDOM.render(content, insideContainer)

  return { content, unmount: () => unmount(outsideContainer) }
}

export { ReactShadowDOM }
