(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactShadowDOM = {}, global.ReactDOM));
})(this, (function (exports, require$$0) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

  var createRoot;

  var m = require$$0__default["default"];
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

  exports.ReactShadowDOM = ReactShadowDOM;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
