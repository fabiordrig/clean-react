import faker from 'faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email')
      .should('have.attr', 'readOnly')

    cy.getByTestId('password')
      .should('have.attr', 'readOnly')

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.datatype.string())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Valor invalido')
      .should('contain.text', '🔴')

    cy.getByTestId('password').focus().type(faker.datatype.string(2))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Valor invalido')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
