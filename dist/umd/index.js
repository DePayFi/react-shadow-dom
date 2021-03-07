
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ReactShadowDOM = factory(global.ReactDOM));
}(this, (function (ReactDOM) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const outsideContainerClass = 'ReactShadowDOMOutsideContainer';
  function getOutsideContainer(element) {
      return element.getElementsByClassName(outsideContainerClass)[0];
  }
  function createOutsideContainer({ document, element, styles }) {
      const container = document.createElement('div');
      container.setAttribute('class', outsideContainerClass);
      container.setAttribute('style', styles.trim());
      element.appendChild(container);
      return container;
  }

  function cleanup(element) {
      const outsideContainer = getOutsideContainer(element);
      if (outsideContainer && outsideContainer.shadowRoot) {
          const shadowRoot = outsideContainer.shadowRoot;
          if (shadowRoot) {
              const insideContainer = shadowRoot.childNodes[0];
              if (insideContainer) {
                  ReactDOM__default['default'].unmountComponentAtNode(insideContainer);
              }
          }
          outsideContainer.remove();
      }
  }

  const insideContainerClass = 'ReactShadowDOMInsideContainer';
  function createInsideContainer(document, shadow) {
      const insideContainer = document.createElement('div');
      insideContainer.setAttribute('class', insideContainerClass);
      shadow.appendChild(insideContainer);
      return insideContainer;
  }

  function createShadow(container) {
      let shadow;
      if (container.shadowRoot) {
          shadow = container.shadowRoot;
      }
      else {
          shadow = container.attachShadow({ mode: 'open' });
      }
      return shadow;
  }

  function ReactShadowDOM({ document, element, content, outsideStyles = '', }) {
      cleanup(element);
      const outsideContainer = createOutsideContainer({ document, element, styles: outsideStyles });
      const shadow = createShadow(outsideContainer);
      const insideContainer = createInsideContainer(document, shadow);
      ReactDOM__default['default'].render(content, insideContainer);
      return content;
  }

  return ReactShadowDOM;

})));
