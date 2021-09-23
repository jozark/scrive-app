import React from 'react';
import PlayIcon from '../assets/PlayIcon';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import styles from './OverlayPlayer.module.css';

export default function OverlayPlayer(): JSX.Element {
  return (
    <div className={styles.bar}>
      <img
        src="https://i.scdn.co/image/595e27535dc0a4f2e5a050c6392ebade0f9affc8"
        alt=""
        className={styles.cover}
      />
      <div className={styles.text}>
        <Typography type="p" className={styles.text__head}>
          Aritotle Pt. 2
        </Typography>
        <p className={styles.text__sub}>Philosophize This</p>
      </div>
      <Button type={'squareSmall'} className={styles.play}>
        <PlayIcon width={12} height={12} fill="#fff" />
      </Button>
    </div>
  );
}
