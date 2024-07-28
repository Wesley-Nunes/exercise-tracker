Cypress.Commands.add('createUser', (username) => {
	cy.get('create-user')
		.find('[data-test="create-user-input"]')
		.type(username);

	cy.get('create-user')
		.find('[data-test="create-user-btn"]')
		.click();

	cy.get('create-user')
		.find('[data-test="create-user-input"]')
		.clear();
});

Cypress.Commands.add('clearUsers', () => {
	cy.request('DELETE', '/api/users')
		.its('status')
		.should('eq', 200);
});

Cypress.Commands.add('createExercise',
	(userId, description, duration, date) => {
		cy.get('create-exercise')
			.find('[data-test="create-exercise-id-input"]')
			.type(userId);
		cy.get('create-exercise')
			.find('[data-test="create-exercise-description-input"]')
			.type(description);
		cy.get('create-exercise')
			.find('[data-test="create-exercise-duration-input"]')
			.type(duration);
		if (date) {
			cy.get('create-exercise')
				.find('[data-test="create-exercise-date-input"]')
				.type(date);
		}

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
	}
);
