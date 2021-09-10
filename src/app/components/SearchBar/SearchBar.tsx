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
    <form
      className={`${styles.container} ${className}`}
      onSubmit={handleSearch}
    >
      <SearchIcon widths={20} height={20} />
      <input
        type="search"
        placeholder="title of episode"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </form>
  );
}
