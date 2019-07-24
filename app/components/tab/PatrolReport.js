/* eslint-disable react/no-unused-state */
// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import cloneDeep from 'lodash.clonedeep';
import * as TabActions from '../../actions/tab';
import Observations from './common/Observations';
import Contacts from './common/Contacts';
import Alert from '../dialog/Alert';
import Confirm from '../dialog/Confirm';
import Attachments from './common/Attachments';
import TimeInput from '../inputs/TimeInput';
import TabButtonContainer from './common/TabButtonContainer';
import Cotainer from '../sections/Container';
import RoundedSection from '../sections/RoundedSection';
import AccountSelector from './common/AccountSelector';
import Fieldset from '../sections/Fieldset';
import Col from '../sections/Col';
import Row from '../sections/Row';
import HorizontalInput from '../inputs/HorizontalInput';
import Input from '../inputs/Input';

const tabName = 'PATROL / DAR';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: any) => void,
  saveRecord: (recordType: string, props: Object) => void,
  onCloseTab: () => void
};

type States = {
  selectedAccount: Object,
  modalSelectedContact: Object,
  modalSelectedObservation: Object,
  notes: string,
  arrivalTimes: Array<any>,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  isObservationModalVisible: boolean,
  message: string,
  contacts: Array<any>,
  isModalVisible: boolean,
  observations: Array<any>,
  attachments: Object,
  reportedDate: string,
  shiftStart: string,
  shiftEnd: string,
  selectedObservations: Array<any>,
  selectedContacts: Array<any>,
  dlgType: number,
  attachments: Array<string>
};

class PatrolReport extends Component<Props, States> {
  props: Props;

  state = {
    modalSelectedContact: {},
    modalSelectedObservation: {},
    selectedAccount: {},
    notes: '',
    arrivalTimes: [
      { value: '', edited: false },
      { value: '', edited: false },
      { value: '', edited: false },
      { value: '', edited: false },
      { value: '', edited: false },
      { value: '', edited: false },
      { value: '', edited: false },
      { value: '', edited: false },
      { value: '', edited: false },
      { value: '', edited: false },
      { value: '', edited: false }
    ],
    isAlertVisible: false,
    isConfirmVisible: false,
    isModalVisible: false,
    isObservationModalVisible: false,
    message: '',
    contacts: [],
    observations: [],
    attachments: [],
    reportedDate: '',
    shiftStart: '',
    shiftEnd: '',
    selectedObservations: [],
    selectedContacts: [],
    dlgType: 0
  };

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  modalSelectedContactChange = change => {
    this.setState({
      modalSelectedContact: change
    });
  };

  modalSelectedObservationChange = change => {
    this.setState({
      modalSelectedObservation: change
    });
  };

  contactModalSubmit = submit => {
    if (!isEmpty(submit)) {
      const { setTabProperties, tabStore } = this.props;
      const { props, tabId } = tabStore.selectedTabProps;
      props.contacts.push(submit);
      setTabProperties(tabName, tabId, props);
    }

    this.setState({
      modalSelectedContact: {},
      isModalVisible: false
    });
  };

  observationModalSubmit = submit => {
    if (!isEmpty(submit)) {
      const { setTabProperties, tabStore } = this.props;
      const { props, tabId } = tabStore.selectedTabProps;
      props.observations.push(submit);
      setTabProperties(tabName, tabId, props);
    }

    this.setState({
      modalSelectedObservation: {},
      isObservationModalVisible: false
    });
  };

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props[name] = value;
    setTabProperties(tabName, tabId, props);
  };

  onSelectAccount = account => {
    const { setTabProperties, tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.selectedAccount = account;
    setTabProperties(tabName, tabId, props);
  };

  onCloseTab = () => {
    this.setState({
      isConfirmVisible: true,
      message: 'Are you sure?',
      dlgType: 0
    });
  };

  onClearClick = () => {
    this.setState({
      isConfirmVisible: true,
      message:
        'Are you sure you want to completely clear this form?<br>All changes made will be lost.',
      dlgType: 2
    });
  };

  handleReportedDateChange = (e: Object) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.reportedDate = e.target.value;
    setTabProperties(tabName, tabId, props);
  };

  handleShiftStartChange = (value: string) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.shiftStart = value;
    setTabProperties(tabName, tabId, props);
  };

  handleShiftEndChange = (value: string) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.shiftEnd = value;
    setTabProperties(tabName, tabId, props);
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
      const { tabStore } = this.props;
      const { props } = tabStore.selectedTabProps;
      const { observations } = props;
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

  handleChechContactItem = (e: any, key: string) => {
    const { checked } = e.target;

    if (key) {
      let { selectedContacts } = this.state;
      if (checked) {
        selectedContacts.push(key);
      } else {
        selectedContacts = selectedContacts.filter(
          (observation: any) => observation !== key
        );
      }
      this.setState({
        selectedContacts
      });
    } else if (checked) {
      const { tabStore } = this.props;
      const { props } = tabStore.selectedTabProps;
      const { contacts } = props;
      this.setState({
        selectedContacts: contacts.map((contact: any) => contact.id)
      });
    } else {
      this.setState({
        selectedContacts: []
      });
    }
  };

  handleOnDeleteObservationItem = () => {
    const { selectedObservations } = this.state;
    if (selectedObservations.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'Please select contacts to delete'
      });
    } else {
      this.setState({
        isConfirmVisible: true,
        message: 'Are you sure, you want delete selected items',
        dlgType: 3
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
        message: 'Are you sure, you want delete selected items',
        dlgType: 1
      });
    }
  };

  onConfirmClick = () => {
    const { dlgType } = this.state;
    if (dlgType === 0) {
      const { onCloseTab } = this.props;
      onCloseTab();
    } else if (dlgType === 1) {
      const { selectedContacts } = this.state;
      const { tabStore, setTabProperties } = this.props;
      const { props, tabId } = tabStore.selectedTabProps;

      const contacts = props.contacts.filter((contact: any) => {
        const filter = selectedContacts.filter(
          (selected: any) => selected === contact.id
        );
        return filter.length === 0;
      });
      props.contacts = contacts;
      setTabProperties(tabName, tabId, props);
      this.setState({
        isConfirmVisible: false,
        selectedContacts: []
      });
    } else if (dlgType === 2) {
      const { tabStore, setTabProperties } = this.props;
      const { tabId } = tabStore.selectedTabProps;
      setTabProperties(tabName, tabId, {
        reportedDate: '',
        shiftStart: '',
        shiftEnd: '',
        selectedAccount: {},
        arrivalTimes: [
          { value: '', edited: false },
          { value: '', edited: false },
          { value: '', edited: false },
          { value: '', edited: false },
          { value: '', edited: false },
          { value: '', edited: false },
          { value: '', edited: false },
          { value: '', edited: false },
          { value: '', edited: false },
          { value: '', edited: false },
          { value: '', edited: false }
        ],
        attachments: []
      });
      this.setState({
        isConfirmVisible: false
      });
    }
  };

  onSaveClick = () => {
    const { tabStore, loginStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedAccount, reportedDate } = props;

    if (!selectedAccount) {
      this.setState({
        isAlertVisible: true,
        message: 'An account must be selected'
      });
    } else if (!reportedDate) {
      this.setState({
        isAlertVisible: true,
        message: 'Reported Date must be selected'
      });
    } else {
      const { userId } = loginStore.auth;
      props.account = selectedAccount.value;
      props.userId = userId;

      const { onCloseTab, saveRecord } = this.props;
      saveRecord('patrol', props);
      onCloseTab();
    }
  };

  onAddAttachment = (copyPath: string) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.attachments.push(copyPath);
    setTabProperties(tabName, tabId, props);
  };

  onRemoveAttachment = (selectedAttachment: string) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    const attchments = props.attachments.filter(
      attachment => attachment !== selectedAttachment
    );
    props.attachments = attchments;
    setTabProperties(tabName, tabId, props);
  };

  timeInputChangeValue = (key: number, value: string) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    const arrivalTimes = cloneDeep(props.arrivalTimes);
    arrivalTimes[key].value = value;
    props.arrivalTimes = arrivalTimes;
    setTabProperties(tabName, tabId, props);
  };

  renderDates() {
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');
    const { reportedDate, shiftStart, shiftEnd } = isEmpty(props)
      ? this.state
      : props;

    return (
      <RoundedSection>
        <Row>
          <Col w={50}>
            <HorizontalInput
              type="date"
              value={reportedDate}
              label="Date Reported:"
              onChange={this.handleReportedDateChange}
            />
          </Col>
          <Col w={25} m>
            <Row>
              <Col>Shift Start:</Col>
              <Col>
                <TimeInput
                  defaultValue={shiftStart}
                  handleOnChange={this.handleShiftStartChange}
                  className=""
                />
              </Col>
            </Row>
          </Col>
          <Col w={25} m>
            <Row>
              <Col>Shift End:</Col>
              <Col>
                <TimeInput
                  defaultValue={shiftEnd}
                  handleOnChange={this.handleShiftEndChange}
                  className=""
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </RoundedSection>
    );
  }

  renderArrivalTimes() {
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const { arrivalTimes } = isEmpty(props) ? this.state : props;

    return (
      <Fieldset legend="Arrival Times">
        <Row>
          {arrivalTimes &&
            arrivalTimes.map((input, key) => (
              <Col>
                <TimeInput
                  key={key}
                  defaultValue={input.value}
                  handleOnChange={value => {
                    this.timeInputChangeValue(key, value);
                  }}
                  className=""
                />
              </Col>
            ))}
        </Row>
      </Fieldset>
    );
  }

  renderGallery(attachments) {
    return (
      <Attachments
        attachments={attachments}
        onAddAttachment={this.onAddAttachment}
        onRemoveAttachment={this.onRemoveAttachment}
      />
    );
  }

  onAddObservation = (observation: Object) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { observations } = props;
    const filters = observations.filter(
      (item: Object) => item.id === observation.id
    );
    if (filters.length === 0) {
      observations.push(observation);
      const { setTabProperties } = this.props;
      const { tabId } = tabStore.selectedTabProps;
      props.observations = observations;
      setTabProperties(tabName, tabId, props);
    } else {
      this.setState({
        isAlertVisible: true,
        message: 'Observation have already been added. Please choose another.'
      });
    }
  };

  onRemoveObservations = (selectedObservations: Array) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { observations } = props;

    const result = observations.filter((observation: any) => {
      const filter = selectedObservations.filter(
        (selected: any) => selected === observation.id
      );
      return filter.length === 0;
    });
    const { setTabProperties } = this.props;
    const { tabId } = tabStore.selectedTabProps;
    props.observations = result;
    setTabProperties(tabName, tabId, props);
  };

  onAddContact = (contact: Object) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { contacts } = props;
    const filters = contacts.filter((item: Object) => item.id === contact.id);
    if (filters.length === 0) {
      contacts.push(contact);
      const { setTabProperties } = this.props;
      const { tabId } = tabStore.selectedTabProps;
      props.contacts = contacts;
      setTabProperties(tabName, tabId, props);
    } else {
      this.setState({
        isAlertVisible: true,
        message: 'Contact had already been added. Please choose another.'
      });
    }
  };

  onRemoveContacts = (selectedContacts: Array) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { contacts } = props;

    const result = contacts.filter((contact: any) => {
      const filter = selectedContacts.filter(
        (selected: any) => selected === contact.id
      );
      return filter.length === 0;
    });
    const { setTabProperties } = this.props;
    const { tabId } = tabStore.selectedTabProps;
    props.contacts = result;
    setTabProperties(tabName, tabId, props);
  };

  render() {
    const { isAlertVisible, isConfirmVisible, message } = this.state;

    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const {
      attachments,
      selectedAccount,
      notes,
      observations,
      contacts
    } = isEmpty(props) ? this.state : props;

    return (
      <Cotainer column>
        <Row>
          <Col w={60}>
            {this.renderDates()}
            <br />
            <Observations
              observations={observations}
              onAddObservation={this.onAddObservation}
              onRemoveObservations={this.onRemoveObservations}
            />
            <br />
            <Contacts
              contacts={contacts}
              onAddContact={this.onAddContact}
              onRemoveContacts={this.onRemoveContacts}
            />
            <br />
            {this.renderArrivalTimes()}
            <Row m p>
              <Col w={100}>
                <Fieldset legend="Notes">
                  <Input
                    type="textarea"
                    value={notes}
                    name="notes"
                    label=""
                    onChange={this.handleInputChange}
                  />
                </Fieldset>
              </Col>
            </Row>
          </Col>
          <Col w={40} m p>
            <Row>
              <Col w={100}>
                <Attachments
                  attachments={attachments}
                  onAddAttachment={this.onAddAttachment}
                  onRemoveAttachment={this.onRemoveAttachment}
                />
              </Col>
            </Row>
            <Row m p>
              <Col w={100}>
                <Fieldset legend="Account">
                  <AccountSelector
                    selectedAccount={selectedAccount}
                    onSelectAccount={this.onSelectAccount}
                  />
                </Fieldset>
              </Col>
            </Row>
            <TabButtonContainer
              onSave={this.onSaveClick}
              onCancel={this.onCloseTab}
              onClear={this.onClearClick}
            />
          </Col>
        </Row>
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
      </Cotainer>
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login,
    tabStore: state.tab,
    ...this.props
  };
}

function mapDispatchToProps(dispatch: PropTypes.object) {
  return bindActionCreators(TabActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatrolReport);
