// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash.get';
import styles from './Home.css';
import Left from './Left';
import Right from './Right';
import * as GpsActions from '../actions/gps';
import * as ChatActions from '../actions/chat';
import Menu from '../containers/MenuContainer';
import Socket from '../service/socket';
import soundfile from '../../resources/text_message.mp3';

const GPS = require('gps');
const SerialPort = require('serialport');

const audio = new Audio(soundfile);

type Props = {
  gpsStore: PropTypes.object,
  loginStore: PropTypes.object,
  setGps: (gps: PropTypes.object) => void,
  setSerialPorts: (ports: PropTypes.object) => void,
  sendGps: (lat: number, lon: number, speed: number) => void,
  setOnlineUsers: (users: Array<any>) => void,
  setNewUser: (user: PropTypes.object) => void,
  setUserOffline: (user: PropTypes.object) => void,
  addChatHistory: (message: PropTypes.object) => void
};

let timer = null;

class Home extends Component<Props, States> {
  props: Props;

  componentDidMount() {
    const { loginStore } = this.props;
    const loader = get(loginStore, 'loader');
    if (loader) {
      this.bindSocket();
    }

    SerialPort.list((err, ports) => {
      if (!err) {
        if (ports.length > 0) {
          const { setSerialPorts } = this.props;
          setSerialPorts(ports);
          const file = ports[0].comName;
          const { parsers } = SerialPort;
          const parser = new parsers.Readline({
            delimiter: '\r\n'
          });
          const port = new SerialPort(file, {
            baudRate: 4800
          });

          port.pipe(parser);
          const gps = new GPS();
          gps.state.bearing = 0;
          const prev = {
            lat: null,
            lon: null
          };
          gps.on('data', data => {
            if (prev.lat !== null && prev.lon !== null) {
              gps.state.bearing = GPS.Heading(
                prev.lat,
                prev.lon,
                gps.state.lat,
                gps.state.lon
              );
            }
            if (prev.lat !== gps.state.lat || prev.lon !== gps.state.lon) {
              const { setGps } = this.props;
              setGps(gps.state);
            }
            prev.lat = gps.state.lat;
            prev.lon = gps.state.lon;
          });
          parser.on('data', data => {
            gps.update(data);
          });
        }
      }
    });
  }

  componentDidUpdate(prevProps: Object) {
    const { gpsStore, sendGps } = this.props;
    const { gps } = gpsStore;
    if (gps) {
      if (!timer) {
        if (gps.lat && gps.lon && gps.speed) {
          sendGps(gps.lat, gps.lon, gps.speed);
        }
        timer = setInterval(() => {
          if (gps.lat && gps.lon && gps.speed) {
            sendGps(gps.lat, gps.lon, gps.speed);
          }
        }, 30 * 1000);
      }
    }

    const { loginStore } = this.props;
    const loader = get(loginStore, 'loader');
    if (loader && !prevProps.loginStore.loader && !this.socket) {
      this.bindSocket();
    }
  }

  bindSocket = () => {
    const { loginStore } = this.props;
    const loader = get(loginStore, 'loader');
    const auth = get(loginStore, 'auth');
    const { nodeDomain } = loader;
    const { token } = auth;
    window.socket = new Socket(`https://${nodeDomain}`, 'electron', token);
    const { socket } = window;
    socket.core.emit('getOnlineUsers');

    socket.core.on('onlineUsers', users => {
      const { setOnlineUsers } = this.props;
      setOnlineUsers(users);
    });

    socket.core.on('userOffline', user => {
      const { setUserOffline } = this.props;
      setUserOffline(user);
    });

    socket.core.on('newMessage', msg => {
      const { addChatHistory } = this.props;
      const { NODE_ENV } = process.env;
      const env = NODE_ENV === 'development' ? 'dev' : 'prod';
      const companyId = get(auth, 'companyId');
      addChatHistory(msg, `${env}-${companyId}`);
      audio.play();
    });

    socket.core.on('newUser', user => {
      const { setNewUser } = this.props;
      setNewUser(user);
    });
  };

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Menu />
          <Left />
          <Right />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    gpsStore: state.gps,
    loginStore: state.login,
    ...this.props
  };
}

function mapDispatchToProps(dispatch: PropTypes.object) {
  return bindActionCreators(
    Object.assign({}, GpsActions, ChatActions),
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
