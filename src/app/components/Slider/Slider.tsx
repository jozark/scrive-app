import React, { useState } from 'react';
import styles from './Slider.module.css';

type SliderProps = {
  onChange: () => void;
  className: string;
};

export default function Slider(): JSX.Element {
  const [percentage, setPercentage] = useState(0);

  function testChange(event: any) {
    setPercentage(event.target.value);
  }

  console.log(percentage);

  return (
    <div className={`${styles.slider}`}>
      <input type="range" step="0.1" onChange={(event) => testChange(event)} />
    </div>
  );
}
