## Quick Start

```
yarn add @depay/react-shadow-dom
```

```
import { ReactShadowDOM } from '@depay/react-shadow-dom';
```

```
ReactShadowDOM({
  document,
  element,
  content,
  outsideStyle: outsideStyle,
  insideStyle: insideStyle
})
```

## ReactShadowDOM

The function `ReactShadowDOM` renders a react compontent (`content`) into an `insideContainer` that lives inside a shadowRoot of the `outsideContainer`
target element (`element`) within a given document (`document`) while also applying `insideStyle` to the `insideContainer` and `outsideStyle` to the `outsideContainer`.

### content

You can either pas a ReactElement to `content` or a function. In case of a `function` that function will be call with the `insideContainer` as an argument and it's expected to return a ReactElement.

### styles

While `outsideStyle` is applied to the outside container directly:
```
outsideStyle: `
  border: 1px solid red;
  color: black;
`
```
```
<div class="ReactShadowDOMOutsideContainer" style="border: 1px solid red;color: black;"></div>
```

`insideStyle` is wrapped in a style tag and prepend to the shadowRoot:
```
insideStyle: `
  .ReactShadowDOMInsideContainer {
    background: blue;
    color: white;
  }
`
```
```
#shadow-root
  <style type="text/css">.ReactShadowDOMInsideContainer {background: blue;color: white;}</style>
  <div class="ReactShadowDOMInsideContainer"><h1>I'm in a ShadowDOM</h1></div>
```

wich allows you to style all elements and classes within the shadowRoot.

### classes

`insideClasses` sets classes on inside container:
```
insideClasses: ['contained', 'another-class']
```
```
#shadow-root
  <div class="ReactShadowDOMInsideContainer contained another-class"><h1>I'm in a ShadowDOM</h1></div>
```

### unmount

In order to completly unmount everything (removing containers and unmounting React components),
the `ReactShadowDOM` function returns an object containing an `unmount` function:

```javascript

let { unmount } = ReactShadowDOM(...)

unmount()

```

## Development

### Get started

```
yarn install
yarn demo
```

### Run tests

```
yarn test:integration
```

### Debug tests

```
yarn test:cypress:debug 'cypress/integration/ReactShadowDOM.js'
```

### Release

```
npm publish
```
