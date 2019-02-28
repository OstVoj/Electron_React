// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.css';
import Loading from './Loading';

const si = require('systeminformation');

type Props = {
  history: PropTypes.object,
  loginStore: PropTypes.object,
  login: (
    setting: void,
    userId: string,
    password: string,
    companyId: string,
    machineId: string
  ) => void,
  getSetting: (userId: string, companyId: string) => void
};

type States = {
  userId: string,
  password: string,
  companyId: string,
  machineId: string,
  version: string
};

export default class Home extends Component<Props, States> {
  props: Props;

  state = {
    userId: 'Z11',
    password: 'hubert',
    companyId: 'ecteam',
    machineId: '',
    version: ''
  };

  componentDidMount() {
    si.uuid()
      .then(data =>
        this.setState({
          machineId: data.os
        })
      )
      .catch(error => console.error(error));
    this.setState({
      version: process.env.VERSION
    });
  }

  componentDidUpdate(prevProps: PropTypes.object) {
    const { loginStore } = this.props;
    if (
      !prevProps.loginStore.getSettingCompleted &&
      loginStore.getSettingCompleted
    ) {
      const { login } = this.props;
      const { userId, password, companyId, machineId } = this.state;
      const { error } = loginStore.setting;
      if (error) {
        alert('Get Setting Failure!');
      } else {
        const { httpHost } = loginStore.setting;
        login(httpHost, userId, password, companyId, machineId);
      }
    }
    if (!prevProps.loginStore.loginCompleted && loginStore.loginCompleted) {
      if (loginStore.auth) {
        const { success } = loginStore.auth;
        if (success === '0') {
          alert('Login Failure!');
        } else if (success === '1') {
          const { history } = this.props;
          history.push('/home');
        }
      }
    }
  }

  onChangeCompanyId = (e: PropTypes.object) => {
    this.setState({
      companyId: e.target.value
    });
  };

  onChangePassword = (e: PropTypes.object) => {
    this.setState({
      password: e.target.value
    });
  };

  onChangeUserId = (e: PropTypes.object) => {
    this.setState({
      userId: e.target.value
    });
  };

  signin = () => {
    const { getSetting } = this.props;
    const { userId, password, companyId, machineId } = this.state;
    if (userId && password && companyId && machineId) {
      getSetting(userId, companyId);
    }
  };

  render() {
    const { userId, password, companyId, machineId, version } = this.state;
    const { loginStore } = this.props;
    const loading = !(loginStore.getSettingCompleted || loginStore.loginCompleted);

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.row}>
          <div className={styles.label}>User ID</div>
          <input type="text" value={userId} onChange={this.onChangeUserId} />
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Password</div>
          <input
            type="password"
            value={password}
            onChange={this.onChangePassword}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Company ID</div>
          <input
            id="companyId"
            type="text"
            value={companyId}
            onChange={this.onChangeCompanyId}
          />
        </div>
        <div className={styles.row}>
          <button type="button" onClick={this.signin}>
            Sign In
          </button>
        </div>
        <div className={styles.lastRow}>
          <div className={styles.label}>Machine ID</div>
          <div>{machineId}</div>
        </div>
        <div className={styles.lastRow}>
          <div className={styles.label}>Version</div>
          <div>{version}</div>
        </div>
        <Loading loading={loading} />
      </div>
    );
  }
}
