function createShadow(container) {
  let shadow

  if (container.shadowRoot) {
    shadow = container.shadowRoot
  } else {
    shadow = container.attachShadow({ mode: 'open' })
  }

  return shadow
}

export { createShadow }
