
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import ReactDOM from 'react-dom';

const outsideContainerClass = 'ReactShadowDOMOutsideContainer';
function getOutsideContainer(element) {
    return element.getElementsByClassName(outsideContainerClass)[0];
}
function createOutsideContainer({ document, element, style }) {
    const container = document.createElement('div');
    container.setAttribute('class', outsideContainerClass);
    container.setAttribute('style', style);
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
                ReactDOM.unmountComponentAtNode(insideContainer);
            }
        }
        outsideContainer.remove();
    }
}

const insideContainerClass = 'ReactShadowDOMInsideContainer';
function createInsideContainer({ document, shadow, style }) {
    const container = document.createElement('div');
    container.setAttribute('class', insideContainerClass);
    container.setAttribute('style', style);
    shadow.appendChild(container);
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

function trimStyle(style) {
    return style.replace(/\s*[\r\n]\s*/g, '');
}

function ReactShadowDOM({ document, element, content, outsideStyle = '', insideStyle = '', }) {
    cleanup(element);
    const outsideContainer = createOutsideContainer({ document, element, style: trimStyle(outsideStyle) });
    const shadow = createShadow(outsideContainer);
    const insideContainer = createInsideContainer({ document, shadow, style: trimStyle(insideStyle) });
    ReactDOM.render(content, insideContainer);
    return content;
}

export default ReactShadowDOM;
