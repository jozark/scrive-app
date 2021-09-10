import React from 'react';
import TimeIcon from '../assets/TimeIcon';
import styles from './EpisodeCard.module.css';

type EpisodeCardProps = {
  type: 'note' | 'import';
  image: string;
  title: string;
  show: string;
  time: string;
  handleOnClick: () => void;
  className?: string;
};

export default function EpisodeCard({
  image,
  title,
  show,
  time,
  handleOnClick,
  className,
}: EpisodeCardProps): JSX.Element {
  return (
    <div className={`${styles.card} ${className}`} onClick={handleOnClick}>
      <img src={image} alt={`cover of ${title}`} />
      <div>
        <p>{title}</p>
        <p>{show}</p>
        <div className={styles.card__time}>
          <TimeIcon width={10} height={10} />
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
}
