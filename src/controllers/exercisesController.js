import { Exercise } from '../models/Exercise.js';
import Log from '../models/Log.js';
import User from '../models/User.js';

const postExercises = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId).exec();
		const _date = req.body?.date
			? new Date(req.body?.date)
			: new Date();
		const exercise = await Exercise.create({
			description: req.body.description,
			duration: req.body.duration,
			date: _date
		});
		let logOfUser = await Log.findOne(
			{ _id: user._id, username: user.username },
		);

		if (!logOfUser) {
			logOfUser = await Log.create(
				{ _id: user._id, username: user.username },
			);
		}
		logOfUser.log.push(exercise);
		await logOfUser.save();

		res.json(logOfUser.exercisesRes);
	} catch (error) {
		console.error('Error creating exercise:', error);
		res.status(500).json({ error: 'An error occurred while creating the exercise.' });
	}
};

export { postExercises };

