beforeEach(() => {
  cy.visit('http://localhost:3000');
});

it('Is tomodachi', () => {
  expect(true).toBe(true);
});