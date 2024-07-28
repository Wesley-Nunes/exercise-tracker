import mongoose from "mongoose";
import { exerciseSchema } from "./Exercise.js";

const logSchema = new mongoose.Schema({
	_id: {
		type: mongoose.ObjectId,
		required: true,
		ref: 'User'
	},
	username: {
		type: String,
		required: true,
		ref: 'User'
	},
	log: [exerciseSchema],
});
logSchema.virtual('exercisesRes').get(function () {
	const { description, duration, date } =
		this.log[this.log.length - 1];
	const response = {
		username: this.username,
		_id: this._id,
		description,
		duration,
		date: date.toDateString()
	};

	return response;
});
logSchema.methods.logsRes = function (from, to, limit) {
	try {
		let log = [];
		const logByDate = this.log.filter(({ date }) => {
			const logDate = new Date(date);
			return logDate >= from && logDate <= to;
		});
		const endSize = limit
			? Math.min(logByDate.length, limit)
			: logByDate.length;

		for (let i = 0; i < endSize; i += 1) {
			const { description, duration, date } = logByDate[i];
			log.push({
				description,
				duration,
				date: date.toDateString()
			});
		}

		const response = ({
			_id: this._id,
			username: this.username,
			count: log.length,
			log
		});

		return response;
	} catch (err) {
		console.error(err);
	}
}

const Log = mongoose.model('Log', logSchema);

export default Log;

