import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from "helmet";
import bodyParser from 'body-parser';
import 'dotenv/config';
import mongoose from 'mongoose';

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const __dirname = import.meta.dirname;


app.use(helmet());
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(`${__dirname}/index.html`));
});


const usernameSchema = new mongoose.Schema(
	{ username: { type: String, required: true } }
);
const Username = mongoose.model('Username', usernameSchema);


app.get('/api/users', async (req, res) => {
	const { username, _id } = await Username.find({});

	res.json({ username, _id });
});
app.post('/api/users', async (req, res) => {
	const { username, _id } = await Username.create(req.body);

	res.json({ username, _id });
});
app.delete('/api/users', async (req, res) => {
	const response = await Username.deleteMany({});

	res.json(response);
});

mongoose.connect(process.env.DB_URL);

app.listen(
	port,
	host,
	() => console.log(`The app is listening on ${host}:${port}`)
);
