// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { FadeLoader } from 'react-spinners';
import * as TimeClockActions from '../../actions/timeClock';
import styles from './TimeClock.css';
import utility from '../../utils/utility';

const fs = require('fs');
const canvasBuffer = require('electron-canvas-to-buffer');
const { remote } = require('electron');

const { app } = remote;
type Props = {
  loginStore: Object,
  getLastTimeClockEntry: Function,
  uploadTimeClock: Function,
  timeClockStore: Object
};

type States = {
  cameras: PropTypes.array,
  selectedCamera: PropTypes.object,
  dateTime: string,
  video: string
};

class TimeClock extends Component<Props, States> {
  props: Props;

  state = {
    cameras: [],
    selectedCamera: null,
    dateTime: '',
    video: ''
  };

  componentDidMount() {
    this.updateCameraList();
    navigator.mediaDevices.ondevicechange = () => {
      this.updateCameraList();
    };
    const { loginStore } = this.props;
    if (loginStore.loader) {
      this.getLastTimeClockEntry();
    }
  }

  componentDidUpdate() {
    const { loginStore, timeClockStore } = this.props;
    if (loginStore.loader && !timeClockStore.entry) {
      this.getLastTimeClockEntry();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
  }

  canvas = null;

  interval = null;

  video = {};

  getLastTimeClockEntry() {
    const { loginStore, getLastTimeClockEntry } = this.props;
    const { userId, password, companyId } = loginStore.auth;
    const { setting } = loginStore;
    getLastTimeClockEntry(setting.httpHost, userId, password, companyId);
  }

  startTime = () => {
    const dateTime = utility.startTime();
    this.setState({
      dateTime
    });
  };

  updateCameraList = () => {
    this.setState({
      selectedCamera: null,
      cameras: []
    });
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        let cameras = devices.filter(device => device.kind === 'videoinput');
        cameras = cameras.map(device => {
          const deviceInfo = {};
          deviceInfo.value = device.deviceId;
          deviceInfo.label = device.label;
          deviceInfo.groupId = device.groupId;
          deviceInfo.deviceId = device.deviceId;
          return deviceInfo;
        });
        this.setState({ cameras });
        if (cameras.length === 1) {
          this.handleChange(cameras[0]);
        }
        return 1;
      })
      .catch(err => console.log(err));
  };

  handleChange = selectedCamera => {
    this.setState({ selectedCamera });
    if (selectedCamera) {
      this.interval = setInterval(this.startTime, 1000);
      if (window.stream) {
        window.stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      const constraints = (window.constraints = {
        video: {
          deviceId: {
            exact: selectedCamera.value
          }
        }
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          stream.onended = () => {
            console.log('Stream ended');
          };
          window.stream = stream;
          this.video.srcObject = stream;
          this.video.onloadedmetadata = e => this.video.play();
          const video = this.video;
          const canvas = this.canvas;
          let streaming = false;
          video.addEventListener(
            'canplay',
            () => {
              if (!streaming) {
                const width = 320;
                const height = video.videoHeight / (video.videoWidth / width);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
              }
            },
            false
          );
          return 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  takePhoto = (io: number) => {
    const context = this.canvas.getContext('2d');
    context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    const buffer = canvasBuffer(this.canvas, 'image/jpg');
    const homePath = `${app.getPath('home')}/adam602`;
    // write canvas to file
    const imagePath = `${homePath}/image.jpg`;
    fs.writeFile(imagePath, buffer, err => {
      if (err) {
        console.log(err);
      } else {
        const { loginStore } = this.props;
        const { userId, password, companyId } = loginStore.auth;
        const latLon = utility.getCurrentLatLon();
        const { uploadTimeClock } = this.props;
        const { setting } = loginStore;
        uploadTimeClock(
          setting.httpHost,
          userId,
          password,
          companyId,
          latLon.lat,
          latLon.lon,
          imagePath,
          io
        );
      }
    });
  };

  render() {
    const { loginStore, timeClockStore } = this.props;
    const { selectedCamera, cameras, dateTime, video } = this.state;
    const { userId } = loginStore.auth;
    const { timeClockUploaded } = timeClockStore;

    let officerName = '';
    if (loginStore.loader) {
      const { officers } = loginStore.loader;
      if (officers) {
        officerName = utility.userIdToName(userId, officers);
      }
    }

    let lastPunchIO = -1;
    let lastPunchIOTxt = null;
    let lastPunchTime = null;
    if (timeClockStore.entry) {
      const { entry } = timeClockStore;
      lastPunchIO = entry.lastPunchIO;
      lastPunchIOTxt = entry.lastPunchIOTxt;
      lastPunchTime = entry.lastPunchTime;
    }

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.left}>
          <div className={`rounded-description-container ${styles.overviewContainer}`}>
            {selectedCamera && (
              <div className={styles.overViewDetail}>
                <div>Date / Time: {dateTime}</div>
                <div>Officer Name: {officerName}</div>
                <div>
                  Last Punch: {lastPunchIOTxt} {lastPunchTime}
                </div>
              </div>
            )}
            {cameras.length === 0 && (
              <div className={styles.overViewDetail}>
                <div>No attached cameras detected.</div>
              </div>
            )}
          </div>
          <Select
            value={selectedCamera}
            onChange={this.handleChange}
            options={cameras}
            className={styles.cameraSelect}
          />
          <div className={styles.buttonStartContainer}>
            {lastPunchIO === 0 && selectedCamera && timeClockUploaded && (
              <button
                type="button"
                className="tab-container-button"
                onClick={() => this.takePhoto(1)}
              >
                Start Shift
              </button>
            )}
            {lastPunchIO === 1 && selectedCamera && timeClockUploaded && (
              <button
                type="button"
                className="tab-container-button"
                onClick={() => this.takePhoto(0)}
              >
                End Shift
              </button>
            )}
            {!timeClockUploaded && (
              <FadeLoader
                sizeUnit="px"
                size={50}
                color="#ffffff"
                loading={!timeClockUploaded}
              />
            )}
          </div>
        </div>
        <div className={styles.right}>
          <div className={`rounded-description-container ${styles.timeClockDescription}`}>
            Please make sure to center your image the middle of the box shown
            below and that you are in an area that has sufficient light
          </div>
          <fieldset className={styles.cameraPreviewFieldSet}>
            <legend>Preview</legend>
            <video
              className={styles.cameraPreview}
              width="100%"
              ref={video => {
                this.video = video;
              }}
            />
            <canvas
              id="canvas"
              style={{ display: 'none' }}
              ref={canvas => {
                this.canvas = canvas;
              }}
            />
          </fieldset>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login,
    timeClockStore: state.timeClock,
    ...this.props
  };
}

function mapDispatchToProps(dispatch: PropTypes.object) {
  return bindActionCreators(TimeClockActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeClock);
