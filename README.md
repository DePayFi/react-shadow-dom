## Quick Start

```
yarn add depay-react-shadow-dom
```

```
import ReactShadowDOM from 'depay-react-shadow-dom';
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

## Development

### Get started

```
yarn install
yarn start
```

### Run tests

```
yarn test:integration
```

### Release

```
npm publish
```
