describe('get users', () => {
  it('should return an empty list of users', () => {
    cy.visit('/');
    cy.intercept('GET', '/api/users').as('getUsersRequest');

    cy.resultIn('get-users').should('not.be.visible')

    cy.get('get-users')
      .shadow()
      .find('[data-test="get-users-btn"]')
      .click();

    cy.resultIn('get-users').should('be.visible')

    cy.wait('@getUsersRequest').then((interception) => {
      const result = interception.response.body;
      expect(result.length).to.equal(0);
    });
  })
  it('should return a list of users', () => {
    cy.visit('/');
    cy.intercept('GET', '/api/users').as('getUsersRequest');

    cy.request('DELETE', '/api/users')
      .its('status')
      .should('eq', 200);

    cy.createUser('shut');
    cy.createUser('Ravena');
    cy.createUser('Estrela');
    cy.createUser('Bruxa');

    cy.resultIn('get-users').should('not.be.visible')

    cy.get('get-users')
      .shadow()
      .find('[data-test="get-users-btn"]')
      .click();

    cy.resultIn('get-users').should('be.visible')

    cy.wait('@getUsersRequest').then((interception) => {
      const result = interception.response.body;
      expect(result.length).to.equal(4);
    });
  })
})



