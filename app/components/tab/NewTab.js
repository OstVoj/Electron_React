// @flow
import React, { Component } from 'react';
import styles from './NewTab.css';

type Props = {
  title: string
};

export default class NewTab extends Component<Props> {
  props: Props;

  render() {
    const { title } = this.props;

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.title}>{title}</div>
      </div>
    );
  }
}
