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
import { msTimeFormat } from '../../utils/utils';
import NoteCard from '../NoteCard/NoteCard';
import AddIcon from '../assets/AddIcon';
import useEpisodes from '../../hooks/useEpisodes';
import type { Note } from '../../../lib/types';
import { v1 as uuidv1 } from 'uuid';
import CheckIcon from '../assets/CheckIcon';
import Slider from '../Slider/Slider';

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

  const scaleProps = useSpring({
    transform: isOpen ? 'scale(0.65)' : 'scale(1)',
    from: { transform: 'scale(1)' },
    config: { friction: isOpen ? 18 : 21 },
  });

  const vanishProps = useSpring({
    transform: isOpen ? 'scale(0)' : 'scale(1)',
    from: { transform: 'scale(1)' },
  });

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
      setPlaybackProgress(position / duration);
      player.getCurrentState().then((state) => {
        !state ? setActive(false) : setActive(true);
      });
    });
  };

  function handleBackClick() {
    setPlayerIsDetailed(false);
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

  function handleAddButtonClick() {
    console.log(playbackProgress);
    setTitleValue('');
    setContentValue('');

    const newNote: Note = {
      id: uuidv1(),
      title: titleValue,
      content: contentValue,
      timestamp: playbackProgress,
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
          <>
            <animated.div style={vanishProps} className={styles.playback}>
              <img
                src={
                  currentTrack.album.images[
                    currentTrack.album.images.length - 1
                  ].url
                }
                className={styles.playback__cover}
                alt=""
              />
            </animated.div>
            <div className={styles.playback__info}>
              <Typography type="h2" className={styles.info__name}>
                {currentTrack.name}
              </Typography>
              <Typography type="subHeading" className={styles.info__artist}>
                {currentTrack.artists[0].name}
              </Typography>
            </div>
          </>
        )}
        <div className={`${styles.controls} ${styles[`controls--${isOpen}`]}`}>
          <div className={styles.slider}>
            <Slider
              handleOnChange={() => console.log('change')}
              percentageValue={playbackProgress * 100}
            />
            <div className={styles.slider__time}>
              <Typography type="subHeading">0:00</Typography>
              <Typography type="subHeading">3:00</Typography>
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
        className={styles.drawer}
        display={activeNoteID ? 'note' : 'list'}
        isOpen={isOpen}
        onHandleClick={handleHandleClick}
        onBackArrowClick={handleBackArrowClick}
        onOptionsClick={() => console.log('show me options')}
      >
        <div className={styles.noteWrapper}>
          {activeNoteID ? (
            <NoteCard
              titleValue={titleValue}
              contentValue={contentValue}
              setTitleValue={setTitleValue}
              setContentValue={setContentValue}
              //change to time snap rather than state
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
                        console.log('"handle me" - Play Button on Card')
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
        onButtonClick={handleAddButtonClick}
        className={styles.addButton}
      >
        {activeNoteID ? (
          <CheckIcon width={28} height={28} fill="#fff" />
        ) : (
          <AddIcon width={28} height={28} fill="#fff" />
        )}
      </Button>
    </div>
  ) : (
    <div
      className={`${styles.bar} ${className}`}
      onClick={() => setPlayerIsDetailed(true)}
    >
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
