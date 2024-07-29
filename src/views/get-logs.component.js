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
		const userIdInput = new InputForm(
			'userid', 'get-logs-userid-input', 'User id:*');
		const filterFromInput = new InputForm(
			'from', 'get-logs-from-input', 'From(date):', false);
		const filterToInput = new InputForm(
			'to', 'get-logs-to-input', 'To(date):', false);
		const filterLimitInput = new InputForm(
			'limit', 'get-logs-limit-input', 'Limit:', false);
		const btn = document.createElement('button');
		const result = new ResultContent(this.subscribe);
		const btnStyles = document.createElement("link");

		this.form.action = '/api/users/:userid/logs';
		this.form.name = 'get-logs';
		btn.dataset.test = 'get-logs-btn';
		btn.textContent = 'Submit';

		btnStyles.setAttribute("rel", "stylesheet");
		btnStyles.setAttribute("href", "./btn.css");

		this.form.addEventListener('submit', this.getLogs.bind(this));

		this.form.append(
			userIdInput,
			filterFromInput,
			filterToInput,
			filterLimitInput,
			btn,
			result
		);
		shadow.append(btnStyles, this.form);
	}
	async getLogs(event) {
		event.preventDefault();

		try {
			const formData = new FormData(this.form);
			const { userid, from, to, limit } =
				Object.fromEntries(formData);
			let query = {};
			let path = this.form.action.replace(':userid', userid);
			if (from) {
				query.from = from;
			}
			if (to) {
				query.to = to;
			}
			if (limit) {
				query.limit = limit;
			}
			const endpoint = new URL(path);

			endpoint.search = new URLSearchParams(query);

			const response = await fetch(endpoint,
				{ headers: { 'Content-Type': 'application/json' } });
			const logs = await response.json();

			this.publish('logs', logs);
		} catch (error) {
			this.publish('logs', error.message);
		}
	}
}

customElements.define('get-logs', GetLogs);

