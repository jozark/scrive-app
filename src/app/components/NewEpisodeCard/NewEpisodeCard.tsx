import React from 'react';
import Typography from '../Typography/Typography';
import styles from './NewEpisodeCard.module.css';
import Fallback from '../assets/fallbackImage.png';
import AddIcon from '../assets/AddIcon';
import MoreIcon from '../assets/MoreIcon';
import NoteIcon from '../assets/NoteIcon';
import TimeIcon from '../assets/TimeIcon';
import Button from '../Button/Button';
import PlayIcon from '../assets/PlayIcon';
import ShareIcon from '../assets/ShareIcon';

type NewEpisodeCardProps = {
  type: 'note' | 'import';
  image?: string;
  title: string;
  show: string;
  time: string;
  content: string;
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
  content,
  handleButtonClick,
  className,
}: NewEpisodeCardProps): JSX.Element {
  return (
    <article className={`${styles.card} ${className} `} onClick={handleOnClick}>
      <section className={styles.card__header}>
        <img
          className={styles.header__image}
          src={image}
          alt={`cover of ${title}`}
        />
        <div>
          <Typography type="h3" className={styles.header__title}>
            {title}
          </Typography>
          <Typography type="subHeading" className={styles.header__show}>
            {show}
          </Typography>
        </div>
      </section>
      <Typography type="subHeading" className={styles.description}>
        {content}
      </Typography>
      <div className={styles.icons}>
        <div className={styles.icons__container}>
          <div>
            <TimeIcon width={14} height={14} />
            <p className={styles.icons__textTime}>{time}</p>
          </div>
          {type === 'note' && (
            <div>
              <NoteIcon width={12} height={12} />
              <p className={styles.icons__text}>{notes} Notes</p>
            </div>
          )}
        </div>
        <div className={styles.icon__action}>
          {type === 'note' && (
            <>
              <Button
                type="icon"
                onButtonClick={() => console.log('fhsdf')}
                className={styles.more}
              >
                <ShareIcon width={13} height={13} fill="#fff" />
              </Button>
              <Button
                type="icon"
                onButtonClick={() => console.log('fhsdf')}
                className={styles.more}
              >
                <MoreIcon width={13} height={13} fill="#fff" />
              </Button>
            </>
          )}
          <Button
            className={styles.addButton}
            type="squareSmall"
            onButtonClick={handleButtonClick}
          >
            {type === 'note' ? (
              <PlayIcon width={11} height={11} fill="#fff" />
            ) : (
              <AddIcon width={11} height={11} fill="#fff" />
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
