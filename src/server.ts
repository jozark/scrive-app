import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';

import auth from './lib/routes/auth';
import episode from './lib/routes/episode';
import player from './lib/routes/player';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cookieParser());

app.use('/api/auth', auth);

app.use('/api/episodes', episode);

app.use('/api/player', player);

app.get('/api/hello', (_request, response) => {
  response.send('Hello API!');
});

app.use('/storybook', express.static('dist/storybook'));

app.use(express.static('dist/app'));

app.get('*', (_request, response) => {
  response.sendFile('index.html', { root: 'dist/app' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
