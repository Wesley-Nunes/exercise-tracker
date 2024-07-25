class ResultContent extends HTMLElement {
	result = null;
	subscribe = () => { };

	constructor(subscribe) {
		super();
		this.result = document.createElement('div');
		this.subscribe = subscribe;
	}
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		const style = document.createElement('style');

		style.textContent = `
			.hidden {
				visibility: hidden;
			}
		`;

		this.result.dataset.test = 'result-wrapper';
		this.result.classList.add('hidden');

		this.subscribe('users', this.addTextMessage.bind(this));
		this.subscribe('exercises', this.addTextMessage.bind(this));

		shadow.append(this.result, style);
	}
	addTextMessage(data) {
		this.result.textContent = JSON.stringify(data);
		this.result.classList.remove('hidden');
	}
}

customElements.define('result-content', ResultContent);

export default ResultContent;

