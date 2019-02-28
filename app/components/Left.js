// @flow
import React, { Component } from 'react';
import styles from './Left.css';
import utility from '../utils/utility';
import Logo from '../../resources/logo.png';

type Props = {};

type States = {
  dateTime: string
};

export default class Left extends Component<Props, States> {
  props: Props;

  state = {
    dateTime: ''
  };

  componentDidMount() {
    setInterval(this.startTime, 1000);
  }

  startTime = () => {
    const dateTime = utility.startTime();
    this.setState({
      dateTime
    });
  };

  render() {
    const { dateTime } = this.state;

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.logoArea}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={styles.statusArea}>
          <div>C10 ECTEAM</div>
          <div>OFFICER 10ENTIFICATION</div>
          <div>Z11</div>
        </div>
        <div className={styles.dateTimeArea}>{dateTime}</div>
        <div className={styles.buttonArea}>
          <div className={styles.row}>
            <button type="button" className={styles.f1}>
              F1: UNIT IS AVAILABLE
            </button>
            <button type="button" className={styles.f2}>
              F2: OUT OF SERVICE
            </button>
            <button type="button" className={styles.f3}>
              F3: BUSY ON A CALL
            </button>
          </div>
          <div className={styles.row}>
            <button type="button" className={styles.f4}>
              F4: SUSP. ACTIVITY
            </button>
            <button type="button" className={styles.f5}>
              F5: CLEAR FROM CALL
            </button>
            <button type="button" className={styles.f11}>
              F11: BACKUP REQUESTED
            </button>
          </div>
        </div>
      </div>
    );
  }
}
