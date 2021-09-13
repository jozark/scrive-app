import type { ReactNode } from 'react';
import React from 'react';
import styles from './Typography.module.css';

type TypographyProps = {
  type: 'h1' | 'h2' | `h3` | `p--active` | `p--passive`;
  children: ReactNode;
  className?: string;
};

export default function Typography({
  type,
  children,
  className,
}: TypographyProps): JSX.Element {
  switch (type) {
    case 'h1':
      return (
        <h1 className={`${styles.headingOne} ${className}`}>{children}</h1>
      );
    case 'h2':
      return (
        <h2 className={`${styles.headingTwo} ${className}`}>{children}</h2>
      );
    case 'h3':
      return (
        <h3 className={`${styles.headingThree} ${className}`}>{children}</h3>
      );
    case 'p--active':
      return (
        <p className={`${styles.paragraphActive} ${className}`}>{children}</p>
      );
    case 'p--passive':
      return (
        <p className={`${styles.paragraphPassive} ${className}`}>{children}</p>
      );
  }
}
