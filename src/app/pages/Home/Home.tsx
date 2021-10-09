import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Episode } from '../../../lib/types';
import AddIcon from '../../components/assets/AddIcon';
import NothingHere from '../../components/assets/NothingHere';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import NewEpisodeCard from '../../components/NewEpisodeCard/NewEpisodeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import SpotifyLoginButton from '../../components/SpotifyLoginButton/SpotifyLoginButton';
import Typography from '../../components/Typography/Typography';
import { PlayerContext } from '../../context/PlayerContext';
import useEpisodes from '../../hooks/useEpisodes';
import { msTimeFormat } from '../../utils/utils';
import styles from './Home.module.css';

export default function Home(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const { episodeData, refetch } = useEpisodes();
  const { deviceID, setPlayerIsActive, playerIsActive } =
    useContext(PlayerContext);

  async function playEpisode(uri: string): Promise<void> {
    await fetch(`/api/player/${deviceID}/${uri}`, {
      method: 'PUT',
    });
  }

  useEffect(() => {
    refetch();
  }, []);
  function handleOnCardClick(episode: Episode) {
    setPlayerIsActive(episode.id);
    playEpisode(episode.uri);
  }

  return (
    <main
      className={styles.container}
      style={{ height: `${playerIsActive ? 'calc( 100vh - 60px )' : '100vh'}` }}
    >
      <Header className={styles.header} type="home">
        Scrive
      </Header>
      <div className={styles.tabs}>
        <div className={styles.tabs__typo}>
          <Link to="/">
            <Typography type="h2">Recent</Typography>
          </Link>
          <Link to="/">
            <Typography type="h2">Favorites</Typography>
          </Link>
        </div>
        <Link to="/spotify">
          <Button type="squareSmall">
            <AddIcon width={12} height={12} fill="#fff" />
          </Button>
        </Link>
      </div>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={() => console.log('serrrrrsh')}
      ></SearchBar>
      <div className={styles.cardWrapper}>
        {episodeData.length === 0 && (
          <div className={styles.placeholder}>
            <div className={styles.placeholder__content}>
              <NothingHere />
              <Typography type="h2">nothing here...</Typography>
            </div>
            <Link to="/spotify" className={styles.placeholder__button}>
              <SpotifyLoginButton color="accent">
                Import from Spotify
              </SpotifyLoginButton>
            </Link>
          </div>
        )}
        {episodeData &&
          episodeData.map((data) => (
            <NewEpisodeCard
              key={data.id}
              handleOnClick={() => handleOnCardClick(data)}
              type="note"
              image={data.image}
              title={data.title}
              show={data.show}
              time={msTimeFormat(data.duration).toString()}
              content={data.description}
            />
          ))}
      </div>
    </main>
  );
}
