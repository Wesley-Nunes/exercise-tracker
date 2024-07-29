import ResultContent from "./result-content.component.js";
import InputForm from "./input-form.component.js";
import PubSub from "./PubSub.js";

class CreateExercise extends HTMLElement {
	publish = () => { }
	subscribe = () => { }
	form = null;

	constructor() {
		super();
		({ publish: this.publish, subscribe: this.subscribe } =
			PubSub());
		this.form = document.createElement('form');
	}
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		const idInput = new InputForm(
			'userid', 'create-exercise-id-input', 'User id:*');
		const descriptionInput = new InputForm(
			'description',
			'create-exercise-description-input',
			'Description*');
		const durationInput = new InputForm(
			'duration', 'create-exercise-duration-input', 'Duration*');
		const dateInput = new InputForm(
			'date', 'create-exercise-date-input', 'Date:', false);
		const btnStyles = document.createElement("link");

		const btn = document.createElement('button');
		const result = new ResultContent(this.subscribe);

		this.form.action = '/api/users/:userid/exercises';
		this.form.method = 'post';
		this.form.name = 'create-exercise';
		btn.dataset.test = 'create-exercise-btn';
		btn.textContent = 'Submit';

		btnStyles.setAttribute("rel", "stylesheet");
		btnStyles.setAttribute("href", "./btn.css");

		this.form.addEventListener('submit', this.createExercise.bind(this));

		this.form.append(
			idInput,
			descriptionInput,
			durationInput,
			dateInput,
			btn,
			result
		);
		shadow.append(btnStyles, this.form);
	}
	async createExercise(event) {
		event.preventDefault();

		try {
			const formData = new FormData(this.form);
			const { userid, ...body } = Object.fromEntries(formData);

			const response = await fetch(
				this.form.action.replace(':userid', userid), {
				method: this.form.method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});
			const user = await response.json();

			this.publish('users', user);
		} catch (error) {
			this.publish('users', error.message);
		}
	}
}

customElements.define('create-exercise', CreateExercise);

