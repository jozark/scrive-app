import React from 'react';
import TimeIcon from '../assets/TimeIcon';
import NoteIcon from '../assets/NoteIcon';
import StarIcon from '../assets/StarIcon';
import AddIcon from '../assets/AddIcon';
import Button from '../Button/Button';
import Fallback from '../assets/fallbackImage.png';
import styles from './EpisodeCard.module.css';
import Typography from '../Typography/Typography';

type EpisodeCardProps = {
  type: 'note' | 'import';
  image?: string;
  title: string;
  show: string;
  time: string;
  notes?: number;
  handleOnClick?: () => void;
  handleButtonClick: () => void;
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
    <article
      className={`${styles.card} ${className} ${styles[`type--${type}`]}`}
      onClick={handleOnClick}
    >
      <img
        className={styles.card__image}
        src={image}
        alt={`cover of ${title}`}
      />
      <section className={styles.card__info}>
        <div>
          <Typography type="h3" className={styles.info__title}>
            {title}
          </Typography>
          <Typography type="subHeading" className={styles.info__show}>
            {show}
          </Typography>
        </div>
        <div className={styles.info__icons}>
          {type === 'note' ? (
            <>
              <div className={styles.icons__container}>
                <div>
                  <TimeIcon width={12} height={12} />
                  <p className={styles.icons__text}>{time}</p>
                </div>
                <div>
                  <NoteIcon width={12} height={12} />
                  <p className={styles.icons__text}>{notes} Notes</p>
                </div>
                <div>
                  <StarIcon width={11} height={11} />
                </div>
              </div>
              <p className={styles.share}>share</p>
            </>
          ) : (
            <div className={styles.icons__timeWrapper}>
              <TimeIcon width={12} height={12} />
              <p className={styles.icons__text}>{time}</p>
            </div>
          )}
        </div>
      </section>
      {type === 'import' && (
        <Button
          className={styles.addButton}
          type="squareSmall"
          onButtonClick={handleButtonClick}
        >
          <AddIcon width={12} height={12} fill="#fff" />
        </Button>
      )}
    </article>
  );
}
