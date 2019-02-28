// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import Left from './Left';
import Right from './Right';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <Left />
        <Right />
      </div>
    );
  }
}
