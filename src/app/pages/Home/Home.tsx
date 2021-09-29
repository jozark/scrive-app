import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import type { Episode } from '../../../lib/types';
import AddIcon from '../../components/assets/AddIcon';
import Button from '../../components/Button/Button';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import Typography from '../../components/Typography/Typography';
import { PlayerContext } from '../../context/PlayerContext';
import useEpisodes from '../../hooks/useEpisodes';
import { msTimeFormat } from '../../utils/utils';
import styles from './Home.module.css';

type HomeProps = {
  token: string;
};

export default function Home({ token }: HomeProps): JSX.Element {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const { episodeData } = useEpisodes();
  const { deviceID, setPlayerIsActive } = useContext(PlayerContext);

  async function playEpisode(uri: string): Promise<void> {
    await fetch(`/api/player/${deviceID}/${uri}`, {
      method: 'PUT',
    });
  }

  function handleOnCardClick(episode: Episode) {
    setPlayerIsActive(episode.id);
    playEpisode(episode.uri);
  }

  const playerInfo = async () => {
    const response = await fetch(`https://api.spotify.com/v1/me/player`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const playerData = await response.json();
    console.log(playerData);
  };

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
    // console.log(devicesData);
  };

  useEffect(() => {
    playerInfo();
    devicesInfo();
  }, []);

  return (
    <main className={styles.container}>
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
        {episodeData &&
          episodeData.map((data) => (
            <EpisodeCard
              key={data.id}
              handleOnClick={() => handleOnCardClick(data)}
              type="note"
              image={data.image}
              title={data.title}
              show={data.show}
              time={msTimeFormat(data.duration).toString()}
            />
          ))}
      </div>
    </main>
  );
}
