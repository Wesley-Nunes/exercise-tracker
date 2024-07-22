import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from "helmet";
import bodyParser from 'body-parser';
import 'dotenv/config';

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

app.post('/api/users', (req, res) => {
	const { username } = req.body;

	res.json({ username, _id: "1234" });
});

app.listen(
	port,
	host,
	() => console.log(`The app is listening on ${host}:${port}`)
);
