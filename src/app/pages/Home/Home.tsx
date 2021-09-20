import React, { useState } from 'react';
import AddIcon from '../../components/assets/AddIcon';
import Button from '../../components/Button/Button';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import Typography from '../../components/Typography/Typography';
import useEpisodes from '../../hooks/useEpisodes';
import styles from './Home.module.css';

export default function Home(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const { episodeData } = useEpisodes();
  function handleAddButtonClick() {
    console.log('object');
  }

  return (
    <main className={styles.container}>
      <Header className={styles.header} type="home">
        Scrive
      </Header>
      <div className={styles.tabs}>
        <div className={styles.tabs__typo}>
          <Typography type="h2">Recent</Typography>
          <Typography type="h2">Favorites</Typography>
        </div>
        <Button type="squareSmall" onButtonClick={handleAddButtonClick}>
          <AddIcon width={12} height={12} fill="#fff" />
        </Button>
      </div>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={() => console.log('serrrrrsh')}
      ></SearchBar>
      <div className={styles.cardWrapper}>
        {episodeData &&
          episodeData.map((data, i) => (
            <EpisodeCard
              key={i}
              type="note"
              image={data.image}
              title={data.title}
              show={data.show}
              time={data.duration.toString()}
            />
          ))}
      </div>
    </main>
  );
}
