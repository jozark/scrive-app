import dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
import fetch from 'node-fetch';
import { searchEpisode } from '../models/episode';

const router = Router();

router.get('/search', async (req, res) => {
  const query = 'Elon%20Musk';
  const token = req.cookies.token;

  if (!query) {
    res.status(400).json({ msg: 'Query is required' });
    return;
  } else if (typeof query !== 'string') {
    res.status(400).json({ message: 'Query must be a string' });
    return;
  }

  const episodes = await searchEpisode(query, token);
  res.send(episodes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;

  const response = await fetch(`https://api.spotify.com/v1/episodes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const episodeData = await response.json();
  res.send(episodeData);
});

export default router;
