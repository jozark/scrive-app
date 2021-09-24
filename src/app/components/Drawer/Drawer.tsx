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
};

export default function Drawer({
  isOpen,
  onHandleClick,
  onBackArrowClick,
  onOptionsClick,
  display,
  children,
}: DrawerProps): JSX.Element {
  const heigthProps = useSpring({
    height: isOpen ? '85%' : '4%',
    from: { height: '4%' },
    config: { friction: isOpen ? 18 : 21 },
  });

  return (
    <div className={styles.container}>
      <animated.div
        style={heigthProps}
        className={`${styles.drawer} ${styles[`type--${isOpen}`]}`}
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
        {children}
      </animated.div>
    </div>
  );
}
