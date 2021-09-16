import React, { useState, useEffect } from 'react';
import styles from './Playback.module.css';

export default function Playback({ token }): JSX.Element {
  const loadScript = () => {
    const script = document.createElement('script');

    script.id = 'spotify-player';
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = 'https://sdk.scdn.co/spotify-player.js';

    document.body.appendChild(script);
  };

  useEffect(() => {
    loadScript();

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(token);
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
    };
  }, []);

  // async function waitForSpotifyWebPlaybackSDKToLoad() {
  //   return new Promise((resolve) => {
  //     if (window.Spotify) {
  //       resolve(window.Spotify);
  //     } else {
  //       window.onSpotifyWebPlaybackSDKReady = () => {
  //         resolve(window.Spotify);
  //       };
  //     }
  //   });
  // }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainWrapper}></div>
      </div>
    </>
  );
}
