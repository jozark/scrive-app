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

export const AudioSlider = (): JSX.Element => (
  <Slider
    percentageValue={0}
    handleOnChange={() => console.log('changes')}
    handleOnMouseUp={() => console.log('changes')}
    handleOnTouchEnd={() => console.log('changes')}
  />
);
