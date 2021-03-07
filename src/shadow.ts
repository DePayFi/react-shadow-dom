export function createShadow(container: Element): ShadowRoot {
  let shadow

  if (container.shadowRoot) {
    shadow = container.shadowRoot
  } else {
    shadow = container.attachShadow({ mode: 'open' })
  }

  return shadow
}
