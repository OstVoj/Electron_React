/* eslint-disable no-alert */
// @flow
import React, { Component } from 'react';
import keydown, { Keys } from 'react-keydown';
import isEmpty from 'lodash.isempty';
import Alert from '../../dialog/Alert';
import Confirm from '../../dialog/Confirm';
import styles from './Vehicle.css';
import utility from '../../../utils/utility';
import Container from '../../sections/Container';
import Row from '../../sections/Row';
import HorizontalInput from '../../inputs/HorizontalInput';

type Props = {
  onClose: (vehicle: Object) => void,
  vehicle: Object
};

type States = {
  refId: number,
  make: string,
  model: string,
  color: string,
  plate: string,
  state: string,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string
};

@keydown
export default class Vehicle extends Component<Props, States> {
  props: Props;

  state = {
    refId: 0,
    make: '',
    model: '',
    color: '',
    plate: '',
    state: '',
    isAlertVisible: false,
    isConfirmVisible: false,
    message: ''
  };

  componentDidMount() {
    const { vehicle } = this.props;
    this.setState({
      ...vehicle
    });
  }

  componentDidUpdate({ keydown }) {
    if (keydown.event) {
      const { event } = keydown;
      const { keyCode } = event;
      if (keyCode === 27) {
        this.onClose();
      }
    }
  }

  onClose = () => {
    this.setState({
      isConfirmVisible: true,
      message: 'Are you sure?'
    });
  };

  onConfirmClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  handleInputChange = (event: Object) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onSave = () => {
    const { onClose, vehicle } = this.props;
    const refId = isEmpty(vehicle) ? utility.getRandomInt() : vehicle.refId;
    const { make, model, color, plate, state } = this.state;

    if (make.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'Make must be populated!'
      });
      return;
    }
    const jsonData = {
      refId,
      make,
      model,
      color,
      plate,
      state
    };
    onClose(jsonData);
  };

  render() {
    const { onClose } = this.props;
    const {
      make,
      model,
      color,
      plate,
      state,
      isAlertVisible,
      isConfirmVisible,
      message
    } = this.state;

    return (
      <Container column center>
        <div className={styles.form}>
          <Row m>
            <HorizontalInput
              type="text"
              name="make"
              value={make}
              label="Make:"
              onChange={this.handleInputChange}
            />
          </Row>
          <Row m>
            <HorizontalInput
              type="text"
              name="model"
              value={model}
              label="Model:"
              onChange={this.handleInputChange}
            />
          </Row>
          <Row m>
            <HorizontalInput
              type="text"
              name="color"
              value={color}
              label="Color:"
              onChange={this.handleInputChange}
            />
          </Row>
          <Row m>
            <HorizontalInput
              type="text"
              name="state"
              value={state}
              label="State:"
              onChange={this.handleInputChange}
            />
          </Row>
          <Row m>
            <HorizontalInput
              type="text"
              name="plate"
              value={plate}
              label="Plate:"
              onChange={this.handleInputChange}
            />
          </Row>
        </div>
        <br />
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.onSave}
          >
            Save
          </button>
        </div>
        <Alert
          onClose={() =>
            this.setState({
              isAlertVisible: false
            })
          }
          show={isAlertVisible}
          message={message}
        />
        <Confirm
          onOK={() => this.onConfirmClose()}
          onCancel={() =>
            this.setState({
              isConfirmVisible: false
            })
          }
          show={isConfirmVisible}
          message={message}
        />
      </Container>
    );
  }
}
