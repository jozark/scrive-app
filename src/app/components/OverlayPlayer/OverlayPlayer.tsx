import React, { useEffect, useState, useContext } from 'react';
import PauseIcon from '../assets/PauseIcon';
import PlayIcon from '../assets/PlayIcon';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import styles from './OverlayPlayer.module.css';
import { PlayerContext } from '../../context/PlayerContext';

const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

type OverlayPlayerProps = {
  token: string;
  className: string;
};

export default function OverlayPlayer({
  token,
  className,
}: OverlayPlayerProps): JSX.Element {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(track);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const { setDeviceID, playerIsActive } = useContext(PlayerContext);

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
      name: 'Scrive',
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
      volume: 0.5,
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
      setDeviceID(device_id);
      console.log(setDeviceID);
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.connect();

    player.addListener('player_state_changed', (state) => {
      if (!state) {
        return;
      }

      const { duration, position, paused, track_window } = state;

      setCurrentTrack(track_window.current_track);
      setPaused(paused);
      setPlaybackProgress(position / duration);
      player.getCurrentState().then((state) => {
        !state ? setActive(false) : setActive(true);
      });
    });
  };

  if (!playerIsActive) {
    return <></>;
  }

  return (
    <div className={`${styles.bar} ${className}`}>
      <img
        src={
          currentTrack.album.images[currentTrack.album.images.length - 1].url
        }
        alt=""
        className={styles.cover}
      />
      <div className={styles.text}>
        <Typography type="p" className={styles.text__head}>
          {currentTrack.name}
        </Typography>
        <p className={styles.text__sub}>{currentTrack.artists[0].name}</p>
      </div>
      <Button
        type={'squareSmall'}
        className={styles.play}
        onButtonClick={() => player?.togglePlay()}
      >
        {isPaused ? (
          <PlayIcon width={12} height={12} fill="#fff" />
        ) : (
          <PauseIcon width={12} height={12} />
        )}
      </Button>
    </div>
  );
}
