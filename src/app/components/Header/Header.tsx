import React from 'react';
import BackIcon from '../assets/BackIcon';
import MoreIcon from '../assets/MoreIcon';
import Typography from '../Typography/Typography';
import styles from './Header.module.css';

type HeaderProps = {
  type: 'options' | 'noOptions' | 'home';
  children: React.ReactNode;
};

export default function Header({ children, type }: HeaderProps): JSX.Element {
  if (type === 'home') {
    return <Typography type="h1">Scrive</Typography>;
  } else {
    return (
      <header className={styles.header}>
        <BackIcon width={24} />
        <Typography type="h2" className={styles.header__text}>
          {children}
        </Typography>
        {type === 'options' && <MoreIcon height={18} />}
      </header>
    );
  }
}
