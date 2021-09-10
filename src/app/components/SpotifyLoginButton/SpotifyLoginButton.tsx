import React from 'react';
import SpotifyLogo from './../assets/spotify-logo';
import styles from './SpotifyLoginButton.module.css';
import { Link } from 'react-router-dom';

export type SpotifyLoginButtonProps = {
  children: React.ReactNode;
  className?: string;
  url: string;
};

export default function SpotifyLoginButton({
  children,
  className,
  url,
}: SpotifyLoginButtonProps): JSX.Element {
  return (
    <Link to={url} className={`${styles.button} ${className}`}>
      <SpotifyLogo width={32} height={32} />
      <p className={styles.button__text}>{children}</p>
      {/* replace with Button Typo */}
    </Link>
  );
}
