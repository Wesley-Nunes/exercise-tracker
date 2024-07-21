import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.use(cors({ optionsSuccessStatus: 200 }));

app.listen(port, host, () => console.log(`The app is listening on ${host}:${port}`));
