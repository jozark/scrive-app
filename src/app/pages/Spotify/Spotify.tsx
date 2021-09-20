import React, { useState, useEffect } from 'react';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import styles from './Spotify.module.css';
import SpotifyLoginButton from '../../components/SpotifyLoginButton/SpotifyLoginButton';
import { useHistory } from 'react-router';
import useDebounce from '../../hooks/useDebounce';
import useSearchEpisodes from '../../hooks/useSearchEpisodes';
import useEpisodes from '../../hooks/useEpisodes';
import type { Episode } from '../../../lib/types';

export default function Spotify(): JSX.Element {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const { addEpisodeData } = useEpisodes();
  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken(): Promise<void> {
      const response = await fetch('/api/auth/token');
      const data = await response.json();
      setToken(data.token);
    }

    getToken();
  }, []);

  const { episodes, isLoading } = useSearchEpisodes(debouncedValue);

  function handleBackClick() {
    history.push('/');
  }

  function handleAddClick(episode: Episode) {
    addEpisodeData(episode);
    console.log();
  }

  function handleSearch(event: React.FormEvent<Element>) {
    event.preventDefault();
  }

  return (
    <main className={styles.container}>
      <Header
        className={styles.header}
        type="default"
        onBackClick={handleBackClick}
      >
        Import
      </Header>
      {!token ? (
        <>
          <SpotifyLoginButton
            className={styles.loginButton}
            url="/api/auth/login"
          >
            Connect with Spotify
          </SpotifyLoginButton>
        </>
      ) : (
        <>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={(event) => handleSearch(event)}
          />
          {isLoading ? (
            <p>is loading</p>
          ) : (
            <div className={styles.cardWrapper}>
              {episodes &&
                episodes[0]?.title &&
                episodes.map((data, i) => (
                  <EpisodeCard
                    handleButtonClick={() => handleAddClick(data)}
                    key={i}
                    type="import"
                    image={data.image}
                    title={data.title}
                    show={data.show}
                    time={data.duration.toString()}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
