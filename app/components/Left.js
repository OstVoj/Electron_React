// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as LoginActions from '../actions/login';
import styles from './Left.css';
import utility from '../utils/utility';
import Logo from '../../resources/logo.png';
import logger from '../utils/logger';

type Props = {
  loginStore: PropTypes.object,
  gpsStore: PropTypes.object,
  changeStatus: (status: string, lat: string, lon: string) => void,
  login: (
    setting: void,
    userId: string,
    password: string,
    companyId: string,
    machineId: string
  ) => void,
  ping: (machineId: string) => void
};

type States = {
  dateTime: string,
  currentStatus: string
};

class Left extends Component<Props, States> {
  props: Props;

  state = {
    dateTime: '',
    currentStatus: 'F1'
  };

  componentDidMount() {
    setInterval(this.startTime, 1000);
    this.changeStatus('F1');

    const { ping, loginStore } = this.props;
    const { machineId } = loginStore.auth;
    const interval = Number(process.env.INTERVAL) * 1000;
    this.pingTimer = setInterval(() => ping(machineId), interval);
    ping(machineId);
  }

  componentDidUpdate(prevProps) {
    const { loginStore, ping } = this.props;
    const { status, auth, onlineStatus } = loginStore;

    if (status === 401 && prevProps.loginStore.status !== status) {
      const { login } = this.props;
      const { setting } = loginStore;
      const { userId, password, companyId, machineId } = auth;
      const { httpHost } = setting;
      login(httpHost, userId, password, companyId, machineId);
    }

    if (!prevProps.loginStore.loginCompleted && loginStore.loginCompleted) {
      const { currentStatus } = this.state;
      this.changeStatus(currentStatus);
    }

    if (prevProps.loginStore.onlineStatus !== onlineStatus) {
      if (this.pingTimer) {
        clearInterval(this.pingTimer);
      }
      const { machineId } = auth;
      let interval = Number(process.env.INTERVAL) * 1000;
      if (onlineStatus === 'YES') {
        if (prevProps.loginStore.onlineStatus === 'NO') {
          logger.log('Ping recovery detected. Setting isConnected to YES');
        }
        this.pingTimer = setInterval(() => ping(machineId), interval);
      } else {
        interval = 5 * 1000;
        this.pingTimer = setInterval(() => ping(machineId), interval);
      }
    }
  }

  pingTimer = null;

  startTime = () => {
    const dateTime = utility.startTime();
    this.setState({
      dateTime
    });
  };

  changeStatus = (status: string) => {
    this.setState({
      currentStatus: status
    });
    const { changeStatus, gpsStore } = this.props;
    const { gps } = gpsStore;

    changeStatus(status, gps ? gps.lat : '', gps ? gps.lon : '');
  };

  render() {
    const { dateTime } = this.state;
    const { loginStore } = this.props;
    const { auth, status, onlineStatus } = loginStore;

    let currentStatus = status;
    if (status === 'F1') {
      currentStatus = 'available';
    } else if (status === 'F2') {
      currentStatus = 'out of service';
    } else if (status === 'F3') {
      currentStatus = 'busy on a call';
    } else if (status === 'F4') {
      currentStatus = 'susp. activity';
    } else if (status === 'F5') {
      currentStatus = 'clear from call';
    } else if (status === 'F11') {
      currentStatus = 'backup requested';
    }

    let cid = '';
    let officerId = '';
    if (auth) {
      cid = auth.companyId;
      officerId = auth.userId;
    }

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.logoArea}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={styles.statusArea}>
          <table className="status-area">
            <tbody>
              <tr>
                <td>CID:</td>
                <td>{cid}</td>
              </tr>
              <tr>
                <td>USER ID:</td>
                <td>{officerId}</td>
              </tr>
              <tr>
                <td>STATUS:</td>
                <td>{currentStatus}</td>
              </tr>
              <tr>
                <td>CONNECTED:</td>
                <td>{onlineStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.dateTimeArea}>{dateTime}</div>
        <div className={styles.buttonArea}>
          <div className={styles.row}>
            <button
              type="button"
              className={styles.f1}
              onClick={() => this.changeStatus('F1')}
            >
              F1: UNIT IS AVAILABLE
            </button>
            <button
              type="button"
              className={styles.f2}
              onClick={() => this.changeStatus('F2')}
            >
              F2: OUT OF SERVICE
            </button>
            <button
              type="button"
              className={styles.f3}
              onClick={() => this.changeStatus('F3')}
            >
              F3: BUSY ON A CALL
            </button>
          </div>
          <div className={styles.row}>
            <button
              type="button"
              className={styles.f4}
              onClick={() => this.changeStatus('F4')}
            >
              F4: SUSP. ACTIVITY
            </button>
            <button
              type="button"
              className={styles.f5}
              onClick={() => this.changeStatus('F5')}
            >
              F5: CLEAR FROM CALL
            </button>
            <button
              type="button"
              className={styles.f11}
              onClick={() => this.changeStatus('F11')}
            >
              F11: BACKUP REQUESTED
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login,
    gpsStore: state.gps,
    ...this.props
  };
}

function mapDispatchToProps(dispatch: PropTypes.object) {
  return bindActionCreators(LoginActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Left);
