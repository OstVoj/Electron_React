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
import Input from '../inputs/Input';
import Alert from '../dialog/Alert';
import Confirm from '../dialog/Confirm';
import TimeInput from '../inputs/TimeInput';
import ActivitySelector from './common/ActivitySelector';
import styles from './ShiftReport.css';

const tabName = 'SHIFT REPORT';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: Object) => void,
  saveRecord: (recordType: string, props: Object) => void,
  onCloseTab: () => void
};

type States = {
  selectedAccount: Object,
  timeIn: string,
  timeOut: string,
  selectedActivity: Object,
  notes: string,
  reports: Array<any>,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string,
  dlgType: number
};

class ShiftReport extends Component<Props, States> {
  props: Props;

  state = {
    selectedAccount: {},
    timeIn: '',
    timeOut: '',
    selectedActivity: {},
    notes: '',
    reports: [],
    isAlertVisible: false,
    isConfirmVisible: false,
    message: '',
    dlgType: 0
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

  handleInputChange = (event: Object) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const changes = {};
    changes[name] = value;
    this.onChange(changes);
  };

  handleTimeInChange = (value: string) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.timeIn = value;
    setTabProperties(tabName, tabId, props);
  };

  handleTimeOutChange = (value: string) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.timeOut = value;
    setTabProperties(tabName, tabId, props);
  };

  onSelectActivity = (activity: Object) => {
    this.onChange({ selectedActivity: activity });
  };

  onSelectAccount = (account: Object) => {
    this.onChange({ selectedAccount: account });
  };

  onConfirmClick = () => {
    const { dlgType } = this.state;
    if (dlgType === 2) {
      // Clear Tab
      const { tabStore, setTabProperties } = this.props;
      const { tabId, props } = tabStore.selectedTabProps;
      setTabProperties(tabName, tabId, {
        selectedAccount: {},
        timeIn: '',
        timeOut: '',
        selectedActivity: {},
        notes: '',
        id: props.id,
        reports: props.reports
      });
    }
    this.setState({
      isConfirmVisible: false
    });
  };

  onSaveClick = () => {
    const { tabStore, loginStore, saveRecord } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedAccount, selectedActivity, id } = props;

    if (!selectedAccount || !selectedAccount.value) {
      this.setState({
        isAlertVisible: true,
        message: 'An account must be selected'
      });
      return;
    }
    if (!selectedActivity || !selectedActivity.value) {
      this.setState({
        isAlertVisible: true,
        message: 'An activity must be selected'
      });
      return;
    }

    const { timeIn, timeOut, notes } = props;

    props.reports.push({
      account: selectedAccount.value,
      timeIn,
      timeOut,
      activity: selectedActivity.value,
      notes
    });

    const { userId } = loginStore.auth;
    const data = {
      id,
      account: 0,
      userId,
      reports: props.reports
    };

    saveRecord('shift', data);
    const { setTabProperties } = this.props;
    const { tabId } = tabStore.selectedTabProps;
    setTabProperties(tabName, tabId, {
      selectedAccount: {},
      timeIn: '',
      timeOut: '',
      selectedActivity: {},
      notes: '',
      id,
      reports: props.reports
    });
  };

  getAccountName = (accountId: number) => {
    const { loginStore } = this.props;
    if (loginStore.loader) {
      const { accounts } = loginStore.loader;
      const filters = accounts.filter(
        account => account.accountId === accountId
      );
      if (filters.length > 0) {
        return filters[0].name;
      }
      return null;
    }
    return null;
  };

  getActivityName = (activityId: number) => {
    const { loginStore } = this.props;
    if (loginStore.loader) {
      const { activities } = loginStore.loader;
      const filters = activities.filter(activity => activity.id === activityId);
      if (filters.length > 0) {
        return filters[0].details;
      }
      return null;
    }
    return null;
  };

  getReportRows = (reports: Array<any>) => {
    const result = reports.map((report: Object, key: number) => {
      const { timeIn, timeOut, activity, account, notes } = report;

      return (
        <tr key={key}>
          <td>{this.getAccountName(account)}</td>
          <td>{timeIn}</td>
          <td>{timeOut}</td>
          <td>{this.getActivityName(activity)}</td>
          <td>{notes}</td>
        </tr>
      );
    });
    return result;
  };

  renderReports = () => {
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');
    const reports = get(props, 'reports');

    return (
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Activities Performed</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {reports && reports.length > 0 && this.getReportRows(reports)}
        </tbody>
      </table>
    );
  };

  render() {
    const { isAlertVisible, isConfirmVisible, message } = this.state;

    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const {
      selectedAccount,
      timeIn,
      timeOut,
      selectedActivity,
      notes
    } = isEmpty(props) ? this.state : props;

    return (
      <Cotainer column>
        <Row>
          <RoundedSection column>
            <Row m p width="600">
              <Col w={20}>Account:</Col>
              <Col w={80} m>
                <AccountSelector
                  selectedAccount={selectedAccount}
                  onSelectAccount={this.onSelectAccount}
                />
              </Col>
            </Row>
            <Row m p width="300">
              <Col w={40}>Time In:</Col>
              <Col w={60} m>
                <TimeInput
                  defaultValue={timeIn}
                  handleOnChange={this.handleTimeInChange}
                  className=""
                />
              </Col>
            </Row>
            <Row m p width="300">
              <Col w={40}>Time Out:</Col>
              <Col w={60} m>
                <TimeInput
                  defaultValue={timeOut}
                  handleOnChange={this.handleTimeOutChange}
                  className=""
                />
              </Col>
            </Row>
            <Row m p width="600">
              <Col w={20}>Activity:</Col>
              <Col w={80} m>
                <ActivitySelector
                  selectedActivity={selectedActivity}
                  onSelectActivity={this.onSelectActivity}
                />
              </Col>
            </Row>
            <Row m p>
              <Col width="300">
                <HorizontalInput
                  type="text"
                  value={notes}
                  label="Notes:"
                  name="notes"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col width="200" m>
                <Row>
                  <Col>
                    <button
                      type="button"
                      className={styles.tabContainerButton}
                      onClick={this.onSaveClick}
                    >
                      Add Item
                    </button>
                  </Col>
                  <Col m>
                    <button
                      type="button"
                      className={styles.tabContainerButton}
                      onClick={this.onClearClick}
                    >
                      Clear
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </RoundedSection>
        </Row>
        <Row m p>
          {this.renderReports()}
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
)(ShiftReport);
