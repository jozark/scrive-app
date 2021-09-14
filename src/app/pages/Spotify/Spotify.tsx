import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Spotify.module.css';

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
  const [searchValue, setSearchValue] = useState('');

  return (
    <main className={styles.container}>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={() => console.log('search in progress')}
      />
      <div className={styles.cardWrapper}>
        {mockData !== null &&
          mockData.map((data, i) => (
            <EpisodeCard
              key={i}
              type="import"
              image={data.image}
              title={data.title}
              show={data.show}
              time={data.duration}
            />
          ))}
      </div>
    </main>
  );
}
