describe('get logs', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('POST', '/api/users').as('postUsersRequest');

    cy.clearUsers();

    cy.createUser('shut');

    cy.wait('@postUsersRequest').then((interception) => {
      const { _id } = interception.response.body;
      cy.wrap(_id).as('id');
    });

    cy.get('get-logs')
      .find('[data-test="result-wrapper"]')
      .should('not.be.visible');
  })
  it('get logs of an user', () => {
    cy.get('@id').then((id) => {
      cy.intercept('GET', `/api/users/${id}/logs`)
        .as('getLogsRequest');
    });

    cy.get('@id').then((id) => {
      cy.createExercise(id, 'lorem', 123, '2024-07-20');
    });

    cy.get('@id').then((id) => {
      cy.get('get-logs')
        .find('[data-test="get-logs-userid-input"]')
        .type(id);
    })

    cy.get('get-logs')
      .find('[data-test="get-logs-btn"]')
      .click();

    cy.get('get-logs')
      .find('[data-test="get-logs-userid-input"]')
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
  it('get logs of an user with date filter from', () => {
    cy.get('@id').then((id) => {
      cy.intercept('GET', `/api/users/${id}/logs?from=2024-05-30`)
        .as('getLogsRequestFilterFrom');
    });

    cy.get('@id').then((id) => {
      cy.createExercise(id, 'lorem', 12, '2024-07-20');
      cy.createExercise(id, 'ipsum', 23, '2024-05-30');
      cy.createExercise(id, 'dolor', 34, '2024-05-10');
      cy.createExercise(id, 'met', 45, '2023-12-20');
    });


    cy.get('@id').then((id) => {
      cy.get('get-logs')
        .find('[data-test="get-logs-userid-input"]')
        .type(id);
    })

    cy.get('get-logs')
      .find('[data-test="get-logs-from-input"]')
      .type('2024-05-30');

    cy.get('get-logs')
      .find('[data-test="get-logs-btn"]')
      .click();

    cy.get('get-logs')
      .find('[data-test="get-logs-userid-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="get-logs-from-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="result-wrapper"]')
      .should('be.visible');

    cy.wait('@getLogsRequestFilterFrom').then((interception) => {
      const result = interception.response.body;
      expect(result).to.have.property('_id');
      cy.get('@id').then((id) => {
        expect(result._id).to.equal(id);
      })
      expect(result).to.have.property('username');
      expect(result.username).to.equal('shut');
      expect(result).to.have.property('count');
      expect(result.count).to.equal(2);
      expect(result).to.have.property('log');
      expect(Array.isArray(result.log)).to.be.true;
      expect(...result.log)
        .to.have.keys('description', 'duration', 'date')
    });
  })
  it('get logs of an user with date filter to', () => {
    cy.get('@id').then((id) => {
      cy.intercept('GET', `/api/users/${id}/logs?to=2024-05-30`)
        .as('getLogsRequestFilterTo');
    });

    cy.get('@id').then((id) => {
      cy.createExercise(id, 'lorem', 12, '2024-07-20');
      cy.createExercise(id, 'ipsum', 23, '2024-05-30');
      cy.createExercise(id, 'dolor', 34, '2024-05-10');
      cy.createExercise(id, 'met', 45, '2023-12-20');
    });


    cy.get('@id').then((id) => {
      cy.get('get-logs')
        .find('[data-test="get-logs-userid-input"]')
        .type(id);
    })

    cy.get('get-logs')
      .find('[data-test="get-logs-to-input"]')
      .type('2024-05-30');

    cy.get('get-logs')
      .find('[data-test="get-logs-btn"]')
      .click();

    cy.get('get-logs')
      .find('[data-test="get-logs-userid-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="get-logs-to-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="result-wrapper"]')
      .should('be.visible');

    cy.wait('@getLogsRequestFilterTo').then((interception) => {
      const result = interception.response.body;
      expect(result).to.have.property('_id');
      cy.get('@id').then((id) => {
        expect(result._id).to.equal(id);
      })
      expect(result).to.have.property('username');
      expect(result.username).to.equal('shut');
      expect(result).to.have.property('count');
      expect(result.count).to.equal(3);
      expect(result).to.have.property('log');
      expect(Array.isArray(result.log)).to.be.true;
      expect(...result.log)
        .to.have.keys('description', 'duration', 'date')
    });
  })
  it('get logs of an user with limit filter', () => {
    cy.get('@id').then((id) => {
      cy.intercept('GET', `/api/users/${id}/logs?limit=2`)
        .as('getLogsRequestFilterLimit');
    });

    cy.get('@id').then((id) => {
      cy.createExercise(id, 'lorem', 12, '2024-07-20');
      cy.createExercise(id, 'ipsum', 23, '2024-05-30');
      cy.createExercise(id, 'dolor', 34, '2024-05-10');
      cy.createExercise(id, 'met', 45, '2023-12-20');
    });


    cy.get('@id').then((id) => {
      cy.get('get-logs')
        .find('[data-test="get-logs-userid-input"]')
        .type(id);
    })

    cy.get('get-logs')
      .find('[data-test="get-logs-limit-input"]')
      .type(2);

    cy.get('get-logs')
      .find('[data-test="get-logs-btn"]')
      .click();

    cy.get('get-logs')
      .find('[data-test="get-logs-userid-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="get-logs-limit-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="result-wrapper"]')
      .should('be.visible');

    cy.wait('@getLogsRequestFilterLimit').then((interception) => {
      const result = interception.response.body;
      expect(result).to.have.property('_id');
      cy.get('@id').then((id) => {
        expect(result._id).to.equal(id);
      })
      expect(result).to.have.property('username');
      expect(result.username).to.equal('shut');
      expect(result).to.have.property('count');
      expect(result.count).to.equal(2);
      expect(result).to.have.property('log');
      expect(Array.isArray(result.log)).to.be.true;
      expect(...result.log)
        .to.have.keys('description', 'duration', 'date')
    });
  })
  it('get logs of an user with all filters', () => {
    cy.get('@id').then((id) => {
      cy.intercept(
        'GET',
        `/api/users/${id}/logs?from=2024-01-01&to=2024-06-01&limit=1`)
        .as('getLogsRequestFilters');
    });

    cy.get('@id').then((id) => {
      cy.createExercise(id, 'lorem', 12, '2024-07-20');
      cy.createExercise(id, 'ipsum', 23, '2024-05-30');
      cy.createExercise(id, 'dolor', 34, '2024-05-10');
      cy.createExercise(id, 'met', 45, '2023-12-20');
    });

    cy.get('@id').then((id) => {
      cy.get('get-logs')
        .find('[data-test="get-logs-userid-input"]')
        .type(id);
    })

    cy.get('get-logs')
      .find('[data-test="get-logs-from-input"]')
      .type('2024-01-01');

    cy.get('get-logs')
      .find('[data-test="get-logs-to-input"]')
      .type('2024-06-01');

    cy.get('get-logs')
      .find('[data-test="get-logs-limit-input"]')
      .type(1);

    cy.get('get-logs')
      .find('[data-test="get-logs-btn"]')
      .click();

    cy.get('get-logs')
      .find('[data-test="get-logs-userid-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="get-logs-from-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="get-logs-to-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="get-logs-limit-input"]')
      .clear();

    cy.get('get-logs')
      .find('[data-test="result-wrapper"]')
      .should('be.visible');

    cy.wait('@getLogsRequestFilters').then((interception) => {
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
