import React from 'react';
import NoteCard from './NoteCard';

export default {
  title: 'Component/NoteCard',
  component: NoteCard,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
export const Import = (): JSX.Element => (
  <NoteCard
    title="Mastery requires a Plan"
    timestampBegin="1:25h"
    handleOnCardClick={() => console.log('Button Clicked')}
    handleOnButtonClick={() => console.log('Button Clicked')}
    content="Most people don’t have a plan in in their early 20s. Do things that contribute to your long-term vision."
  />
);
