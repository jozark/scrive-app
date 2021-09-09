import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { URLSearchParams } from 'url';
import fetch from 'node-fetch';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3001;

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

app.use(express.json());
app.use(cookieParser());

const randomString = (length: number) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/api/auth/login', (_request, response) => {
  const scope =
    'streaming \
              user-read-email \
              user-read-private';

  const state = randomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientId,
    scope: scope,
    redirect_uri: 'http://localhost:3000/api/auth/callback',
    state: state,
  });

  response.redirect(
    'https://accounts.spotify.com/authorize/?' +
      auth_query_parameters.toString()
  );
});

app.get('/api/auth/callback', async (request, response) => {
  const code = request.query.code;

  if (typeof code !== 'string') {
    return;
  }

  const tokenObject = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString(
          'base64'
        ),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: 'http://localhost:3000/api/auth/callback',
      grant_type: 'authorization_code',
    }),
  });
  const body = await tokenObject.json();
  response.cookie('token', body.access_token, {
    maxAge: (body.expires_in - 60) * 1000,
  });
  response.redirect('/');
});

app.get('/api/auth/token', (request, response) => {
  const token = request.cookies.token;
  response.json({
    token: token,
  });
});

app.get('/api/hello', (_request, response) => {
  response.send('Hello API!');
});

app.use('/storybook', express.static('dist/storybook'));

app.use(express.static('dist/app'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
