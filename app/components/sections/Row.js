import React from 'react';
import styles from './Row.css';

const Row = ({ children, m, p, c, width, center }) => {
  const style = {};

  if (m) {
    style.marginBottom = '10px';
  }

  if (p) {
    style.paddingTop = '10px';
  }

  if (c) {
    style.textAlign = 'center';
  }

  if (width) {
    style.width = `${width}px`;
  }

  if (center) {
    style.justifyContent = 'center';
  }

  return (
    <div style={style} className={styles.row}>
      {children}
    </div>
  );
};

export default Row;
