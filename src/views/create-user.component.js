import PubSub from "./PubSub.js";
import ResultContent from "./result-content.component.js";

class CreateUser extends HTMLElement {
	subscribe = () => { };
	publish = () => { };
	form = null;

	constructor() {
		super();
		({ subscribe: this.subscribe, publish: this.publish } = PubSub());
		this.form = document.createElement('form');
	}
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		const input = document.createElement('input');
		const btn = document.createElement('button');
		const result = new ResultContent(this.subscribe);

		this.form.action = '/api/users';
		this.form.method = 'post';
		this.form.name = 'create-user';
		input.dataset.test = 'create-user-input';
		input.name = 'username';
		input.required = true;
		btn.dataset.test = 'create-user-btn';
		btn.textContent = 'Submit';

		this.form.addEventListener('submit', this.createUser.bind(this));

		this.form.append(input, btn, result);
		shadow.append(this.form);
	}
	async createUser(event) {
		event.preventDefault();

		try {
			const formData = new FormData(this.form);
			const formObject = {};

			formData.forEach((value, key) => {
				formObject[key] = value;
			});

			const response = await fetch(this.form.action, {
				method: this.form.method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formObject)
			});
			const user = await response.json();

			this.publish('users', user);
		} catch (error) {
			result.textContent = `Error: ${error.message}`;
		}
	}
}
customElements.define('create-user', CreateUser);

