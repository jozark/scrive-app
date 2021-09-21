import React, { Children, useState } from 'react';
import styles from './Drawer.module.css';

function Drawer(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={`${styles.drawer} ${styles[`type--${open}`]}`}>
        <div className={styles.header} onClick={() => setOpen(!open)}>
          <p>header</p>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
