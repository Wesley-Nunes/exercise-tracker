class InputForm extends HTMLElement {
	static formAssociated = true;
	input = null;
	name = '';
	testId = '';
	required = true;

	constructor(name, testId, label, required = true) {
		super();
		this.internals_ = this.attachInternals();
		this.input = document.createElement('input');
		this.name = name;
		this.testId = testId;
		this.label = label;
		this.required = required;
	}
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		const style = document.createElement('style');
		const label = document.createElement('label');

		this.tabIndex = 0;
		this.input.name = this.name;
		this.input.id = this.name;
		this.input.dataset.test = this.testId;
		this.input.required = this.required;
		label.htmlFor = this.name;
		label.textContent = this.label;

		this.input.addEventListener('input', this.handleInput.bind(this));
		this.emptyInputFieldValidation(this.value);

		style.textContent = `
			:host {
				display: block;
				margin-bottom: 20px;
			}
			label {
				display: block;
				margin-bottom: 5px;
				color: #333;
				font-size: 0.9em;
				font-weight: 600;
				cursor: pointer;
				transition: color 0.3s ease;
			}
			label[required]::after {
				content: '*';
				color: #d9534f; /* Red color for required indicator */
				margin-left: 5px;
			}
			input {
				width: 100%;
				padding: 10px;
				margin-bottom: 10px;
				border: 1px solid #ccc;
				border-radius: 4px;
				font-size: 1em;
				box-sizing: border-box;
				transition: border-color 0.3s ease;
			}
			input:focus {
				border-color: #0062cc;
				outline: none;
			}
			input::placeholder {
				color: #888;
			}
		`;

		shadow.append(style, label, this.input);
	}
	handleInput(event) {
		const inputValue = event.target.value;

		this.emptyInputFieldValidation(inputValue);

		this.value = inputValue;
	}
	emptyInputFieldValidation(value) {
		if (this.required && !value) {
			this.internals_.setValidity(
				{ valueMissing: true },
				'This field is required');
		} else {
			this.internals_.setValidity({});
		}
	}
	checkValidity() { return this.internals_.checkValidity(); }
	reportValidity() { return this.internals_.reportValidity(); }
	focus() { this.input.focus(); }
	get value() { return this.value_; }
	set value(v) {
		this.value_ = v;
		this.input.value = v;
		const entries = new FormData();
		entries.append(this.name, v);
		this.internals_.setFormValue(entries);
	}
	get form() { return this.internals_.form; }
	get type() { return this.localName; }
	get validity() { return this.internals_.validity; }
	get validationMessage() { return this.internals_.validationMessage; }
	get willValidate() { return this.internals_.willValidate; }
}
customElements.define('input-form', InputForm);

export default InputForm;

