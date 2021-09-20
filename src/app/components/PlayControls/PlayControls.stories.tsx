import React from 'react';
import PlayControls from './PlayControls';

export default {
  title: 'Component/PlayControls',
  component: PlayControls,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const playSmall = (): JSX.Element => (
  <PlayControls
    type="squareSmall"
    onBackwardSkip={() => console.log('skip back 15s')}
    onForwardSkip={() => console.log('Skip forward 15s')}
    togglePlay={() => console.log('toggggle')}
  />
);

export const playBig = (): JSX.Element => (
  <PlayControls
    type="squareBig"
    onBackwardSkip={() => console.log('skip back 15s')}
    onForwardSkip={() => console.log('Skip forward 15s')}
    togglePlay={() => console.log('toggggle')}
  />
);

export const pauseSmall = (): JSX.Element => (
  <PlayControls
    type="squareSmall"
    isPlay={false}
    onBackwardSkip={() => console.log('skip back 15s')}
    onForwardSkip={() => console.log('Skip forward 15s')}
    togglePlay={() => console.log('toggggle')}
  />
);

export const pauseBig = (): JSX.Element => (
  <PlayControls
    type="squareBig"
    isPlay={false}
    onBackwardSkip={() => console.log('skip back 15s')}
    onForwardSkip={() => console.log('Skip forward 15s')}
    togglePlay={() => console.log('toggggle')}
  />
);
