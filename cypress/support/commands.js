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
