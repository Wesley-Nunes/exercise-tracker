Cypress.Commands.add('createUser', (username) => {
	cy.get('create-user')
		.shadow()
		.find('[data-test="create-user-input"]')
		.type(username);

	cy.get('create-user')
		.shadow()
		.find('[data-test="create-user-btn"]')
		.click();

	cy.get('create-user')
		.shadow()
		.find('[data-test="create-user-input"]')
		.clear();
});

Cypress.Commands.add('resultIn', (component) => {
	cy.get(component)
		.shadow()
		.find('result-content')
		.shadow()
		.find('[data-test="get-users-result"]')
})

