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
logSchema.virtual('count').get(function () { return this.log.length });
logSchema.virtual('exercisesRes')
	.get(function () {
		const count = this.count;
		const { description, duration, date } = this.log[count - 1];
		const response = {
			username: this.username,
			_id: this._id,
			description,
			duration,
			date: date.toDateString()
		};

		return response;
	});

const Log = mongoose.model('Log', logSchema);

export default Log;

