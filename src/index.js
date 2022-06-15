import * as ReactDOMClient from 'react-dom/client'
import { createInsideContainer } from './insideContainer'
import { createOutsideContainer } from './outsideContainer'
import { createShadow } from './shadow'
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

  const insideRoot = ReactDOMClient.createRoot(insideContainer)
  insideRoot.render(content)

  return { content, unmount: () => unmount({ insideRoot, outsideContainer }) }
}

export { ReactShadowDOM }
