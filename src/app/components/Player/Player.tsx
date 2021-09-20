import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import PlayControls from '../PlayControls/PlayControls';
import Typography from '../Typography/Typography';
import styles from './Player.module.css';

export default function TestPlayer(): JSX.Element {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [deviceId, setDeviceId] = useState('');

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
      name: 'Start Player',
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
      volume: 0.2,
    });

    //Error Handling

    player.addListener('initialization_error', ({ message }) => {
      console.log(message);
    });
    player.addListener('authentication_error', ({ message }) => {
      console.log(message);
    });
    player.addListener('account_error', ({ message }) => {
      console.log(message);
    });
    player.addListener('playback_error', ({ message }) => {
      console.log(message);
    });

    setPlayer(player);

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      setDeviceId(device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
      setDeviceId(device_id);
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

  // function handlePlayEpisode(): void {
  //   fetch(`/api/player/${deviceId}/spotify:episode:512ojhOuo1ktJprKbVcKyQ`, {
  //     method: 'PUT',
  //   });
  // }

  return (
    <div className={styles.container}>
      <Header
        className={styles.header}
        type="options"
        onBackClick={() => console.log('back')}
      >
        Title of the Song
      </Header>
      <div className={styles.playback}>
        <img
          src={current_track.album.images[0].url}
          className={styles.playback__cover}
          alt=""
        />
        <div className={styles.playback__info}>
          <Typography type="h2" className={styles.info__name}>
            {current_track.name}
          </Typography>

          <Typography type="subHeading" className={styles.info__artist}>
            {current_track.artists[0].name}
          </Typography>
        </div>
      </div>
      <PlayControls
        type="squareBig"
        isPlay={!isPaused}
        onBackwardSkip={() => player?.previousTrack()}
        onForwardSkip={() => player?.nextTrack()}
        togglePlay={() => player?.togglePlay()}
        className={styles.playControls}
      />
      {/* <button onClick={handlePlayEpisode}>PLAY THIS SONG</button> */}
    </div>
  );
}
