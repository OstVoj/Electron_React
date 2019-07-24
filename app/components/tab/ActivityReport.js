/* eslint-disable react/no-unused-state */
// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import * as TabActions from '../../actions/tab';
import Attachments from './common/Attachments';
import TabButtonContainer from './common/TabButtonContainer';
import Cotainer from '../sections/Container';
import RoundedSection from '../sections/RoundedSection';
import Fieldset from '../sections/Fieldset';
import Col from '../sections/Col';
import Row from '../sections/Row';
import HorizontalInput from '../inputs/HorizontalInput';
import AccountSelector from './common/AccountSelector';
import ActivitySelector from './common/ActivitySelector';
import Observations from './common/Observations';
import Contacts from './common/Contacts';
import Alert from '../dialog/Alert';
import Confirm from '../dialog/Confirm';
import utility from '../../utils/utility';

const tabName = 'ACTIVITY REPORT';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: Object) => void,
  saveRecord: (recordType: string, props: Object) => void,
  onCloseTab: () => void
};

type States = {
  selectedAccount: Object,
  dateReported: string,
  shiftStart: string,
  shiftEnd: string,
  observations: Array<any>,
  contacts: Array<any>,
  duties: Array<any>,
  attachments: Array<string>,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string,
  dlgType: number,
  time: string,
  date: string,
  selectedActivity: Object,
  activityNotes: string
};

class ActivityReport extends Component<Props, States> {
  props: Props;

  state = {
    selectedAccount: {},
    dateReported: '',
    shiftStart: '',
    shiftEnd: '',
    observations: [],
    contacts: [],
    duties: [],
    attachments: [],
    isAlertVisible: false,
    isConfirmVisible: false,
    message: '',
    dlgType: 0,
    time: '',
    date: '',
    selectedActivity: {},
    activityNotes: ''
  };

  onChange = changes => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    setTabProperties(tabName, tabId, {
      ...props,
      ...changes
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

  onCloseTab = () => {
    this.setState({
      isConfirmVisible: true,
      message: 'Are you sure?',
      dlgType: 1
    });
  };

  handleInputChange = (event: Object) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const changes = {};
    changes[name] = value;
    this.onChange(changes);
  };

  handleShiftStartChange = (value: string) => {
    const changes = {};
    changes.shiftStart = value;
    this.onChange(changes);
  };

  handleShiftEndChange = (value: string) => {
    const changes = {};
    changes.shiftEnd = value;
    this.onChange(changes);
  };

  handleTimeChange = (value: string) => {
    const changes = {};
    changes.time = value;
    this.onChange(changes);
  };

  onSelectAccount = (account: Object) => {
    this.onChange({ selectedAccount: account });
  };

  onSelectActivity = (activity: Object) => {
    this.onChange({ selectedActivity: activity });
  };

  onAddAttachment = (copyPath: string) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    props.attachments.push(copyPath);
    this.onChange({ attachments: props.attachments });
  };

  onRemoveAttachment = (selectedAttachment: string) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const attachments = props.attachments.filter(
      attachment => attachment !== selectedAttachment
    );
    this.onChange({ attachments });
  };

  onConfirmClick = () => {
    const { dlgType } = this.state;
    if (dlgType === 1) {
      // Close Tab
      const { onCloseTab } = this.props;
      onCloseTab();
    } else if (dlgType === 2) {
      // Clear Tab
      const { tabStore, setTabProperties } = this.props;
      const { tabId } = tabStore.selectedTabProps;
      setTabProperties(tabName, tabId, {
        selectedAccount: {},
        dateReported: '',
        shiftStart: '',
        shiftEnd: '',
        observations: [],
        contacts: [],
        duties: [],
        attachments: []
      });
    }
    this.setState({
      isConfirmVisible: false
    });
  };

  onSaveClick = () => {
    const { tabStore, loginStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedAccount } = props;
    if (!selectedAccount.value) {
      this.setState({
        isAlertVisible: true,
        message: 'An account must be selected'
      });
      return;
    }

    props.account = selectedAccount.value;
    const { userId } = loginStore.auth;
    props.userId = userId;

    const { onCloseTab, saveRecord } = this.props;
    saveRecord('activity', props);
    onCloseTab();
  };

  onAddObservation = (observation: Object) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { observations } = props;
    const filters = observations.filter(
      (item: Object) => item.id === observation.id
    );
    if (filters.length === 0) {
      observations.push(observation);
      this.onChange({ observations });
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
    this.onChange({ observations: result });
  };

  onAddContact = (contact: Object) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { contacts } = props;
    const filters = contacts.filter((item: Object) => item.id === contact.id);
    if (filters.length === 0) {
      contacts.push(contact);
      this.onChange({ contacts });
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
    this.onChange({ contacts: result });
  };

  onAddActivityClick = () => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { duties, time, date, selectedActivity, activityNotes } = props;

    if (!time) {
      this.setState({
        isAlertVisible: true,
        message: 'Time must be selected.'
      });
      return;
    }
    if (!date) {
      this.setState({
        isAlertVisible: true,
        message: 'Date must be selected.'
      });
      return;
    }
    if (!selectedActivity.value) {
      this.setState({
        isAlertVisible: true,
        message: 'Activity must be selected.'
      });
      return;
    }
    duties.push({
      id: utility.getRandomInt(),
      time,
      date,
      duty: selectedActivity.value,
      activityNotes
    });

    const changes = {
      time: '',
      date: '',
      activityNotes: '',
      selectedActivity: {},
      duties
    };
    this.onChange(changes);
  };

  onCancelActivityClick = () => {
    const changes = {
      time: '',
      date: '',
      activityNotes: ''
    };
    this.onChange(changes);
  };

  getDuties = (duties: Array<any>) => (
    <table>
      <thead>
        <tr>
          <th>Duty ID</th>
          <th>Date</th>
          <th>Time</th>
          <th>Duty</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {duties &&
          duties.map((duty: Object, key: number) => (
            <tr key={key}>
              <td>{duty.id}</td>
              <td>{duty.date}</td>
              <td>{duty.time}</td>
              <td>{duty.duty}</td>
              <td>{duty.activityNotes.substring(0, 100)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  render() {
    const { isAlertVisible, isConfirmVisible, message } = this.state;

    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const {
      selectedAccount,
      dateReported,
      shiftStart,
      shiftEnd,
      observations,
      contacts,
      duties,
      attachments,
      time,
      date,
      selectedActivity,
      activityNotes
    } = isEmpty(props) ? this.state : props;

    return (
      <Cotainer column>
        <Row>
          <Col w={60}>
            <RoundedSection>
              <Col w={50}>
                <HorizontalInput
                  type="date"
                  label="Date Reported"
                  name="dateReported"
                  value={dateReported}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col w={3} />
              <Col w={30}>
                <HorizontalInput
                  type="timeInput"
                  label="Shift Start"
                  name="shiftStart"
                  value={shiftStart}
                  onChange={this.handleShiftStartChange}
                />
              </Col>
              <Col w={27}>
                <HorizontalInput
                  type="timeInput"
                  label="Shift End"
                  name="shiftEnd"
                  value={shiftEnd}
                  onChange={this.handleShiftEndChange}
                />
              </Col>
            </RoundedSection>
            <Row m p>
              <Col w={100}>
                <Observations
                  observations={observations}
                  onAddObservation={this.onAddObservation}
                  onRemoveObservations={this.onRemoveObservations}
                />
              </Col>
            </Row>
            <Row m p>
              <Col w={100}>
                <Contacts
                  contacts={contacts}
                  onAddContact={this.onAddContact}
                  onRemoveContacts={this.onRemoveContacts}
                />
              </Col>
            </Row>
            <Row m p>
              <Col w={100}>
                <Fieldset legend="Activity">
                  <Row m p>
                    <Col w={30}>
                      <HorizontalInput
                        type="timeInput"
                        label="Time"
                        name="time"
                        value={time}
                        onChange={this.handleTimeChange}
                      />
                    </Col>
                    <Col w={50}>
                      <HorizontalInput
                        type="date"
                        label="Date"
                        name="date"
                        value={date}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col w={20} />
                  </Row>
                  <Row m p>
                    <Col>
                      <ActivitySelector
                        selectedActivity={selectedActivity}
                        onSelectActivity={this.onSelectActivity}
                      />
                    </Col>
                  </Row>
                  <Row m p>
                    <Col w={70}>
                      <HorizontalInput
                        type="textarea"
                        label="Notes"
                        name="activityNotes"
                        value={activityNotes}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col w={10} />
                    <Col w={20}>
                      <Row>
                        <button
                          type="button"
                          className="tabContainerButton"
                          onClick={this.onAddActivityClick}
                        >
                          Add
                        </button>
                      </Row>
                      <Row m p>
                        <button
                          type="button"
                          className="tabContainerButton"
                          onClick={this.onCancelActivityClick}
                        >
                          Cancel
                        </button>
                      </Row>
                    </Col>
                  </Row>
                </Fieldset>
              </Col>
            </Row>
          </Col>
          <Col w={40} m>
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
        <Row m p>
          <Col>
            <Fieldset legend="Duties Performed">
              {this.getDuties(duties)}
            </Fieldset>
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
)(ActivityReport);
