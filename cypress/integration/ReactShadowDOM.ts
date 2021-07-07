import React from 'react'
import ReactDOM from 'react-dom'
import ReactShadowDOM from 'src'

describe('ReactShadowDOM', () => {
  
  it('renders content into a shadow dom', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactShadowDOM({
          document,
          element: document.body,
          content: React.createElement('h1', {}, 'I have been rendered into a shadow dom!')
        })
        
        cy.get('.ReactShadowDOMOutsideContainer').should(element => {
          const [container] = element.get()
          expect(
            container.shadowRoot.querySelector('.ReactShadowDOMInsideContainer').querySelector('h1').innerHTML
          ).to.equal('I have been rendered into a shadow dom!')
        })
      })
    })
  })

  it('passes the container to the content if content is a function', ()=>{
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let reactShadowDomContainerForContent;

        ReactShadowDOM({
          document,
          element: document.body,
          content: (container)=>{
            reactShadowDomContainerForContent = container
            return React.createElement('h1', {}, 'I have been rendered into a shadow dom!')
          }
        })
        
        cy.get('.ReactShadowDOMOutsideContainer').should(element => {
          const [container] = element.get()
          expect(
            container.shadowRoot.querySelector('.ReactShadowDOMInsideContainer').querySelector('h1').innerHTML
          ).to.equal('I have been rendered into a shadow dom!')

          expect(
            container.shadowRoot.querySelector('.ReactShadowDOMInsideContainer')
          ).to.equal(reactShadowDomContainerForContent)
        })
      })
    })
  })

  it('renders content a shadow dom only once into the same element', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactShadowDOM({
          document,
          element: document.body,
          content: React.createElement('h1', {}, 'I have been rendered into a shadow dom!')
        })

        ReactShadowDOM({
          document,
          element: document.body,
          content: React.createElement('h1', {}, 'I have been rendered into a shadow dom!')
        })
        
        cy.get('.ReactShadowDOMOutsideContainer').should('have.length', 1)
      })
    })
  })

  it('makes sure to unmount react components when cleaning up duplicates', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {
        let componentDidUnmount = false
        
        class TestComponent extends React.Component {
          
          componentWillUnmount() {
            componentDidUnmount = true
          }

          render() {
            return(React.createElement('h1', {}, 'testcomponent'))
          }
        }

        ReactShadowDOM({
          document,
          element: document.body,
          content: React.createElement(TestComponent, {}, null)
        })

        ReactShadowDOM({
          document,
          element: document.body,
          content: React.createElement(TestComponent, {}, null)
        })

        cy.get('.ReactShadowDOMOutsideContainer').should(element => {
          expect(componentDidUnmount).to.equal(true)
        })
      })
    })
  })

  it('passes outside styles to the outside container (also removes whitespace)', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactShadowDOM({
          document,
          element: document.body,
          content: React.createElement('h1', {}, 'I have been rendered into a shadow dom!'),
          outsideStyle: `
            border: 1px solid red;
            color: black;
          `
        })

        cy.get('.ReactShadowDOMOutsideContainer').invoke('attr', 'style').should('equal', 'border: 1px solid red;color: black;')
      })
    })
  })

  it('passes inside styles to the inside container (also removes whitespace)', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactShadowDOM({
          document,
          element: document.body,
          content: React.createElement('h1', {}, 'I have been rendered into a shadow dom!'),
          insideStyle: `
            .ReactShadowDOMInsideContainer {
              background: blue;
              color: white;
            }
          `
        })

        cy.get('.ReactShadowDOMOutsideContainer').should(element => {
          const [container] = element.get()
          expect(
            container.shadowRoot.querySelector('style').innerHTML
          ).to.equal('.ReactShadowDOMInsideContainer {background: blue;color: white;}')
        })
      })
    })
  })  
})
