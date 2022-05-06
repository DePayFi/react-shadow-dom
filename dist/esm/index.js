import require$$0 from 'react-dom';

var createRoot;

var m = require$$0;
{
  createRoot = m.createRoot;
}

const insideContainerClass = 'ReactShadowDOMInsideContainer';

function createInsideContainer({ document, shadow, style, classes = [] }) {
  const container = document.createElement('div');
  container.setAttribute('class', [insideContainerClass].concat(classes).join(' '));
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

function unmount({ insideRoot, outsideContainer }) {
  insideRoot.unmount();
  outsideContainer.remove();
}

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
  });

  const shadow = createShadow(outsideContainer);

  const insideContainer = createInsideContainer({
    document,
    shadow,
    style: trimStyle(insideStyle),
    classes: insideClasses,
  });

  if (typeof content === 'function') {
    content = content(insideContainer);
  }

  const insideRoot = createRoot(insideContainer);
  insideRoot.render(content);

  return { content, unmount: () => unmount({ insideRoot, outsideContainer }) }
}

export { ReactShadowDOM };
