import React from 'react';
import OverlayPlayer from './OverlayPlayer';

export default {
  title: 'Component/OverlayPlayer',
  component: OverlayPlayer,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const addButton = (): JSX.Element => <OverlayPlayer />;
