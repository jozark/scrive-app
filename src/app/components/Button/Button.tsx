import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  type: 'circle' | 'circleWhite' | 'icon' | 'squareSmall' | 'squareBig';
  onButtonClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  type,
  onButtonClick,
  className,
  children,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onButtonClick}
      className={`${styles.button} ${styles[`type--${type}`]} ${className}`}
    >
      {children}
    </button>
  );
}
