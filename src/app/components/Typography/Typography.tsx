import type { ReactNode } from 'react';
import React from 'react';
import styles from './Typography.module.css';

type TypographyProps = {
  type: 'h1' | 'h2' | `h3` | `p` | `passive`;
  children: ReactNode;
  className?: string;
};

export default function Typography({
  type,
  children,
  className,
}: TypographyProps): JSX.Element {
  const TypeMap = {
    h1: <h1 className={`${styles.headingOne} ${className}`}>{children}</h1>,
    h2: <h2 className={`${styles.headingTwo} ${className}`}>{children}</h2>,
    h3: <h3 className={`${styles.headingThree} ${className}`}>{children}</h3>,
    p: <p className={`${styles.paragraph} ${className}`}>{children}</p>,
    passive: (
      <p className={`${styles.paragraphPassive} ${className}`}>{children}</p>
    ),
  };

  return TypeMap[type];
}
