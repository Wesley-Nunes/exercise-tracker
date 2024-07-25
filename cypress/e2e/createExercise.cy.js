describe('create exercises', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('POST', '/api/users').as('postUsersRequest');

    cy.clearUsers();

    cy.createUser('shut');

    cy.wait('@postUsersRequest').then((interception) => {
      const { _id } = interception.response.body;
      cy.wrap(_id).as('id');
    });
  })
  it('creates an new exercise', () => {
    cy.get('@id').then((id) => {
      cy.intercept('POST', `/api/users/${id}/exercises`)
        .as('createExerciseRequest');
    });

    cy.get('create-exercise')
      .find('[data-test="result-wrapper"]')
      .should('not.be.visible');

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

    cy.get('create-exercise')
      .find('[data-test="create-exercise-id-input"]')
      .clear();
    cy.get('create-exercise')
      .find('[data-test="create-exercise-description-input"]')
      .clear();
    cy.get('create-exercise')
      .find('[data-test="create-exercise-duration-input"]')
      .clear();
    cy.get('create-exercise')
      .find('[data-test="create-exercise-date-input"]')
      .clear();

    cy.get('create-exercise')
      .find('[data-test="result-wrapper"]')
      .should('be.visible');

    cy.wait('@createExerciseRequest').then((interception) => {
      const result = interception.response.body;
      expect(result).to.have.property('_id');
      cy.get('@id').then((id) => {
        expect(result._id).to.equal(id);
      })
      expect(result).to.have.property('username');
      expect(result.username).to.equal('shut');
      expect(result).to.have.property('description');
      expect(result.description).to.equal('lorem ipsum');
      expect(result).to.have.property('duration');
      expect(result.duration).to.equal(123);
      expect(result).to.have.property('date');
      expect(result.date).to.equal('Wed May 11 2022');
    });
  })
  it('creates an new exercise without date', () => {
    cy.get('@id').then((id) => {
      cy.intercept('POST', `/api/users/${id}/exercises`)
        .as('createExerciseRequest');
    });

    cy.get('create-exercise')
      .find('[data-test="result-wrapper"]')
      .should('not.be.visible');

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
      .find('[data-test="create-exercise-btn"]')
      .click();

    cy.get('create-exercise')
      .find('[data-test="create-exercise-id-input"]')
      .clear();
    cy.get('create-exercise')
      .find('[data-test="create-exercise-description-input"]')
      .clear();
    cy.get('create-exercise')
      .find('[data-test="create-exercise-duration-input"]')
      .clear();

    cy.get('create-exercise')
      .find('[data-test="result-wrapper"]')
      .should('be.visible');

    cy.wait('@createExerciseRequest').then((interception) => {
      const result = interception.response.body;
      expect(result).to.have.property('_id');
      cy.get('@id').then((id) => {
        expect(result._id).to.equal(id);
      })
      expect(result).to.have.property('username');
      expect(result.username).to.equal('shut');
      expect(result).to.have.property('description');
      expect(result.description).to.equal('lorem ipsum');
      expect(result).to.have.property('duration');
      expect(result.duration).to.equal(123);
      expect(result).to.have.property('date');
      const now = new Date().toDateString();
      expect(result.date).to.equal(now);
    });
  })
})

