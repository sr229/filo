import express from 'express';
import {params} from './params';
import {proxy} from './proxy';


const app = express();


const PORT = process.env.PORT  || 8080;

app.enable('trust proxy');
app.get('/', params, proxy);
app.get('/favicon.ico', (rs: express.Response) => rs.status(204).end);
app.listen(PORT, () => console.log(`Listening to ${PORT}`));