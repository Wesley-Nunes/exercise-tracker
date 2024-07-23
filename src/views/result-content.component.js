class ResultContent extends HTMLElement {
	subscribe = () => { };

	constructor(subscribe) {
		super();
		this.subscribe = subscribe;
	}
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		const result = document.createElement('div');
		const style = document.createElement('style');

		style.textContent = `
			.hidden {
				visibility: hidden;
			}
		`;

		result.dataset.test = 'get-users-result';
		result.classList.add('hidden');

		this.subscribe('users', (data) => {
			result.textContent = JSON.stringify(data);
			result.classList.remove('hidden');
		});

		shadow.append(result, style);
	}
}

customElements.define('result-content', ResultContent);

export default ResultContent;

