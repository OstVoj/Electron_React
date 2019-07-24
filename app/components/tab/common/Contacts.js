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
  contacts: Array<any>,
  loginStore: Object,
  onAddContact: (contact: Object) => void,
  onRemoveContacts: (selectedContacts: Array<any>) => any
};

type States = {
  isModalVisible: boolean,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  modalSelectedContact: Object,
  message: string,
  selectedContacts: Array<any>
};

class Contacts extends Component<Props, States> {
  props: Props;

  state = {
    isModalVisible: false,
    isAlertVisible: false,
    isConfirmVisible: false,
    modalSelectedContact: {},
    message: '',
    selectedContacts: []
  };

  getContactList = () => {
    const { contacts } = this.props;
    const { selectedContacts } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th>Contact ID</th>
            <th>Contact Details</th>
            <th>
              {contacts && contacts.length > 0 && (
                <input
                  type="checkbox"
                  name="checkContact"
                  checked={contacts.length === selectedContacts.length}
                  onChange={(e: any) => {
                    this.handleChechContactItem(e, '');
                  }}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts &&
            contacts.map((input, key) => (
              <tr key={key}>
                <td>{input.id}</td>
                <td>{input.details}</td>
                <td>
                  <input
                    type="checkbox"
                    name="checkContact"
                    checked={this.getContactChecked(input)}
                    onChange={(e: any) => {
                      this.handleChechContactItem(e, input.value);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  modalSelectedContactChange = change => {
    this.setState({
      modalSelectedContact: change
    });
  };

  getContactSelect = () => {
    const { modalSelectedContact } = this.state;
    const { loginStore } = this.props;

    let selectContact = [];
    if (loginStore.loader) {
      const { contacts } = loginStore.loader;
      selectContact = contacts.map(contact => {
        const ret = contact;
        ret.value = contact.id;
        ret.label = contact.details;
        return ret;
      });
    }

    return (
      <div className={styles.colorGreen}>
        <Select
          options={selectContact}
          value={modalSelectedContact}
          onChange={this.modalSelectedContactChange}
        />
      </div>
    );
  };

  getContactChecked = (input: any) => {
    const { selectedContacts } = this.state;
    const filters = selectedContacts.filter(
      selectedContact => selectedContact === input.value
    );
    return filters.length > 0;
  };

  handleChechContactItem = (e: any, key: string) => {
    const { checked } = e.target;

    if (key) {
      let { selectedContacts } = this.state;
      if (checked) {
        selectedContacts.push(key);
      } else {
        selectedContacts = selectedContacts.filter(
          (contact: any) => contact !== key
        );
      }
      this.setState({
        selectedContacts
      });
    } else if (checked) {
      const { contacts } = this.props;
      this.setState({
        selectedContacts: contacts.map((contact: any) => contact.id)
      });
    } else {
      this.setState({
        selectedContacts: []
      });
    }
  };

  handleOnDeleteContactItem = () => {
    const { selectedContacts } = this.state;
    if (selectedContacts.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'Please select contacts to delete'
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

  contactModalSubmit = submit => {
    const { onAddContact } = this.props;

    if (!isEmpty(submit)) {
      onAddContact(submit);
    }

    this.setState({
      modalSelectedContact: {},
      isModalVisible: false
    });
  };

  onConfirmClick = () => {
    const { selectedContacts } = this.state;
    const { onRemoveContacts } = this.props;

    onRemoveContacts(selectedContacts);

    this.setState({
      isConfirmVisible: false,
      selectedContacts: []
    });
  };

  render() {
    const {
      isModalVisible,
      modalSelectedContact,
      isAlertVisible,
      isConfirmVisible,
      message
    } = this.state;

    return (
      <fieldset className={styles.fieldsetOffset}>
        <legend>Contacts</legend>
        {this.getContactList()}
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
              onClick={this.handleOnDeleteContactItem}
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
          {this.getContactSelect()}
          <div className={styles.modalInputInline}>
            <div>
              <button
                type="button"
                className="tab-container-button"
                disabled={isEmpty(modalSelectedContact)}
                onClick={() => {
                  this.contactModalSubmit(modalSelectedContact);
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
                  this.contactModalSubmit({});
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

export default connect(mapStateToProps)(Contacts);
