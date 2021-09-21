import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AddIcon from '../../components/assets/AddIcon';
import Button from '../../components/Button/Button';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import Typography from '../../components/Typography/Typography';
import useEpisodes from '../../hooks/useEpisodes';
import { msTimeFormat } from '../../utils/utils';
import styles from './Home.module.css';

export default function Home(): JSX.Element {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const { episodeData } = useEpisodes();

  function handleOnCardClick(id: string) {
    history.push(`/player/${id}`);
  }

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
              handleOnClick={() => handleOnCardClick(data.id)}
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
