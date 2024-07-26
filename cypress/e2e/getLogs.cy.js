describe('get logs', () => {
  it('get logs of an user', () => {
    cy.visit('/');
    cy.intercept('POST', '/api/users').as('postUsersRequest');

    cy.clearUsers();

    cy.createUser('shut');

    cy.wait('@postUsersRequest').then((interception) => {
      const { _id } = interception.response.body;
      cy.wrap(_id).as('id');
    });

    cy.get('@id').then((id) => {
      cy.get('create-exercise')
        .find('[data-test="create-exercise-id-input"]')
        .type(id);
    })
    cy.get('create-exercise')
      .find('[data-test="create-exercise-description-input"]')
      .type('lorem ipsum');
    cy.get('create-exercise')
      .find('[data-test="create-exercise-duration-input"]')
      .type(123);
    cy.get('create-exercise')
      .find('[data-test="create-exercise-date-input"]')
      .type('2022-05-12');

    cy.get('create-exercise')
      .find('[data-test="create-exercise-btn"]')
      .click();

    cy.get('@id').then((id) => {
      cy.intercept('GET', `/api/users/${id}/logs`)
        .as('getLogsRequest');
    });

    cy.get('get-logs')
      .find('[data-test="result-wrapper"]')
      .should('not.be.visible');

    cy.get('@id').then((id) => {
      cy.get('get-logs')
        .find('[data-test="get-logs-input"]')
        .type(id);
    })

    cy.get('get-logs')
      .find('[data-test="get-logs-btn"]')
      .click();

    cy.get('get-logs')
      .find('[data-test="get-logs-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="result-wrapper"]')
      .should('be.visible');

    cy.wait('@getLogsRequest').then((interception) => {
      const result = interception.response.body;
      expect(result).to.have.property('_id');
      cy.get('@id').then((id) => {
        expect(result._id).to.equal(id);
      })
      expect(result).to.have.property('username');
      expect(result.username).to.equal('shut');
      expect(result).to.have.property('count');
      expect(result.count).to.equal(1);
      expect(result).to.have.property('log');
      expect(Array.isArray(result.log)).to.be.true;
      expect(...result.log)
        .to.have.keys('description', 'duration', 'date')
    });
  })
})
