import React, { useState, useContext } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import styles from './Spotify.module.css';
import { useHistory } from 'react-router';
import useDebounce from '../../hooks/useDebounce';
import useSearchEpisodes from '../../hooks/useSearchEpisodes';
import { msTimeFormat } from '../../utils/utils';
import useEpisodes from '../../hooks/useEpisodes';
import type { Episode } from '../../../lib/types';
import { PlayerContext } from '../../context/PlayerContext';
import NewEpisodeCard from '../../components/NewEpisodeCard/NewEpisodeCard';

export default function Spotify(): JSX.Element {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const { addEpisodeData } = useEpisodes();

  const { playerIsActive } = useContext(PlayerContext);

  const { episodes } = useSearchEpisodes(debouncedValue);

  function handleBackClick() {
    history.push('/');
  }

  function handleAddClick(episode: Episode) {
    addEpisodeData({ ...episode, notes: [] });
    history.push('/');
  }

  function handleSearch(event: React.FormEvent<Element>) {
    event.preventDefault();
  }

  return (
    <main
      className={`${styles.container}`}
      style={{ height: `${playerIsActive ? 'calc( 100vh - 60px )' : '100vh'}` }}
    >
      <Header
        className={styles.header}
        type="default"
        onBackClick={handleBackClick}
      >
        Import
      </Header>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={(event) => handleSearch(event)}
      />
      <div className={styles.cardWrapper}>
        {episodes &&
          episodes[0]?.title &&
          episodes.map((data) => (
            <NewEpisodeCard
              key={data.id}
              handleOnClick={() => console.log('EpisodePage')}
              handleButtonClick={() => handleAddClick(data)}
              type="import"
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
