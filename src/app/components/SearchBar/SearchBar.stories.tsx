import React from 'react';
import SearchBar from './SearchBar';

export default {
  title: 'Component/Search',
  component: SearchBar,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const SearchInactive = (): JSX.Element => (
  <SearchBar
    searchValue=""
    setSearchValue={(searchValue) => console.log(searchValue)}
    handleSearch={() => console.log('Search in Progress')}
  />
);
export const SearchActive = (): JSX.Element => (
  <SearchBar
    searchValue="Lex Fridman Joscha Bach"
    setSearchValue={(searchValue) => console.log(searchValue)}
    handleSearch={() => console.log('Search in Progress')}
  />
);
