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
export const card = (): JSX.Element => (
  <NoteCard
    titleValue="Mastery requires a Plan"
    timestampBegin="1:25h"
    handleOnCardClick={() => console.log('Card Clicked')}
    handleOnButtonClick={() => console.log('Button Clicked')}
    handleOnTimestampClick={() => console.log('Timestamp Clicked')}
    handleOnSubmit={() => console.log('submitted')}
    contentValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    expanded={false}
    setTitleValue={() => console.log('Title Changed')}
    setContentValue={() => console.log('Content Changed')}
  />
);
export const expanded = (): JSX.Element => (
  <NoteCard
    titleValue="Mastery requires a Plan"
    timestampBegin="1:25h"
    handleOnCardClick={() => console.log('Button Clicked')}
    handleOnButtonClick={() => console.log('Button Clicked')}
    handleOnTimestampClick={() => console.log('Timestamp Clicked')}
    handleOnSubmit={() => console.log('submitted')}
    contentValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.."
    expanded={true}
    setTitleValue={() => console.log('Title Changed')}
    setContentValue={() => console.log('Content Changed')}
  />
);
