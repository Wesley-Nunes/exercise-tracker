import User from '../models/User';

const getUsers = async (req, res) => {
	const { username, _id } = await User.find({});

	res.json({ username, _id });
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

