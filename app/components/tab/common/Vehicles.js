// @flow
import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';
import Modal from '../../Modal';
import Vehicle from './Vehicle';
import Alert from '../../dialog/Alert';
import Confirm from '../../dialog/Confirm';
import styles from './Vehicles.css';

type Props = {
  vehicles: Array<any>,
  selectedVehicleId: number,
  handleChangeSelectedVehicle: (refId: number) => void,
  onAddVehicle: () => void,
  handleCloseModal: (vehicle: Object) => void,
  onDeleteClick: () => void
};

type States = {
  isModalVisible: boolean,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string,
  message: string
};

export default class Vehicles extends Component<Props, States> {
  props: Props;

  state = {
    isModalVisible: false,
    isAlertVisible: false,
    isConfirmVisible: false,
    message: ''
  };

  getVehicleRows = (vehicles: Array) => {
    const { selectedVehicleId, handleChangeSelectedVehicle } = this.props;
    const result = vehicles.map((vehicle: Object) => (
      <tr
        key={vehicle.refId}
        className={selectedVehicleId === vehicle.refId ? styles.activeRow : ''}
        onClick={() => handleChangeSelectedVehicle(vehicle.refId)}
      >
        <td>{vehicle.make}</td>
        <td>{vehicle.model}</td>
        <td>{vehicle.color}</td>
        <td>{vehicle.plate}</td>
        <td>{vehicle.state}</td>
      </tr>
    ));
    return result;
  };

  showModal = (isAdd: boolean) => {
    const { selectedVehicleId, onAddVehicle } = this.props;

    if (isAdd) {
      onAddVehicle();
    } else if (!selectedVehicleId) {
      return;
    }
    this.setState({
      isModalVisible: true
    });
  };

  handleCloseModal = (vehicle: Object) => {
    this.setState({
      isModalVisible: false
    });
    const { handleCloseModal } = this.props;
    handleCloseModal(vehicle);
  };

  handleOnDeleteVehicles = () => {
    this.setState({
      isConfirmVisible: true,
      message: 'Are you sure, you want delete selected items'
    });
  };

  onConfirmClick = () => {
    const { onDeleteClick } = this.props;
    onDeleteClick();
    this.setState({
      isConfirmVisible: false
    });
  };

  render() {
    const { vehicles, selectedVehicleId, handleCloseModal } = this.props;
    const {
      isModalVisible,
      isAlertVisible,
      isConfirmVisible,
      message
    } = this.state;

    const items = vehicles.filter(item => item.refId === selectedVehicleId);
    const selectedVehicle = items.length > 0 ? items[0] : {};

    return (
      <div className={styles.container} data-tid="container">
        <fieldset>
          <legend>Vehicle Information</legend>
          {!isEmpty(vehicles) && (
            <table>
              <thead>
                <tr>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Color</th>
                  <th>Plate</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>{this.getVehicleRows(vehicles)}</tbody>
            </table>
          )}
        </fieldset>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className="tab-container-button"
            onClick={() => this.showModal(true)}
          >
            Add
          </button>
          {!isEmpty(vehicles) && (
            <button
              type="button"
              className="tab-container-button"
              onClick={() => this.showModal(false)}
              disabled={!selectedVehicleId}
            >
              Edit
            </button>
          )}
          {!isEmpty(vehicles) && (
            <button
              type="button"
              className="tab-container-button"
              onClick={this.handleOnDeleteVehicles}
              disabled={!selectedVehicleId}
            >
              Delete
            </button>
          )}
        </div>
        <Modal show={isModalVisible} onClose={handleCloseModal}>
          <Vehicle
            onClose={(vehicle: Object) => this.handleCloseModal(vehicle)}
            vehicle={selectedVehicle}
          />
        </Modal>
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
          onOK={this.onConfirmClick}
          onCancel={() =>
            this.setState({
              isConfirmVisible: false
            })
          }
          show={isConfirmVisible}
          message={message}
        />
      </div>
    );
  }
}
