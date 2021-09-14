import React from 'react';
import AddIcon from '../assets/AddIcon';
import PlayIcon from '../assets/PlayIcon';
import SkipIcon from '../assets/SkipIcon';
import ShareIcon from '../assets/ShareIcon';
import Button from './Button';

export default {
  title: 'Component/Button',
  component: Button,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const addButton = (): JSX.Element => (
  <Button type="circle" onButtonClick={() => console.log('click')}>
    <AddIcon width={28} height={28} fill="#fff" />
  </Button>
);

export const cancelButton = (): JSX.Element => (
  <Button type="circleWhite" onButtonClick={() => console.log('click')}>
    <AddIcon width={28} height={28} fill="#000" transform="rotate(45)" />
  </Button>
);

export const addSquareSmall = (): JSX.Element => (
  <Button type="squareSmall" onButtonClick={() => console.log('click')}>
    <AddIcon width={12} height={12} fill="#fff" />
  </Button>
);

export const playSquareSmall = (): JSX.Element => (
  <Button type="squareSmall" onButtonClick={() => console.log('click')}>
    <PlayIcon width={12} height={12} fill="#fff" />
  </Button>
);

export const playSquareBig = (): JSX.Element => (
  <Button type="squareBig" onButtonClick={() => console.log('click')}>
    <PlayIcon width={28} height={28} fill="#fff" />
  </Button>
);

export const skipIcon = (): JSX.Element => (
  <Button type="icon" onButtonClick={() => console.log('click')}>
    <SkipIcon width={14} height={14} fill="#fff" />
  </Button>
);

export const shareIcon = (): JSX.Element => (
  <Button type="icon" onButtonClick={() => console.log('click')}>
    <ShareIcon width={14} height={14} fill="#fff" />
  </Button>
);
