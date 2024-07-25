class InputForm extends HTMLElement {
	static formAssociated = true;
	input = null;
	name = '';
	testId = '';
	required = true;

	constructor(name, testId, required = true) {
		super();
		this.internals_ = this.attachInternals();
		this.input = document.createElement('input');
		this.name = name;
		this.testId = testId;
		this.required = required;
	}
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });

		this.tabIndex = 0;
		this.input.name = this.name;
		this.input.dataset.test = this.testId;
		this.input.required = this.required;

		this.input.addEventListener('input', this.handleInput.bind(this));
		this.emptyInputFieldValidation(this.value);

		shadow.append(this.input);
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

