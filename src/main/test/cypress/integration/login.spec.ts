import faker from 'faker'

const baseUrl = Cypress.config().baseUrl

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
    cy.getByTestId('email').focus().type(faker.commerce.product())

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

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('password').focus().type(faker.datatype.string(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('password').focus().type(faker.datatype.string(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('password').focus().type(faker.datatype.string(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if invalid credentials are provided', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('password').focus().type(faker.datatype.string(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Credenciais invalidas')

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const url = `${baseUrl}/login`
    cy.url().should('eq', url)
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.getByTestId('email').focus().type('mango@gmail.com')

    cy.getByTestId('password').focus().type('12345')

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const url = `${baseUrl}/`
    cy.url().should('eq', url)

    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})
