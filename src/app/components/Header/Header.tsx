import React from 'react';
import BackIcon from '../assets/BackIcon';
import MoreIcon from '../assets/MoreIcon';
import Typography from '../Typography/Typography';
import styles from './Header.module.css';

type HeaderProps = {
  type: 'options' | 'default' | 'home';
  children: React.ReactNode;
  className?: string;
};

export default function Header({
  children,
  type = 'default',
  className,
}: HeaderProps): JSX.Element {
  if (type === 'home') {
    return (
      <Typography className={className} type="h1">
        Scrive
      </Typography>
    );
  } else {
    return (
      <header className={`${styles.header} ${className}`}>
        <BackIcon width={24} />
        <Typography type="h2" className={styles.header__text}>
          {children}
        </Typography>
        {type === 'options' && <MoreIcon height={18} />}
      </header>
    );
  }
}
