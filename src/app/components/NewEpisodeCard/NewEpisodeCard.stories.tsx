import React from 'react';
import NewEpisodeCard from './NewEpisodeCard';

export default {
  title: 'Component/NewEpisodeCard',
  component: NewEpisodeCard,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
export const Import = (): JSX.Element => <NewEpisodeCard />;
