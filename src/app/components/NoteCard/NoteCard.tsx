import React from 'react';
import PlayIcon from '../assets/PlayIcon';
import TimeIcon from '../assets/TimeIcon';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import styles from './NoteCard.module.css';

type NoteCardProps = {
  title: string;
  content: string;
  timestampBegin: string;
  handleOnCardClick: () => void;
  handleOnButtonClick: () => void;
};

function NoteCard({
  title,
  content,
  timestampBegin,
  handleOnCardClick,
  handleOnButtonClick,
}: NoteCardProps): JSX.Element {
  return (
    <div className={styles.card} onClick={handleOnCardClick}>
      <article>
        <Typography type="h3" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.timestamp}>
          <TimeIcon width={12} height={12} />
          <p className={styles.timestamp__text}>{timestampBegin}</p>
        </div>
        <section className={styles.content}>{content}</section>
      </article>
      <Button
        className={styles.addButton}
        type="squareSmall"
        onButtonClick={handleOnButtonClick}
      >
        <PlayIcon width={12} height={12} fill="#fff" />
      </Button>
    </div>
  );
}

export default NoteCard;
