const topics = ['users', 'exercises'];
const PubSub = () => {
	const subscribersPerTopic = {};
	const subscribe = (topic, subscriber) => {
		if (!topics.includes(topic)) {
			throw new Error(`The topic ${topic} was not found!`);
		}
		subscribersPerTopic[topic].push(subscriber);
	};
	const publish = (topic, message) => {
		if (!topics.includes(topic)) {
			throw new Error(`The topic ${topic} was not found!`);
		}
		subscribersPerTopic[topic].forEach((subscriber) => {
			subscriber(message);
		});
	};

	topics.forEach((topic) => {
		subscribersPerTopic[topic] = [];
	});

	return { subscribe, publish };
}

export default PubSub;

