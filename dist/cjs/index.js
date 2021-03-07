
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
'use strict';

var ReactDOM = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

const insideContainerClass = 'ReactShadowDOMInsideContainer';
function createInsideContainer(document, shadow) {
    const insideContainer = document.createElement('div');
    insideContainer.setAttribute('class', insideContainerClass);
    shadow.appendChild(insideContainer);
    return insideContainer;
}

const outsideContainerClass = 'ReactShadowDOMOutsideContainer';
function createOutsideContainer(document, element) {
    const container = document.createElement('div');
    container.setAttribute('class', outsideContainerClass);
    element.appendChild(container);
    return container;
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

function ReactShadowDOM({ document, element, content, styles = '' }) {
    const outsideContainer = createOutsideContainer(document, element);
    const shadow = createShadow(outsideContainer);
    const insideContainer = createInsideContainer(document, shadow);
    ReactDOM__default['default'].render(content, insideContainer);
    return content;
}

module.exports = ReactShadowDOM;
