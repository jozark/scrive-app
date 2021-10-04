import dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

router.put('/:id/:uri', async (req, res) => {
  const { uri } = req.params;
  const { id } = req.params;
  const token = req.cookies.token;
  try {
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ uris: [uri] }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err });
  }
});

router.put('/:position', async (req, res) => {
  const { position } = req.params;
  const token = req.cookies.token;
  try {
    await fetch(
      `https://api.spotify.com/v1/me/player/seek?position_ms=${position}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err });
  }
});

export default router;
