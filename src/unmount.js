function unmount({ insideRoot, outsideContainer }) {
  insideRoot.unmount()
  outsideContainer.remove()
}

export { unmount }
