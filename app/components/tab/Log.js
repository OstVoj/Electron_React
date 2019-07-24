// @flow
import React, { Component } from 'react';
import styles from './Log.css';
import logger from '../../utils/logger';

export default class Log extends Component {
  componentDidMount() {
    const textarea = document.getElementById('logArea');
    textarea.scrollTop = textarea.scrollHeight;
  }

  render() {
    const messages = logger.readLogs();

    return (
      <div className={styles.container} data-tid="container">
        <textarea rows="35" value={messages} readOnly id="logArea" />
      </div>
    );
  }
}
