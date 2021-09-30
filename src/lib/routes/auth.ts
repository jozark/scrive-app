import dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
import { URLSearchParams } from 'url';
import fetch from 'node-fetch';

const router = Router();

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const randomString = (length: number) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/login', (_request, response) => {
  const scopes = [
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-library-read',
    'user-library-modify',
  ];

  const state = randomString(16);

  response.redirect(
    `https://accounts.spotify.com/authorize/?response_type=code&client_id=${spotifyClientId}&redirect_uri=http://localhost:3000/api/auth/callback&scope=${scopes.join(
      '%20'
    )}&state=${state}`
  );
});

router.get('/callback', async (request, response) => {
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
  response.redirect('/spotify');
});

router.get('/token', (request, response) => {
  const token = request.cookies.token;
  response.json({
    token: token,
  });
});

export default router;
