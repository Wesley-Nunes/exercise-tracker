import PubSub from "./PubSub.js";
import ResultContent from "./result-content.component.js";

class GetUsers extends HTMLElement {
	subscribe = () => { };
	publish = () => { };

	constructor() {
		super();
		({ subscribe: this.subscribe, publish: this.publish } = PubSub());
	}
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		const btn = document.createElement('button');
		const result = new ResultContent(this.subscribe);

		btn.dataset.test = 'get-users-btn';
		btn.addEventListener('click', this.getUsers.bind(this));

		shadow.append(btn, result);
	}
	async getUsers() {
		try {
			const getUsersEndpoint = '/api/users';
			const response = await fetch(getUsersEndpoint);
			const users = await response.json();

			this.publish('users', users);
		} catch (err) {
			console.error(err.message);
		}
	}
}

customElements.define('get-users', GetUsers);

