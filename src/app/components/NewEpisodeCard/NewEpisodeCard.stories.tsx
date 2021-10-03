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

export const Import = (): JSX.Element => (
  <NewEpisodeCard
    handleButtonClick={() => console.log('button')}
    type="import"
    image={''}
    title="This is the best Episode I have ever listened to"
    show="The best Show"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti saepe ipsam, nihil illum consectetur fuga doloremque tempora non temporibus? Incidunt!"
    time="20min"
  />
);
