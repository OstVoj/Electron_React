// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import isEmpty from 'lodash.isempty';
import Modal from '../../Modal';
import Alert from '../../dialog/Alert';
import Confirm from '../../dialog/Confirm';
import styles from './CodeViolations.css';

type Props = {
  codeViolations: Array<any>,
  loginStore: Object,
  onAddCodeViolation: (codeViolation: Object) => void,
  onRemoveCodeViolations: (selectedCodeViolations: Array<any>) => any
};

type States = {
  isModalVisible: boolean,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  modalSelectedCodeViolation: Object,
  message: string,
  selectedCodeViolations: Array<any>
};

class CodeViolations extends Component<Props, States> {
  props: Props;

  state = {
    isModalVisible: false,
    isAlertVisible: false,
    isConfirmVisible: false,
    modalSelectedCodeViolation: {},
    message: '',
    selectedCodeViolations: []
  };

  getCodeViolationList = () => {
    const { codeViolations } = this.props;
    const { selectedCodeViolations } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th>Code Violation ID</th>
            <th>Code Violation Details</th>
            <th>
              {codeViolations && codeViolations.length > 0 && (
                <input
                  type="checkbox"
                  name="checkContact"
                  checked={
                    codeViolations.length === selectedCodeViolations.length
                  }
                  onChange={(e: any) => {
                    this.handleChechCodeViolationItem(e, '');
                  }}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {codeViolations &&
            codeViolations.map((input, key) => (
              <tr key={key}>
                <td>{input.id}</td>
                <td>{input.details}</td>
                <td>
                  <input
                    type="checkbox"
                    name="checkContact"
                    checked={this.getCodeViolationChecked(input)}
                    onChange={(e: any) => {
                      this.handleChechCodeViolationItem(e, input.value);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  modalSelectedCodeViolationChange = change => {
    this.setState({
      modalSelectedCodeViolation: change
    });
  };

  getCodeViolationSelect = () => {
    const { modalSelectedCodeViolation } = this.state;
    const { loginStore } = this.props;

    let selectCodeViolation = [];
    if (loginStore.loader) {
      const { codeviolations } = loginStore.loader;
      selectCodeViolation = codeviolations.map(codeviolation => {
        const ret = codeviolation;
        ret.value = codeviolation.id;
        ret.label = codeviolation.details;
        return ret;
      });
    }

    return (
      <div className={styles.colorGreen}>
        <Select
          options={selectCodeViolation}
          value={modalSelectedCodeViolation}
          onChange={this.modalSelectedCodeViolationChange}
        />
      </div>
    );
  };

  getCodeViolationChecked = (input: any) => {
    const { selectedCodeViolations } = this.state;
    const filters = selectedCodeViolations.filter(
      selectedCodeViolation => selectedCodeViolation === input.value
    );
    return filters.length > 0;
  };

  handleChechCodeViolationItem = (e: any, key: string) => {
    const { checked } = e.target;

    if (key) {
      let { selectedCodeViolations } = this.state;
      if (checked) {
        selectedCodeViolations.push(key);
      } else {
        selectedCodeViolations = selectedCodeViolations.filter(
          (observation: any) => observation !== key
        );
      }
      this.setState({
        selectedCodeViolations
      });
    } else if (checked) {
      const { codeViolations } = this.props;
      this.setState({
        selectedCodeViolations: codeViolations.map(
          (codeViolation: any) => codeViolation.id
        )
      });
    } else {
      this.setState({
        selectedCodeViolations: []
      });
    }
  };

  handleOnDeleteCodeViolationItem = () => {
    const { selectedCodeViolations } = this.state;
    if (selectedCodeViolations.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'Please select code violation to delete'
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

  codeViolationModalSubmit = submit => {
    const { onAddCodeViolation } = this.props;

    if (!isEmpty(submit)) {
      onAddCodeViolation(submit);
    }

    this.setState({
      modalSelectedCodeViolation: {},
      isModalVisible: false
    });
  };

  onConfirmClick = () => {
    const { selectedCodeViolations } = this.state;
    const { onRemoveCodeViolations } = this.props;

    onRemoveCodeViolations(selectedCodeViolations);

    this.setState({
      isConfirmVisible: false,
      selectedCodeViolations: []
    });
  };

  render() {
    const {
      isModalVisible,
      modalSelectedCodeViolation,
      isAlertVisible,
      isConfirmVisible,
      message
    } = this.state;

    return (
      <fieldset className={styles.fieldsetOffset}>
        <legend>List of Code Violations</legend>
        {this.getCodeViolationList()}
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
              onClick={this.handleOnDeleteCodeViolationItem}
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
          {this.getCodeViolationSelect()}
          <div className={styles.modalInputInline}>
            <div>
              <button
                type="button"
                className="tab-container-button"
                disabled={isEmpty(modalSelectedCodeViolation)}
                onClick={() => {
                  this.codeViolationModalSubmit(modalSelectedCodeViolation);
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
                  this.codeViolationModalSubmit({});
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

export default connect(mapStateToProps)(CodeViolations);
