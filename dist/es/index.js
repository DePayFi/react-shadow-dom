import ReactDOM from 'react-dom';
import 'react';

const insideContainerClass = 'ReactShadowDOMInsideContainer';

function createInsideContainer({ document, shadow, style }) {
  const container = document.createElement('div');
  container.setAttribute('class', insideContainerClass);
  shadow.appendChild(container);

  if (style && style.length) {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(style));
    shadow.appendChild(styleElement);
  }

  return container
}

const outsideContainerClass = 'ReactShadowDOMOutsideContainer';

function createOutsideContainer({ document, element, style }) {
  const container = document.createElement('div');
  container.setAttribute('class', outsideContainerClass);
  container.setAttribute('style', style);
  element.appendChild(container);
  return container
}

function createShadow(container) {
  let shadow;

  if (container.shadowRoot) {
    shadow = container.shadowRoot;
  } else {
    shadow = container.attachShadow({ mode: 'open' });
  }

  return shadow
}

function trimStyle(style) {
  return style.replace(/\s*[\r\n]\s*/g, '')
}

function unmount(outsideContainer) {
  if (outsideContainer && outsideContainer.shadowRoot) {
    const shadowRoot = outsideContainer.shadowRoot;

    if (shadowRoot) {
      const insideContainer = shadowRoot.childNodes[0];
      if (insideContainer) {
        ReactDOM.unmountComponentAtNode(insideContainer);
      }
    }

    outsideContainer.remove();
  }
}

function ReactShadowDOM({ document, element, content, outsideStyle = '', insideStyle = '' }) {
  const outsideContainer = createOutsideContainer({
    document,
    element,
    style: trimStyle(outsideStyle),
  });

  const shadow = createShadow(outsideContainer);

  const insideContainer = createInsideContainer({ document, shadow, style: trimStyle(insideStyle) });

  if (typeof content === 'function') {
    content = content(insideContainer);
  }

  ReactDOM.render(content, insideContainer);

  return { content, unmount: () => unmount(outsideContainer) }
}

export { ReactShadowDOM };
