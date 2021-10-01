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
import { msTimeFormat, msTimeFormatToMin } from '../../utils/utils';
import NoteCard from '../NoteCard/NoteCard';
import AddIcon from '../assets/AddIcon';
import useEpisodes from '../../hooks/useEpisodes';
import type { Note } from '../../../lib/types';
import { v1 as uuidv1 } from 'uuid';
import CheckIcon from '../assets/CheckIcon';
import Slider from '../Slider/Slider';
import useDebounce from '../../hooks/useDebounce';

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
  //player states
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [isPaused, setPaused] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState(track);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [playbackTimestamp, setPlaybackTimestamp] = useState<number>(0);
  const [playbackDuration, setPlaybackDuration] = useState<number>(0);
  const [timeSeek, setTimeSeek] = useState<number>(0);
  const debouncedTimeSeek = useDebounce<number>(timeSeek, 500);

  //note states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeNoteID, setActiveNoteID] = useState('');
  const [activeNoteTimeStamp, setActiveNoteTimeStamp] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const { episodeData, addEpisodeNote, updateEpisodeNote, refetch } =
    useEpisodes();

  const { setDeviceID, playerIsActive, playerIsDetailed, setPlayerIsDetailed } =
    useContext(PlayerContext);

  useEffect(() => {
    refetch();
  }, [playerIsActive]);

  //initialize player
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
      setPlaybackTimestamp(position);
      setPlaybackDuration(duration);
      setPlaybackProgress(position / duration);
      player.getCurrentState().then((state) => {
        !state ? setActive(false) : setActive(true);
      });
    });
  };

  const scaleProps = useSpring({
    transform: isOpen ? 'scale(0.65)' : 'scale(1)',
    from: { transform: 'scale(1)' },
    config: { friction: isOpen ? 18 : 21 },
  });

  const vanishProps = useSpring({
    transform: isOpen ? 'scale(0)' : 'scale(1)',
    from: { transform: 'scale(1)' },
  });

  // while (!isPaused) {
  //   setInterval(() => setPlaybackTimestamp(playbackTimestamp + 1000), 1000);
  // }

  function handleBackClick() {
    setPlayerIsDetailed(false);
  }

  async function handlePlayButtonCard(time: number) {
    await fetch(`/api/player/${time}`, {
      method: 'PUT',
    });
    //why isn't it working?
    if (isPaused) {
      player?.togglePlay();
    }
  }

  function handleOnCardClick(note: Note) {
    setActiveNoteID(note.id);
    setActiveNoteTimeStamp(note.timestamp);
    setTitleValue(note.title);
    setContentValue(note.content);
  }

  function handleBackArrowClick() {
    handleOnSubmit();
    setTitleValue('');
    setContentValue('');
    setActiveNoteID('');
    setActiveNoteTimeStamp(0);
  }

  function handleHandleClick() {
    setActiveNoteID('');
    setIsOpen(!isOpen);
  }

  async function handleOnSliderChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setPlaybackProgress(+event.target.value * 0.01);
  }

  async function handleOnTouchEnd(event: React.TouchEvent<HTMLInputElement>) {
    console.log(event.target, 'targetMouse');
    const seekingTime = Math.round(
      +event.target.value * 0.01 * playbackDuration
    );
    await fetch(`/api/player/${seekingTime}`, {
      method: 'PUT',
    });
  }

  function handleAddButtonClick() {
    setTitleValue('');
    setContentValue('');

    const newNote: Note = {
      id: uuidv1(),
      title: titleValue,
      content: contentValue,
      timestamp: playbackTimestamp,
    };

    setActiveNoteID(newNote.id);
    setActiveNoteTimeStamp(newNote.timestamp);
    setIsOpen(true);
  }

  function handleOnSubmit() {
    if (!titleValue) {
      alert('Please Enter a Title!');
    }

    const newNote: Note = {
      id: activeNoteID,
      title: titleValue,
      content: contentValue,
      timestamp: activeNoteTimeStamp,
    };

    const activeEpisode = episodeData.find(
      (episode) => episode.id === playerIsActive
    );

    console.log(activeEpisode);
    console.log(playerIsActive);
    const isNoteThere = activeEpisode?.notes.find(
      (note) => note.id === newNote.id
    );

    if (isNoteThere) {
      updateEpisodeNote(playerIsActive, newNote);
    } else {
      addEpisodeNote(playerIsActive, newNote);
    }
  }

  //only display when the player is active
  if (!playerIsActive) {
    return <></>;
  }

  return playerIsDetailed ? (
    <div className={styles.detailedContainer}>
      <div
        className={`${styles.detailed__player} ${
          styles[`detailed__playerIsOpen--${isOpen}`]
        }`}
      >
        <Header
          className={`${styles.detailed__header} ${
            styles[`detailed__header--${isOpen}`]
          }`}
          type="options"
          onBackClick={() => handleBackClick()}
        >
          {currentTrack.name}
        </Header>
        {!isOpen && (
          <animated.div
            style={vanishProps}
            className={styles.detailed__playback}
          >
            <img
              src={
                currentTrack.album.images[currentTrack.album.images.length - 1]
                  .url
              }
              className={styles.playback__cover}
              alt=""
            />
          </animated.div>
        )}
        <div
          className={`${styles.detailed__controls} ${
            styles[`detailed__controls--${isOpen}`]
          }`}
        >
          {!isOpen ? (
            <section className={styles.controls__info}>
              <Typography type="h2" className={styles.info__name}>
                {currentTrack.name}
              </Typography>
              <Typography type="subHeading" className={styles.info__artist}>
                {currentTrack.artists[0].name}
              </Typography>
            </section>
          ) : (
            <></>
          )}
          <div className={styles.controls__slider}>
            <Slider
              handleOnChange={(event) => handleOnSliderChange(event)}
              percentageValue={playbackProgress * 100}
              handleOnMouseUp={(event) => console.log(event, 'mouse')}
              handleOnTouchEnd={(event) => handleOnTouchEnd(event)}
            />
            <div className={styles.slider__time}>
              <Typography type="subHeading">
                {msTimeFormatToMin(playbackTimestamp)}
              </Typography>
              <Typography type="subHeading">
                {msTimeFormatToMin(playbackDuration)}
              </Typography>
            </div>
          </div>
          <animated.div style={scaleProps} className={styles.play}>
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
      </div>
      <Drawer
        className={styles.detailed__drawer}
        display={activeNoteID ? 'note' : 'list'}
        isOpen={isOpen}
        onHandleClick={handleHandleClick}
        onBackArrowClick={handleBackArrowClick}
        onOptionsClick={() => console.log('show me options')}
      >
        <div className={styles.drawer__noteWrapper}>
          {activeNoteID ? (
            <NoteCard
              titleValue={titleValue}
              contentValue={contentValue}
              setTitleValue={setTitleValue}
              setContentValue={setContentValue}
              timestampBegin={msTimeFormat(activeNoteTimeStamp)}
              expanded={true}
              handleOnButtonClick={() =>
                console.log('"handle me" - Play Button on Card')
              }
              handleOnTimestampClick={() => console.log('"handle me" - time')}
              handleOnSubmit={(event) => event.preventDefault()}
            />
          ) : (
            <>
              {episodeData.map((episode) => {
                if (episode.title === currentTrack.name) {
                  const episodeNotes = episode.notes?.map((note) => (
                    <NoteCard
                      key={note.id}
                      titleValue={note.title}
                      timestampBegin={msTimeFormat(note.timestamp)}
                      contentValue={note.content}
                      expanded={false}
                      handleOnCardClick={() => handleOnCardClick(note)}
                      handleOnButtonClick={() =>
                        handlePlayButtonCard(note.timestamp)
                      }
                      handleOnSubmit={handleOnSubmit}
                      setTitleValue={() => console.log('Title Changed')}
                      setContentValue={() => console.log('Content Changed')}
                    />
                  ));
                  return episodeNotes;
                }
                return;
              })}
            </>
          )}
        </div>
      </Drawer>
      <Button
        type="circle"
        onButtonClick={
          activeNoteID ? handleBackArrowClick : handleAddButtonClick
        }
        className={styles.detailed__addButton}
      >
        {activeNoteID ? (
          <CheckIcon width={28} height={28} fill="#fff" />
        ) : (
          <AddIcon width={28} height={28} fill="#fff" />
        )}
      </Button>
    </div>
  ) : (
    <div className={`${styles.card__bar} ${className}`}>
      <div
        className={styles.card__progress}
        style={{ right: `${100 - playbackProgress * 100}%` }}
      />
      <img
        src={
          currentTrack.album.images[currentTrack.album.images.length - 1].url
        }
        alt=""
        className={styles.card__cover}
        onClick={() => setPlayerIsDetailed(true)}
      />
      <div
        className={styles.card__text}
        onClick={() => setPlayerIsDetailed(true)}
      >
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
