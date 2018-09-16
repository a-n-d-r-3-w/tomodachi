beforeEach(() => {
  cy.visit('http://localhost:3000');
});

it('Is tomodachi', () => {
  cy.get('[data-test-id="create-account"]').click();
  cy.url().should('include', '/account/')
});