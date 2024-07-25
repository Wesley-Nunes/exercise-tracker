import User from '../models/User.js';

const getUsers = async (req, res) => {
	const users = await User.find({});
	const usersClean = users.map(({ username, _id }) =>
		({ username, _id }));

	res.json(usersClean);
};

const postUsers = async (req, res) => {
	const { username, _id } = await User.create(req.body);

	res.json({ username, _id });
};

const deleteUsers = async (req, res) => {
	const response = await User.deleteMany({});

	res.json(response);
}

export { getUsers, postUsers, deleteUsers };

