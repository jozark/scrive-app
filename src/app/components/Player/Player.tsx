import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Header from '../Header/Header';
import PlayControls from '../PlayControls/PlayControls';
import Typography from '../Typography/Typography';
import styles from './Player.module.css';

const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

type PlayerProps = {
  token: string;
};

export default function Player({ token }: PlayerProps): JSX.Element {
  const history = useHistory();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(track);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [isThere, setIsThere] = useState(false);

  // const { id } = useParams();

  // Auth
  // useEffect(() => {
  //   async function getToken(): Promise<void> {
  //     const response = await fetch('/api/auth/token');
  //     const data = await response.json();
  //     setToken(data.token);
  //   }

  //   getToken();
  // }, []);

  // Load Script
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  //Check if there is an Scrive Player
  useEffect(() => {
    console.log("why isn't this loggiinnnnggggg");
    //Get List of all Devices
    const devicesInfo = async () => {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/devices`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const devicesData = await response.json();
      console.log(devicesData.devices);
      const listOfDevices = devicesData.devices.map((device) => device.name);
      console.log(listOfDevices);
      console.log('Scrive isThere is ', listOfDevices.includes('Scrive'));
      if (listOfDevices.includes('Scrive')) {
        const idOfScrive = devicesData.devices.find(
          (device) => device.name === 'Scrive'
        );
        await transferPlayback(idOfScrive.id);
        await playEpisode(idOfScrive.id);
        setIsThere(true);
        console.log(isThere);
      }
    };
    devicesInfo();
  }, [token]);

  //Initialize Player
  if (isThere === false) {
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
        playEpisode(device_id);
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
  }

  async function playEpisode(device_id: string): Promise<void> {
    await fetch(
      `/api/player/${device_id}/spotify:episode:0eIW62kUIwcldAA3raqzSq`,
      {
        method: 'PUT',
      }
    );
  }

  async function transferPlayback(id: string): Promise<void> {
    try {
      await fetch(`https://api.spotify.com/v1/me/player/devices`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ device_ids: [id] }),
      });
    } catch (err) {
      console.error(err);
    }
  }

  function handleBackClick() {
    history.push('/');
    // setActive(false);
    // player?.disconnect;
  }

  if (!isActive) {
    return (
      <div className={styles.container}>
        <p>Instance not active</p>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Header
          className={styles.header}
          type="options"
          onBackClick={() => handleBackClick()}
        >
          {currentTrack.name}
        </Header>
        <div className={styles.playback}>
          <img
            src={
              currentTrack.album.images[currentTrack.album.images.length - 1]
                .url
            }
            className={styles.playback__cover}
            alt=""
          />
          <div className={styles.playback__info}>
            <Typography type="h2" className={styles.info__name}>
              {currentTrack.name}
            </Typography>

            <Typography type="subHeading" className={styles.info__artist}>
              {currentTrack.artists[0].name}
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
      </div>
    );
  }
}
