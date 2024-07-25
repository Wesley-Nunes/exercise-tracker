import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	date: Date
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

export { exerciseSchema, Exercise };

