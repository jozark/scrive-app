import React from 'react';
import Header from './Header';

export default {
  title: 'Component/Header',
  component: Header,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const optionsHeader = (): JSX.Element => (
  <Header type="options">Aristotle Pt.2</Header>
);

export const noOptionsHeader = (): JSX.Element => (
  <Header type="noOptions">Aristotle Pt.3</Header>
);

export const home = (): JSX.Element => <Header type="home">Scrive</Header>;
