import React from 'react';
import BackIcon from '../assets/BackIcon';
import MoreIcon from '../assets/MoreIcon';
import styles from './Header.module.css';

type HeaderProps = {
  type: 'options' | 'noOptions' | 'home';
  children: React.ReactNode;
};

export default function Header({ children, type }: HeaderProps): JSX.Element {
  if (type === 'home') {
    return <h1>Scrive</h1>;
  } else {
    return (
      <header className={styles.header}>
        <BackIcon width={24} />
        <h2>{children}</h2>
        {type === 'options' && <MoreIcon height={18} />}
      </header>
    );
  }
}
