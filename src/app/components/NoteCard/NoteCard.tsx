import React from 'react';
import PlayIcon from '../assets/PlayIcon';
import TimeIcon from '../assets/TimeIcon';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import styles from './NoteCard.module.css';
import TextareaAutosize from 'react-textarea-autosize';

type NoteCardProps = {
  expanded: boolean;
  titleValue: string;
  contentValue: string;
  timestampBegin: string;
  handleOnCardClick: () => void;
  handleOnButtonClick: () => void;
  handleOnTimestampClick: () => void;
  setTitleValue: (titleValue: string) => void;
  setContentValue: (contentValue: string) => void;
  handleOnSubmit: (event: React.FormEvent) => void;
};

function NoteCard({
  expanded,
  titleValue,
  setTitleValue,
  contentValue,
  setContentValue,
  timestampBegin,
  handleOnCardClick,
  handleOnButtonClick,
  handleOnTimestampClick,
  handleOnSubmit,
}: NoteCardProps): JSX.Element {
  return (
    <>
      {expanded ? (
        <div className={styles.expandedCard}>
          <div className={styles.header}>
            <div className={styles.header__time}>
              <TimeIcon width={16} height={16} />
              <Typography type="p">Timestamp:</Typography>
              <p
                className={styles.time__begin}
                onClick={handleOnTimestampClick}
              >
                {timestampBegin}
              </p>
            </div>
            <Button
              className={styles.addButton}
              type="squareSmall"
              onButtonClick={handleOnButtonClick}
            >
              <PlayIcon width={12} height={12} fill="#fff" />
            </Button>
          </div>
          <form className={styles.form} onSubmit={handleOnSubmit}>
            <input
              className={styles.form__title}
              type="text"
              placeholder="Titel..."
              value={titleValue}
              onChange={(event) => setTitleValue(event.target.value)}
            />
            <TextareaAutosize
              className={styles.form__content}
              minRows={10}
              value={contentValue}
              onChange={(event) => setContentValue(event.target.value)}
            />
          </form>
        </div>
      ) : (
        <div className={styles.card} onClick={handleOnCardClick}>
          <article>
            <Typography type="h3" className={styles.title}>
              {titleValue}
            </Typography>
            <div className={styles.timestamp}>
              <TimeIcon width={12} height={12} />
              <p className={styles.timestamp__text}>{timestampBegin}</p>
            </div>
            <section className={styles.content}>{contentValue}</section>
          </article>
          <Button
            className={styles.addButton}
            type="squareSmall"
            onButtonClick={handleOnButtonClick}
          >
            <PlayIcon width={12} height={12} fill="#fff" />
          </Button>
        </div>
      )}
    </>
  );
}

export default NoteCard;
