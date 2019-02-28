/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// @flow
import React, { Component } from 'react';
import styles from './Home.css';

type Props = {
  onNewTab: (title: string) => void
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const { onNewTab } = this.props;

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.title}>Destiny Software Development</div>
        <div className={styles.buttonsArea}>
          <div className={styles.button} onClick={() => onNewTab('DISPATCHES')}>
            DISPATCHES
          </div>
          <div className={styles.button} />
          <div
            className={styles.button}
            onClick={() => onNewTab('PATROL / DAR')}
          >
            PATROL / DAR
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('ACTIVITY REPORT')}
          >
            <div>ACTIVITY</div>
            <div>REPORT</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('FI-FIELD INTERVIEW')}
          >
            <div>FI-FIELD</div>
            <div>INTERVIEW</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('VFI-VEHICLE FIELD INFO')}
          >
            <div>VFI-VEHICLE</div>
            <div>FIELD INFO</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('INCIDENT REPORT')}
          >
            <div>INCIDENT</div>
            <div>REPORT</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('Parking Violation')}
          >
            <div>Parking</div>
            <div>Violation</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('Warning Notice')}
          >
            <div>Warning</div>
            <div>Notice</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('SUBJECT I.D. VERIFICATION')}
          >
            <div>SUBJECT I.D.</div>
            <div>VERIFICATION</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('Guard Tour Report')}
          >
            <div>Guard Tour</div>
            <div>Report</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('ARREST REPORT')}
          >
            <div>ARREST</div>
            <div>REPORT</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('MID TEXT MESSAGING')}
          >
            <div>MID TEXT</div>
            <div>MESSAGING</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('MAINTENANCE REPORT')}
          >
            <div>MAINTENANCE</div>
            <div>REPORT</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('LPR PARKING ENFORCEMENT')}
          >
            <div>LPR PARKING</div>
            <div>ENFORCEMENT</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('PASSDOWN LOG')}
          >
            <div>PASSDOWN</div>
            <div>LOG</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('POST ORDERS')}
          >
            <div>POST</div>
            <div>ORDERS</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('SHIFT REPORT')}
          >
            <div>SHIFT</div>
            <div>REPORT</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('RECORDS SEARCH')}
          >
            <div>RECORDS</div>
            <div>SEARCH</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('SAVED REPORTS')}
          >
            <div>SAVED</div>
            <div>REPORTS</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('REQUEST SUPERVISOR')}
          >
            <div>REQUEST</div>
            <div>SUPERVISOR</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('GPS POSITION STATISTICS')}
          >
            <div>GPS POSITION</div>
            <div>STATISTICS</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('PROPERTY INFORMATION')}
          >
            <div>PROPERTY</div>
            <div>INFORMATION</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('VEHICLE INSPECTION')}
          >
            <div>VEHICLE</div>
            <div>INSPECTION</div>
          </div>
          <div
            className={styles.button}
            onClick={() => onNewTab('PARKING ENFORCEMENT')}
          >
            <div>PARKING</div>
            <div>ENFORCEMENT</div>
          </div>
          <div className={styles.button} onClick={() => onNewTab('TIME CLOCK')}>
            TIME CLOCK
          </div>
          <div className={styles.button} />
        </div>
      </div>
    );
  }
}
