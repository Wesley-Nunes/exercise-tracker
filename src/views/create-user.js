class CreateUser extends HTMLElement {
	static formAssociated = true;

	constructor() {
		super();
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		const form = document.createElement('form');
		const input = document.createElement('input');
		const btn = document.createElement('button');
		const result = document.createElement('div');
		const style = document.createElement('style');

		style.textContent = `
			.hidden {
				visibility: hidden;
			}
		`;

		form.action = '/api/users';
		form.method = 'post';
		form.name = 'create-user';
		input.dataset.test = 'create-user-input';
		input.name = 'username';
		input.required = true;
		btn.dataset.test = 'create-user-btn';
		btn.textContent = 'Submit';
		result.dataset.test = 'create-user-result';
		result.classList.add('hidden');

		form.addEventListener('submit', async (event) => {
			event.preventDefault();

			const formData = new FormData(form);
			const formObject = {};
			formData.forEach((value, key) => {
				formObject[key] = value;
			});

			try {
				const response = await fetch(form.action, {
					method: form.method,
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formObject)
				});

				const responseData = await response.json();
				result.textContent = JSON.stringify(responseData);
				result.classList.remove('hidden');
			} catch (error) {
				result.textContent = `Error: ${error.message}`;
				result.classList.remove('hidden');
			}
		});

		form.append(input, btn, result);
		shadow.append(form, style);
	}
}
customElements.define('create-user', CreateUser);

