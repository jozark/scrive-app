import React from 'react';
import SpotifyLogo from './../assets/spotify-logo';
import styles from './SpotifyLoginButton.module.css';

export type SpotifyLoginButtonProps = {
  children: React.ReactNode;
  className?: string;
  url: string;
  color: 'spotify' | 'accent';
};

export default function SpotifyLoginButton({
  children,
  className,
  url,
  color,
}: SpotifyLoginButtonProps): JSX.Element {
  return (
    <a
      href={url}
      className={`${styles.loginLink} ${className} ${styles[color]}`}
    >
      <SpotifyLogo width={32} height={32} />
      <p className={styles.button__text}>{children}</p>
    </a>
  );
}
