describe('Home page', function() {
  it('Loads the homepage', function() {
    cy.visit('localhost:3000');
    cy.percySnapshot();
  });
});
