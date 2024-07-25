describe('create an user', () => {
  it('creates an new user', () => {
    cy.visit('/');
    cy.intercept('POST', '/api/users').as('createUserRequest');

    cy.get('create-user')
      .find('[data-test="result-wrapper"]')
      .should('not.be.visible')

    cy.createUser('shut');

    cy.get('create-user')
      .find('[data-test="result-wrapper"]')
      .should('be.visible')

    cy.wait('@createUserRequest').then((interception) => {
      const result = interception.response.body;
      expect(result).to.have.property('username');
      expect(result.username).to.equal('shut');
      expect(result).to.have.property('_id');
      expect(result._id).to.be.a('string');
      expect(result._id).to.not.be.empty;
    });
  })
  it('creates another new user', () => {
    cy.visit('/');
    cy.intercept('POST', '/api/users').as('createUserRequest');

    cy.get('create-user')
      .find('[data-test="result-wrapper"]')
      .should('not.be.visible')

    cy.createUser('Ravena');

    cy.get('create-user')
      .find('[data-test="result-wrapper"]')
      .should('be.visible')

    cy.wait('@createUserRequest').then((interception) => {
      const result = interception.response.body;
      expect(result).to.have.property('username');
      expect(result.username).to.equal('Ravena');
      expect(result).to.have.property('_id');
      expect(result._id).to.be.a('string');
      expect(result._id).to.not.be.empty;
    });
  })
})
