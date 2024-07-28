import Log from "../models/Log.js";

const getLogs = async (req, res) => {
	try {
		const { limit, from, to } = req.query;
		const fromDate = from ? new Date(from) : new Date(0);
		const toDate = to ? new Date(to) : new Date();

		if (from & fromDate.toDateString() === 'Invalid Date'
			|| to & toDate.toDateString() === 'Invalid Date') {
			throw new Error('Invalid Date');
		}

		const logs = await Log.findById(req.params.userId);
		const response = await logs.logsRes(fromDate, toDate, limit);

		res.json(response);
	} catch (error) {
		console.error('Error creating exercise:', error);
		res.status(500).json({ error: 'An error occurred while creating the exercise.' });
	}
};

export default getLogs;

