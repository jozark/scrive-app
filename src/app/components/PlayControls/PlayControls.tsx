import React from 'react';
import PlayIcon from '../assets/PlayIcon';
import PauseIcon from '../assets/PauseIcon';
import SkipIcon from '../assets/SkipIcon';
import Button from '../Button/Button';
import styles from './PlayControls.module.css';

type PlayControlsProps = {
  type: 'squareBig' | 'squareSmall';
  isPlay?: boolean;
  className?: string;
  onForwardSkip: () => void;
  onBackwardSkip: () => void;
  togglePlay: () => void;
};

export default function PlayControls({
  className,
  type,
  isPlay = true,
  onBackwardSkip,
  onForwardSkip,
  togglePlay,
}: PlayControlsProps): JSX.Element {
  const skipSizeMap = {
    squareBig: {
      width: 18,
      height: 18,
    },
    squareSmall: {
      width: 14,
      height: 14,
    },
  };

  const playSizeMap = {
    squareBig: {
      width: 24,
      height: 24,
    },
    squareSmall: {
      width: 12,
      height: 12,
    },
  };

  return (
    <div
      className={`${styles.controls} ${styles[`type--${type}`]} ${className}`}
    >
      <Button type="icon" onButtonClick={onBackwardSkip}>
        <SkipIcon {...skipSizeMap[type]} fill="#fff" transform="rotate(180)" />
      </Button>
      <Button type={type} onButtonClick={togglePlay}>
        {isPlay ? (
          <PlayIcon {...playSizeMap[type]} fill="#fff" />
        ) : (
          <PauseIcon {...playSizeMap[type]} fill="#fff" />
        )}
      </Button>
      <Button type="icon" onButtonClick={onForwardSkip}>
        <SkipIcon {...skipSizeMap[type]} fill="#fff" />
      </Button>
    </div>
  );
}
