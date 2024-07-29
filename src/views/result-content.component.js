class ResultContent extends HTMLElement {
	result = null;
	subscribe = () => { };

	constructor(subscribe) {
		super();
		this.result = document.createElement('pre');
		this.subscribe = subscribe;
	}
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		const style = document.createElement('style');

		style.textContent = `
			.hidden {
				display:none;
			}
			pre {
				background-color: #f4f4f4;
				border: 1px solid #ddd;
				border-radius: 4px;
				padding: 16px;
				margin: 0;
				overflow-x: auto;
				font-family: 'Courier New', Courier, monospace;
				color: #333;
				white-space: pre-wrap;
				word-wrap: break-word;
			}
		`;

		this.result.dataset.test = 'result-wrapper';
		this.result.classList.add('hidden');

		this.subscribe('users', this.addTextMessage.bind(this));
		this.subscribe('exercises', this.addTextMessage.bind(this));
		this.subscribe('logs', this.addTextMessage.bind(this));

		shadow.append(style, this.result);
	}
	addTextMessage(data) {
		this.result.textContent = JSON.stringify(data, null, 2); // Pretty print with 2 spaces
		this.result.classList.remove('hidden');
	}
}

customElements.define('result-content', ResultContent);

export default ResultContent;

