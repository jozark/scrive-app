import React, { useState } from 'react';
import NoteCard from '../NoteCard/NoteCard';
import styles from './Drawer.module.css';
import { useSpring, animated } from 'react-spring';
import PlayControls from '../PlayControls/PlayControls';

function Drawer(): JSX.Element {
  const [open, setOpen] = useState<boolean>(true);
  const mockData = [
    {
      title: 'Mastery requires a Plan',
      timestampBegin: '1:25h',
      handleOnCardClick: () => console.log('Button Clicked'),
      handleOnButtonClick: () => console.log('Button Clicked'),
      content:
        'Most people don’t have a plan in in their early 20s. Do things that contribute to your long-term vision.',
    },
    {
      title: 'Mastery requires a Plan',
      timestampBegin: '1:25h',
      handleOnCardClick: () => console.log('Button Clicked'),
      handleOnButtonClick: () => console.log('Button Clicked'),
      content:
        'Most people don’t have a plan in in their early 20s. Do things that contribute to your long-term vision.',
    },
    {
      title: 'Mastery requires a Plan',
      timestampBegin: '1:25h',
      handleOnCardClick: () => console.log('Button Clicked'),
      handleOnButtonClick: () => console.log('Button Clicked'),
      content:
        'Most people don’t have a plan in in their early 20s. Do things that contribute to your long-term vision.',
    },
    {
      title: 'Mastery requires a Plan',
      timestampBegin: '1:25h',
      handleOnCardClick: () => console.log('Button Clicked'),
      handleOnButtonClick: () => console.log('Button Clicked'),
      content:
        'Most people don’t have a plan in in their early 20s. Do things that contribute to your long-term vision.',
    },
    {
      title: 'Mastery requires a Plan',
      timestampBegin: '1:25h',
      handleOnCardClick: () => console.log('Button Clicked'),
      handleOnButtonClick: () => console.log('Button Clicked'),
      content:
        'Most people don’t have a plan in in their early 20s. Do things that contribute to your long-term vision.',
    },
    {
      title: 'Mastery requires a Plan',
      timestampBegin: '1:25h',
      handleOnCardClick: () => console.log('Button Clicked'),
      handleOnButtonClick: () => console.log('Button Clicked'),
      content:
        'Most people don’t have a plan in in their early 20s. Do things that contribute to your long-term vision.',
    },
    {
      title: 'Mastery requires a Plan',
      timestampBegin: '1:25h',
      handleOnCardClick: () => console.log('Button Clicked'),
      handleOnButtonClick: () => console.log('Button Clicked'),
      content:
        'Most people don’t have a plan in in their early 20s. Do things that contribute to your long-term vision.',
    },
  ];

  const heigthProps = useSpring({
    height: open ? '80vh' : '5vh',
    from: { height: '5vh' },
    config: { friction: open ? 18 : 21 },
  });

  const scaleProps = useSpring({
    transform: open ? 'scale(0.7)' : 'scale(1)',
    from: { transform: 'scale(1)' },
    config: { friction: open ? 18 : 21 },
  });

  return (
    <div className={styles.container}>
      <button style={{ marginBottom: '0.5rem' }}>newNote</button>

      <animated.div style={scaleProps} className={styles.play}>
        <PlayControls
          type={'squareBig'}
          onBackwardSkip={() => console.log('skip back 15s')}
          onForwardSkip={() => console.log('Skip forward 15s')}
          togglePlay={() => console.log('toggggle')}
        />
      </animated.div>
      <animated.div
        style={heigthProps}
        className={`${styles.drawer} ${styles[`type--${open}`]}`}
      >
        <div
          className={`${styles.header} ${styles[`header--${open}`]}`}
          onClick={() => setOpen(!open)}
        >
          <p>header</p>
        </div>
        <div className={styles.noteWrapper}>
          {mockData &&
            mockData.map((data, i) => (
              <NoteCard
                key={i}
                title={data.title}
                timestampBegin={data.timestampBegin}
                handleOnCardClick={() => console.log('card')}
                handleOnButtonClick={() => console.log('button')}
                content={data.content}
              />
            ))}
        </div>
      </animated.div>
    </div>
  );
}

export default Drawer;
