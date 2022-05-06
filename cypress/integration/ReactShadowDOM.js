import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ReactShadowDOM } from '../../src'

describe('ReactShadowDOM', () => {
  
  it('renders content into a shadow dom', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactShadowDOM({
          document,
          element: document.body,
          content: React.createElement('h1', {}, 'I have been rendered into a shadow dom!')
        })
        
        cy.get('.ReactShadowDOMoutsideContainer').should(element => {
          console.log('element', element.get())
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

  it('allows to render shadow dom content into the same element multiple times (e.g. body)', () => {
  
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
        
        cy.get('.ReactShadowDOMOutsideContainer').should('have.length', 2)
      })
    })
  })

  it('makes sure to unmount react components properly if calling unmount', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {
        let componentDidUnmount = false

        let TestComponent = (props)=> {
          console.log("component");
          React.useEffect(() => {
            return () => {
              componentDidUnmount = true
            };
          }, [])
          return(React.createElement('h1', {}, 'testcomponent'))
        }
        
        let {unmount} = ReactShadowDOM({
          document,
          element: document.body,
          content: React.createElement(TestComponent, {}, null)
        })
        
        cy.wait(1000).then(()=>{
          unmount()
          cy.wait(1000).then(()=>{
            expect(componentDidUnmount).to.equal(true)
          })
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

  it('removes the shadow dom outside container on unmount', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let { unmount } = ReactShadowDOM({
          document,
          element: document.body,
          content: React.createElement('h1', {}, 'I have been rendered into a shadow dom!')
        })
        
        cy.get('.ReactShadowDOMOutsideContainer').should('exist').then(()=>{
          unmount()
          cy.get('.ReactShadowDOMOutsideContainer').should('not.exist')
        })
      })
    })
  })

  it('correctly unmounts nested components', () => {

    let intervalsCounted = 0

    let TestComponent = ()=>{
      
      useEffect(()=>{
        let interval = setInterval(()=>{
          intervalsCounted = intervalsCounted+1
        }, 3000)
        return ()=>{
          clearInterval(interval) 
        }
      }, [])

      return(
        <div>
          Im a test component
        </div>
      )
    }
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let { unmount } = ReactShadowDOM({
          document,
          element: document.body,
          insideStyle: "body { background: 'red'; }",
          content: React.createElement(TestComponent)
        })
        
        cy.get('.ReactShadowDOMOutsideContainer').should('exist').then(()=>{
          unmount()
          cy.wait(5000).then(()=>{
            expect(intervalsCounted).to.eq(0)
          })
        })
      })
    })
  })
})
