// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import Select from 'react-select';
import Modal from '../../Modal';
import Alert from '../../dialog/Alert';
import Confirm from '../../dialog/Confirm';
import styles from './Observations.css';

type Props = {
  observations: Array<any>,
  loginStore: Object,
  onAddObservation: (observation: Object) => void,
  onRemoveObservations: (selectedObservations: Array<any>) => any
};

type States = {
  isModalVisible: boolean,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  modalSelectedObservation: Object,
  message: string,
  selectedObservations: Array<any>
};

class Observations extends Component<Props, States> {
  props: Props;

  state = {
    isModalVisible: false,
    isAlertVisible: false,
    isConfirmVisible: false,
    modalSelectedObservation: {},
    message: '',
    selectedObservations: []
  };

  getObservationList = () => {
    const { observations } = this.props;
    const { selectedObservations } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th>Observation ID</th>
            <th>Observation Details</th>
            <th>
              {observations && observations.length > 0 && (
                <input
                  type="checkbox"
                  name="checkContact"
                  checked={observations.length === selectedObservations.length}
                  onChange={(e: any) => {
                    this.handleChechObservationItem(e, '');
                  }}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {observations &&
            observations.map((input, key) => (
              <tr key={key}>
                <td>{input.id}</td>
                <td>{input.details}</td>
                <td>
                  <input
                    type="checkbox"
                    name="checkContact"
                    checked={this.getObservationChecked(input)}
                    onChange={(e: any) => {
                      this.handleChechObservationItem(e, input.value);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  modalSelectedObservationChange = change => {
    this.setState({
      modalSelectedObservation: change
    });
  };

  getObservationSelect = () => {
    const { modalSelectedObservation } = this.state;
    const { loginStore } = this.props;

    let selectObservation = [];
    if (loginStore.loader) {
      const { probservations } = loginStore.loader;
      selectObservation = probservations.map(probservation => {
        const ret = probservation;
        ret.value = probservation.id;
        ret.label = probservation.details;
        return ret;
      });
    }

    return (
      <div className={styles.colorGreen}>
        <Select
          options={selectObservation}
          value={modalSelectedObservation}
          onChange={this.modalSelectedObservationChange}
        />
      </div>
    );
  };

  getObservationChecked = (input: any) => {
    const { selectedObservations } = this.state;
    const filters = selectedObservations.filter(
      selectedObservation => selectedObservation === input.value
    );
    return filters.length > 0;
  };

  handleChechObservationItem = (e: any, key: string) => {
    const { checked } = e.target;

    if (key) {
      let { selectedObservations } = this.state;
      if (checked) {
        selectedObservations.push(key);
      } else {
        selectedObservations = selectedObservations.filter(
          (observation: any) => observation !== key
        );
      }
      this.setState({
        selectedObservations
      });
    } else if (checked) {
      const { observations } = this.props;
      this.setState({
        selectedObservations: observations.map(
          (observation: any) => observation.id
        )
      });
    } else {
      this.setState({
        selectedObservations: []
      });
    }
  };

  handleOnDeleteObservationItem = () => {
    const { selectedObservations } = this.state;
    if (selectedObservations.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'Please select observations to delete'
      });
    } else {
      this.setState({
        isConfirmVisible: true,
        message: 'Are you sure, you want delete selected items'
      });
    }
  };

  showModal = (visible: boolean) => {
    this.setState({
      isModalVisible: visible
    });
  };

  closeModal = () => {};

  observationModalSubmit = submit => {
    const { onAddObservation } = this.props;

    if (!isEmpty(submit)) {
      onAddObservation(submit);
    }

    this.setState({
      modalSelectedObservation: {},
      isModalVisible: false
    });
  };

  onConfirmClick = () => {
    const { selectedObservations } = this.state;
    const { onRemoveObservations } = this.props;

    onRemoveObservations(selectedObservations);

    this.setState({
      isConfirmVisible: false,
      selectedObservations: []
    });
  };

  render() {
    const {
      isModalVisible,
      modalSelectedObservation,
      isAlertVisible,
      isConfirmVisible,
      message
    } = this.state;

    return (
      <fieldset className={styles.fieldsetOffset}>
        <legend>Observations</legend>
        {this.getObservationList()}
        <div className={styles.inputInline}>
          <div>
            <button
              type="button"
              className="tab-container-button"
              onClick={() => this.showModal(true)}
            >
              Add
            </button>
          </div>
          <div>
            <button
              type="button"
              className="tab-container-button"
              onClick={this.handleOnDeleteObservationItem}
            >
              Delete
            </button>
          </div>
        </div>
        <Modal
          width={40}
          topOffset={200}
          show={isModalVisible}
          onClose={this.closeModal}
        >
          {this.getObservationSelect()}
          <div className={styles.modalInputInline}>
            <div>
              <button
                type="button"
                className="tab-container-button"
                disabled={isEmpty(modalSelectedObservation)}
                onClick={() => {
                  this.observationModalSubmit(modalSelectedObservation);
                }}
              >
                Save
              </button>
            </div>
            <div>
              <button
                type="button"
                className="tab-container-button"
                onClick={() => {
                  this.observationModalSubmit({});
                }}
              >
                Cancel
              </button>
            </div>
          </div>
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
      </fieldset>
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login
  };
}

export default connect(mapStateToProps)(Observations);
