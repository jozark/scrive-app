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
        <div className={styles.expanded}>
          <div className={styles.expanded__header}>
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
              type="rectangle"
              onButtonClick={handleOnButtonClick}
            >
              <PlayIcon width={10} height={10} fill="#fff" />
              <p className={styles.addButton__text}>Play</p>
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
        <article className={styles.card}>
          <section className={styles.card__content} onClick={handleOnCardClick}>
            <Typography type="h3" className={styles.card__title}>
              {titleValue}
            </Typography>
            <Typography type="subHeading">{contentValue}</Typography>
          </section>
          <div className={styles.card__footer}>
            <div className={styles.timestamp}>
              <TimeIcon width={14} height={14} />
              <p className={styles.timestamp__text}>{timestampBegin}</p>
            </div>
            <Button
              className={styles.addButton}
              type="rectangle"
              onButtonClick={handleOnButtonClick}
            >
              <PlayIcon width={10} height={10} fill="#fff" />
              <p className={styles.addButton__text}>Play</p>
            </Button>
          </div>
        </article>
      )}
    </>
  );
}

export default NoteCard;
