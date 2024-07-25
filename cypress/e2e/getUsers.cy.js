describe('get users', () => {
  it('should return an empty list of users', () => {
    cy.visit('/');
    cy.intercept('GET', '/api/users').as('getUsersRequest');

    cy.clearUsers();

    cy.get('get-users')
      .find('[data-test="result-wrapper"]')
      .should('not.be.visible');

    cy.get('get-users').find('[data-test="get-users-btn"]').click();

    cy.get('get-users')
      .find('[data-test="result-wrapper"]')
      .should('be.visible');

    cy.wait('@getUsersRequest').then((interception) => {
      const result = interception.response.body;
      expect(result.length).to.equal(0);
    });
  })
  it('should return a list of users', () => {
    cy.visit('/');
    cy.intercept('GET', '/api/users').as('getUsersRequest');

    cy.clearUsers();

    cy.createUser('shut');
    cy.createUser('Ravena');
    cy.createUser('Estrela');
    cy.createUser('Bruxa');

    cy.get('get-users')
      .find('[data-test="result-wrapper"]')
      .should('not.be.visible');

    cy.get('get-users').find('[data-test="get-users-btn"]').click();

    cy.get('get-users')
      .find('[data-test="result-wrapper"]')
      .should('be.visible');

    cy.wait('@getUsersRequest').then((interception) => {
      const result = interception.response.body;
      expect(result.length).to.equal(4);
    });
  })
})

