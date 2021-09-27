import React, { useEffect, useState, useContext } from 'react';
import PauseIcon from '../assets/PauseIcon';
import PlayIcon from '../assets/PlayIcon';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import styles from './OverlayPlayer.module.css';
import { PlayerContext } from '../../context/PlayerContext';
import Header from '../Header/Header';
import PlayControls from '../PlayControls/PlayControls';
import Drawer from '../Drawer/Drawer';
import { animated, useSpring } from 'react-spring';
import NoteCard from '../NoteCard/NoteCard';
import AddIcon from '../assets/AddIcon';

const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

type OverlayPlayerProps = {
  token: string;
};

const mockData = [
  {
    title: 'Mastery requires a Plan',
    time: '1:24h',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: 'Lorem Ipsum is simply dummy text',
    time: '1:24h',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: 'Lorem Ipsum has been the industrys fsdfs fsdfsd fsdfsd fdsfsd ',
    time: '1:24h',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title:
      ' It was popularised in the 1960s with the release of Letraset sheets',
    time: '1:24h',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: 'It has survived not only five centuries',
    time: '1:24h',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: 'Mastery requires a Plan',
    time: '1:24h',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

export default function OverlayPlayer({
  token,
}: OverlayPlayerProps): JSX.Element {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(track);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const scaleProps = useSpring({
    transform: isOpen ? 'scale(0.6)' : 'scale(1)',
    from: { transform: 'scale(1)' },
    config: { friction: isOpen ? 18 : 21 },
  });

  const vanishProps = useSpring({
    transform: isOpen ? 'scale(0)' : 'scale(1)',
    from: { transform: 'scale(1)' },
  });

  const { setDeviceID, playerIsActive, playerIsDetailed, setPlayerIsDetailed } =
    useContext(PlayerContext);

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

  function handleBackClick() {
    setPlayerIsDetailed(false);
  }

  return (
    // <div className={`${styles.bar} ${className}`}>
    //   <img
    //     src={
    //       currentTrack.album.images[currentTrack.album.images.length - 1].url
    //     }
    //     alt=""
    //     className={styles.cover}
    //   />
    //   <div className={styles.text}>
    //     <Typography type="p" className={styles.text__head}>
    //       {currentTrack.name}
    //     </Typography>
    //     <p className={styles.text__sub}>{currentTrack.artists[0].name}</p>
    //   </div>
    //   <Button
    //     type={'squareSmall'}
    //     className={styles.play}
    //     onButtonClick={() => player?.togglePlay()}
    //   >
    //     {isPaused ? (
    //       <PlayIcon width={12} height={12} fill="#fff" />
    //     ) : (
    //       <PauseIcon width={12} height={12} />
    //     )}
    //   </Button>
    // </div>
    <div className={styles.detailContainer}>
      <div
        className={`${styles.mainPlayer} ${
          styles[`mainPlayerIsOpen--${isOpen}`]
        }`}
      >
        <Header
          className={styles.header}
          type="options"
          onBackClick={() => handleBackClick()}
        >
          {currentTrack.name}
        </Header>
        {!isOpen && (
          <animated.div style={vanishProps} className={styles.playback}>
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
          </animated.div>
        )}
        <animated.div style={scaleProps} className={styles.play}>
          {/* TODO: Insert Slider Music ProgressBar */}
          <PlayControls
            type={'squareBig'}
            isPlay={!isPaused}
            onBackwardSkip={() => player?.previousTrack()}
            onForwardSkip={() => player?.nextTrack()}
            togglePlay={() => player?.togglePlay()}
            className={styles.playControls}
          />
        </animated.div>
      </div>
      <Drawer
        className={styles.drawer}
        display="list"
        isOpen={isOpen}
        onHandleClick={() => setIsOpen(!isOpen)}
        onBackArrowClick={() => console.log('switch to listView')}
        onOptionsClick={() => console.log('show me options')}
      >
        <div className={styles.noteWrapper}>
          {mockData &&
            mockData[0]?.title &&
            mockData.map((note) => (
              <NoteCard
                titleValue={note.title}
                timestampBegin={note.time}
                contentValue={note.content}
                expanded={false}
                handleOnCardClick={() => console.log('Card Clicked')}
                handleOnButtonClick={() => console.log('Button Clicked')}
                handleOnTimestampClick={() => console.log('Timestamp Clicked')}
                handleOnSubmit={() => console.log('submitted')}
                setTitleValue={() => console.log('Title Changed')}
                setContentValue={() => console.log('Content Changed')}
              />
            ))}
        </div>
      </Drawer>
      <Button
        type="circle"
        onButtonClick={() => console.log('click')}
        className={styles.addButton}
      >
        <AddIcon width={28} height={28} fill="#fff" />
      </Button>
    </div>
  );
}
