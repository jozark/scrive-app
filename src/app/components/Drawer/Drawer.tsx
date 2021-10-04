import type { ReactNode } from 'react';
import React from 'react';
import { animated, useSpring } from 'react-spring';
import BackArrow from '../assets/BackArrow';
import MoreIcon from '../assets/MoreIcon';
import Button from '../Button/Button';
import styles from './Drawer.module.css';

type DrawerProps = {
  isOpen: boolean;
  onHandleClick: () => void;
  onBackArrowClick: () => void;
  onOptionsClick: () => void;
  display: 'note' | 'list';
  children: ReactNode;
  className?: string;
};

export default function Drawer({
  isOpen,
  onHandleClick,
  onBackArrowClick,
  onOptionsClick,
  display,
  children,
  className,
}: DrawerProps): JSX.Element {
  const heigthProps = useSpring({
    height: isOpen ? '75%' : '5%',
    from: { height: '5%' },
    config: { friction: isOpen ? 21 : 23 },
  });

  return (
    <animated.div
      style={heigthProps}
      className={`${styles.drawer} ${styles[`type--${isOpen}`]} ${className}`}
    >
      <div
        className={`${styles.header} ${styles[`header--${isOpen}`]} ${
          styles[`header--${display}`]
        }`}
      >
        {display === 'note' && (
          <Button type="icon" onButtonClick={onBackArrowClick}>
            <BackArrow
              height={16}
              width={16}
              className={styles.header__icon}
              fill="#C2C2C2"
            />
          </Button>
        )}
        <Button type="icon" onButtonClick={onHandleClick}>
          <div className={styles.header__drag}></div>
        </Button>
        {display === 'note' && (
          <Button type="icon" onButtonClick={onOptionsClick}>
            <MoreIcon
              height={16}
              width={16}
              fill="#C2C2C2"
              className={styles.header__icon}
            />
          </Button>
        )}
      </div>
      <div className={styles.noteWrapper}>{isOpen ? children : ''}</div>
    </animated.div>
  );
}
