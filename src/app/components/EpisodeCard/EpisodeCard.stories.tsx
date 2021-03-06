import React from 'react';
import EpisodeCard from './EpisodeCard';

export default {
  title: 'Component/EpisodeCard',
  component: EpisodeCard,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
export const Import = (): JSX.Element => (
  <EpisodeCard
    type="import"
    show="Philosophize This!"
    title="Aristotle Pt. 1"
    time="1:25h"
    handleButtonClick={() => console.log('Button Clicked')}
  />
);

export const Note = (): JSX.Element => (
  <EpisodeCard
    type="note"
    notes={25}
    image="https://upload.wikimedia.org/wikipedia/en/4/4b/The_Joe_Rogan_Experience_logo.jpg"
    show="Philosophize This!"
    title="Aristotle Pt. 1"
    time="1:25h"
    handleOnClick={() => console.log('click')}
  />
);
