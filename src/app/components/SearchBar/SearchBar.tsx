import React from 'react';
import SearchIcon from '../assets/SearchIcon';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  handleSearch: (event: React.FormEvent) => void;
  className?: string;
};

export default function SearchBar({
  searchValue,
  setSearchValue,
  handleSearch,
  className,
}: SearchBarProps): JSX.Element {
  return (
    <form className={`${styles.search} ${className}`} onSubmit={handleSearch}>
      <SearchIcon width={20} height={20} fill="#c2c2c2" />
      <input
        className={styles.search__input}
        type="search"
        placeholder="title of episode"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </form>
  );
}
