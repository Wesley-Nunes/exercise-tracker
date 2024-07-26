import PubSub from "./PubSub.js";
import InputForm from "./input-form.component.js";
import ResultContent from "./result-content.component.js";

class GetLogs extends HTMLElement {
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
		const input = new InputForm('userid', 'get-logs-input');
		const btn = document.createElement('button');
		const result = new ResultContent(this.subscribe);

		this.form.action = '/api/users/:userid/logs';
		this.form.name = 'get-logs';
		btn.dataset.test = 'get-logs-btn';
		btn.textContent = 'Submit';

		this.form.addEventListener('submit', this.getLogs.bind(this));

		this.form.append(input, btn, result);
		shadow.append(this.form);
	}
	async getLogs(event) {
		event.preventDefault();

		try {
			const formData = new FormData(this.form);
			const { userid } = Object.fromEntries(formData);

			const response = await fetch(
				this.form.action.replace(':userid', userid), {
				headers: { 'Content-Type': 'application/json' },
			});
			const logs = await response.json();

			this.publish('logs', logs);
		} catch (error) {
			this.publish('logs', error.message);
		}
	}
}

customElements.define('get-logs', GetLogs);

