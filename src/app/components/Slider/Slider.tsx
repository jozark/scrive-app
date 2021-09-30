import React, { useEffect, useState } from 'react';
import styles from './Slider.module.css';

type SliderProps = {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  percentageValue: number;
  className?: string;
};

export default function Slider({
  percentageValue: percentage,
  handleOnChange,
  className,
}: SliderProps): JSX.Element {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    const handleWidth = 13;
    const centerHandle = (handleWidth / 100) * percentage * -1;
    setMarginLeft(centerHandle);
    setPosition(percentage);
  }, [percentage]);

  return (
    <div className={`${styles.container} ${className}`}>
      <div
        className={styles.progressbar}
        style={{ width: `${position}%` }}
      ></div>
      <div
        className={styles.handle}
        style={{ left: `${position}%`, marginLeft: `${marginLeft}px` }}
      ></div>
      <input
        className={styles.slider}
        value={position}
        type="range"
        step="0.01"
        onChange={handleOnChange}
      />
    </div>
  );
}
