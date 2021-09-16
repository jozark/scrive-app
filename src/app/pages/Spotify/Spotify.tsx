import React, { useState, useEffect } from 'react';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import styles from './Spotify.module.css';
import SpotifyLoginButton from '../../components/SpotifyLoginButton/SpotifyLoginButton';
import { useHistory } from 'react-router';

const mockData = [
  {
    image: 'https://i.scdn.co/image/07fa4012411c0244688d53c6b68aea10184cdf80',
    show: 'Philosophize This!',
    title: 'Episode #103 Sarte and Camus pt. 4',
    duration: '1:25h',
  },
  {
    image: 'https://i.scdn.co/image/07fa4012411c0244688d53c6b68aea10184cdf80',
    show: 'Philosophize This!',
    title: 'Episode #103 Sarte and Camus pt. 4',
    duration: '1:25h',
  },
  {
    image: 'https://i.scdn.co/image/07fa4012411c0244688d53c6b68aea10184cdf80',
    show: 'Philosophize This!',
    title: 'Episode #103 Sarte and Camus pt. 4',
    duration: '1:25h',
  },
  {
    image: 'https://i.scdn.co/image/07fa4012411c0244688d53c6b68aea10184cdf80',
    show: 'Philosophize This!',
    title: 'Episode #103 Sarte and Camus pt. 4',
    duration: '1:25h',
  },
  {
    image: 'https://i.scdn.co/image/07fa4012411c0244688d53c6b68aea10184cdf80',
    show: 'Philosophize This!',
    title: 'Episode #103 Sarte and Camus pt. 4',
    duration: '1:25h',
  },
  {
    image: 'https://i.scdn.co/image/07fa4012411c0244688d53c6b68aea10184cdf80',
    show: 'Philosophize This!',
    title: 'Episode #103 Sarte and Camus pt. 4',
    duration: '1:25h',
  },
  {
    image: 'https://i.scdn.co/image/07fa4012411c0244688d53c6b68aea10184cdf80',
    show: 'Philosophize This!',
    title: 'Episode #103 Sarte and Camus pt. 4',
    duration: '1:25h',
  },
  {
    image: 'https://i.scdn.co/image/07fa4012411c0244688d53c6b68aea10184cdf80',
    show: 'Philosophize This!',
    title: 'Episode #103 Sarte and Camus pt. 4',
    duration: '1:25h',
  },
];

export default function Spotify(): JSX.Element {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken(): Promise<void> {
      const response = await fetch('/api/auth/token');
      const data = await response.json();
      setToken(data.token);
    }

    getToken();
  }, []);

  const handleBackClick = () => {
    history.push('/');
  };

  return (
    <main className={styles.container}>
      {!token ? (
        <SpotifyLoginButton url="/api/auth/login">
          Connect with Spotify
        </SpotifyLoginButton>
      ) : (
        <>
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
            handleSearch={() => console.log('search in progress')}
          />
          <div className={styles.cardWrapper}>
            {mockData !== null &&
              mockData.map((data, i) => (
                <EpisodeCard
                  handleButtonClick={() => console.log('click')}
                  key={i}
                  type="import"
                  image={data.image}
                  title={data.title}
                  show={data.show}
                  time={data.duration}
                />
              ))}
          </div>
        </>
      )}
    </main>
  );
}
