import ResultContent from "./result-content.component.js";
import InputForm from "./input-form.component.js";
import PubSub from "./PubSub.js";

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
		const input = new InputForm(
			'username', 'create-user-input', 'Username:*');
		const btn = document.createElement('button');
		const result = new ResultContent(this.subscribe);
		const btnStyles = document.createElement("link");

		this.form.action = '/api/users';
		this.form.method = 'post';
		this.form.name = 'create-user';
		this.form.id = 'create-user';
		btn.dataset.test = 'create-user-btn';
		btn.textContent = 'Submit';

		btnStyles.setAttribute("rel", "stylesheet");
		btnStyles.setAttribute("href", "./btn.css");

		this.form.addEventListener('submit', this.createUser.bind(this));

		this.form.append(btnStyles, input, btn, result);
		shadow.append(this.form);
	}
	async createUser(event) {
		event.preventDefault();

		try {
			const formData = new FormData(this.form);
			const username = formData.get('username');

			const response = await fetch(this.form.action, {
				method: this.form.method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username })
			});
			const user = await response.json();

			this.publish('users', user);
		} catch (error) {
			this.publish('users', error.message);
		}
	}
}
customElements.define('create-user', CreateUser);

