import React from 'react';
import styles from './Searchbar.module.css';

type SearchBarProps = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  handleSearch: () => void;
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
      <input
        type="search"
        placeholder="title of episode"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </form>
  );
}
