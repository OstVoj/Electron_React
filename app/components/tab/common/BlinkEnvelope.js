import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/fontawesome-free-solid';
import styles from './BlinkEnvelope.css';

fontawesome.library.add(faEnvelope);

export default () => (
  <div className={styles.blink}>
    <FontAwesomeIcon icon="envelope" color="white" />
  </div>
);
