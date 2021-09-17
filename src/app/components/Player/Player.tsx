import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import styles from './Player.module.css';

export default function TestPlayer(): JSX.Element {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);

  // Auth
  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken(): Promise<void> {
      const response = await fetch('/api/auth/token');
      const data = await response.json();
      setToken(data.token);
    }

    getToken();
  }, []);
  const track = {
    name: '',
    album: {
      images: [{ url: '' }],
    },
    artists: [{ name: '' }],
  };

  const [current_track, setTrack] = useState(track);

  //Initialize Player

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const accessToken = token;
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
      volume: 0.5,
    });
    setPlayer(player);

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.connect();
    player.addListener('player_state_changed', (state) => {
      if (!state) {
        return;
      }

      setTrack(state.track_window.current_track);
      setPaused(state.paused);

      player.getCurrentState().then((state) => {
        !state ? setActive(false) : setActive(true);
      });
    });
  };

  return (
    <div className={styles.container}>
      <Header type="options" onBackClick={() => console.log('back')}>
        Title of the Song
      </Header>
      <div className={styles.playback}>
        <img
          src={current_track.album.images[0].url}
          className={styles.playback__cover}
          alt=""
        />

        <div className={styles.playback__info}>
          <div className={styles.info__name}>{current_track.name}</div>

          <div className={styles.info__artist}>
            {current_track.artists[0].name}
          </div>
        </div>
      </div>
      <button
        className={styles.controls__previous}
        onClick={() => {
          player?.previousTrack();
        }}
      >
        &lt;&lt;
      </button>

      <button
        className={styles.control__play}
        onClick={() => {
          player?.togglePlay();
        }}
      >
        {is_paused ? 'PLAY' : 'PAUSE'}
      </button>

      <button
        className={styles.control__next}
        onClick={() => {
          player?.nextTrack();
        }}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
