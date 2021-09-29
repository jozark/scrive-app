import React from 'react';
import Slider from './Slider';

export default {
  title: 'Component/Slider',
  component: Slider,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const addButton = (): JSX.Element => <Slider />;
