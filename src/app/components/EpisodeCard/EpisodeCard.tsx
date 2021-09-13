import React from 'react';
import TimeIcon from '../assets/TimeIcon';
import NoteIcon from '../assets/NoteIcon';
import StarIcon from '../assets/StarIcon';
import Fallback from '../assets/fallbackImage.png';
import styles from './EpisodeCard.module.css';

type EpisodeCardProps = {
  type: 'note' | 'import';
  image?: string;
  title: string;
  show: string;
  time: string;
  notes?: number;
  handleOnClick?: () => void;
  handleButtonClick?: () => void;
  className?: string;
};

export default function EpisodeCard({
  type,
  image = Fallback,
  title,
  show,
  time,
  notes,
  handleOnClick,
  handleButtonClick,
  className,
}: EpisodeCardProps): JSX.Element {
  return (
    <div
      className={`${styles.card} ${className} ${styles[`type--${type}`]}`}
      onClick={handleOnClick}
    >
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
        <div className={styles.info__icons}>
          {type === 'note' ? (
            <>
              <div className={styles.icons__container}>
                <div>
                  <TimeIcon width={13} height={13} />
                  <p className={styles.icons__text}>{time}</p>
                </div>
                <div>
                  <NoteIcon width={13} height={13} />
                  <p className={styles.icons__text}>{notes} Notes</p>
                </div>
                <div>
                  <StarIcon width={14} height={14} />
                </div>
              </div>
              <p className={styles.share}>share</p>
            </>
          ) : (
            <div className={styles.icons__timeWrapper}>
              <TimeIcon width={13} height={13} />
              <p className={styles.icons__text}>{time}</p>
            </div>
          )}
        </div>
      </div>
      {type === 'import' && (
        <button className={styles.addButton} onClick={handleButtonClick}>
          +
        </button>
      )}
      {/* TODO Change with Button and Icon Component */}
    </div>
  );
}
