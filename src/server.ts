import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import fetch from 'node-fetch';
import cookieParser from 'cookie-parser';

import auth from './app/lib/routes/auth';

const app = express();
const port = process.env.PORT || 3001;

// const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
// const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

app.use(express.json());

app.use(cookieParser());

app.use('/api/auth', auth);

app.get('/api/episode/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;
  const response = await fetch(
    'https://api.spotify.com/v1/episodes/512ojhOuo1ktJprKbVcKyQ',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const episodeData = await response.json();
  res.send(episodeData);
});

app.get('/api/hello', (_request, response) => {
  response.send('Hello API!');
});

app.use('/storybook', express.static('dist/storybook'));

app.use(express.static('dist/app'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
