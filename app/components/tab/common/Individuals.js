// @flow
import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';
import Modal from '../../Modal';
import Individual from './Individual';
import Confirm from '../../dialog/Confirm';
import styles from './Individuals.css';

type Props = {
  individuals: Array<any>,
  callerTypesValues: Array<any>,
  selectedIndividualId: number,
  handleChangeSelectedIndividual: (refId: number) => void,
  onAddIndividual: () => void,
  handleCloseModal: (individual: Object) => void,
  onDeleteClick: () => void
};

type States = {
  isModalVisible: boolean,
  isConfirmVisible: boolean,
  message: string
};

export default class Individuals extends Component<Props, States> {
  props: Props;

  state = {
    isModalVisible: false,
    isConfirmVisible: false,
    message: ''
  };

  getIndividualRows = (individuals: Array) => {
    const { selectedIndividualId, handleChangeSelectedIndividual } = this.props;
    const result = individuals.map((individual: Object) => (
      <tr
        key={individual.refId}
        className={
          selectedIndividualId === individual.refId ? styles.activeRow : ''
        }
        onClick={() => handleChangeSelectedIndividual(individual.refId)}
      >
        <td>{individual.fname}</td>
        <td>{individual.lname}</td>
        <td>{individual.address}</td>
        <td>{individual.city}</td>
      </tr>
    ));
    return result;
  };

  showModal = (isAdd: boolean) => {
    const { selectedIndividualId, onAddIndividual } = this.props;

    if (isAdd) {
      onAddIndividual();
    } else if (!selectedIndividualId) {
      return;
    }
    this.setState({
      isModalVisible: true
    });
  };

  handleCloseModal = (individual: Object) => {
    this.setState({
      isModalVisible: false
    });
    const { handleCloseModal } = this.props;
    handleCloseModal(individual);
  };

  onDeleteClick = () => {
    this.setState({
      isConfirmVisible: true,
      message: 'Are you sure?'
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
    const {
      individuals,
      selectedIndividualId,
      handleCloseModal,
      callerTypesValues
    } = this.props;
    const { isModalVisible, isConfirmVisible, message } = this.state;

    const items = individuals.filter(
      item => item.refId === selectedIndividualId
    );
    const selectedIndividual = items.length > 0 ? items[0] : {};

    return (
      <div className={styles.container} data-tid="container">
        <fieldset>
          <legend>Individual Information</legend>
          {!isEmpty(individuals) && (
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>{this.getIndividualRows(individuals)}</tbody>
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
          {!isEmpty(individuals) && (
            <button
              type="button"
              className="tab-container-button"
              onClick={() => this.showModal(false)}
              disabled={!selectedIndividualId}
            >
              Edit
            </button>
          )}
          {!isEmpty(individuals) && (
            <button
              type="button"
              className="tab-container-button"
              onClick={this.onDeleteClick}
              disabled={!selectedIndividualId}
            >
              Delete
            </button>
          )}
        </div>
        <Modal show={isModalVisible} onClose={handleCloseModal}>
          <Individual
            onClose={(individual: Object) => this.handleCloseModal(individual)}
            callerTypesValues={callerTypesValues}
            individual={selectedIndividual}
          />
        </Modal>
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
