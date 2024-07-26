import Log from "../models/Log.js";

const getLogs = async (req, res) => {
	const logs = await Log.findById(req.params.userId);

	res.json(logs.logsRes);
};

export default getLogs;

