beforeEach(() => {
  cy.visit('http://localhost:3000');
});

it('Is tomodachi', () => {
  cy.get('[data-test-id="create-account"]').click();
  cy.url().should('include', '/account/')
  cy.get('[data-test-id="add-friend"]').click();
  cy.get('[data-test-id="add-info"]').click();
  cy.get('[data-test-id="next-row"]').should('be.visible');
});