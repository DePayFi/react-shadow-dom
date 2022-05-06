import ReactDOM from 'react-dom'

function unmount({ insideRoot, outsideContainer }) {
  insideRoot.unmount()
  outsideContainer.remove()
}

export { unmount }
