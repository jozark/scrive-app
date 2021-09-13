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
      <img
        className={styles.card__image}
        src={image}
        alt={`cover of ${title}`}
      />
      <div className={styles.card__info}>
        <div>
          <p className={styles.info__title}>{title}</p>
          <p className={styles.info__show}>{show}</p>
        </div>
        <div className={styles.info__time}>
          <TimeIcon width={13} height={13} />
          <p className={styles.time__text}>{time}</p>
        </div>
      </div>
      <button>+</button>
      {/* TODO Change with Button Component */}
    </div>
  );
}
