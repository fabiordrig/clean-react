
export function getByTestId (id: string): any {
  cy.get(`[data-testid=${id}]`)
}

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId: typeof getByTestId
    }
  }
}
