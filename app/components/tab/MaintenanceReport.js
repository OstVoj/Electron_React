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

const tabName = 'MAINTENANCE REPORT';

const urgencies = [
  {
    value: 0,
    label: 'Low'
  },
  {
    value: 1,
    label: 'Medium'
  },
  {
    value: 2,
    label: 'High'
  }
];

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: Object) => void,
  saveRecord: (recordType: string, props: Object) => void,
  onCloseTab: () => void
};

type States = {
  selectedAccount: Object,
  attachments: Array<string>,
  maintenenceIssues: Array<any>,
  urgency: number,
  chkMaintenance: boolean,
  chkPropertyManager: boolean,
  chkGasCompany: boolean,
  chkElectricCompany: boolean,
  notes: string,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string,
  dlgType: number
};

class MaintenanceReport extends Component<Props, States> {
  props: Props;

  state = {
    selectedAccount: {},
    attachments: [],
    maintenenceIssues: [],
    urgency: 0,
    chkMaintenance: false,
    chkPropertyManager: false,
    chkGasCompany: false,
    chkElectricCompany: false,
    notes: '',
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

  onSelectAccount = (account: Object) => {
    this.onChange({ selectedAccount: account });
  };

  onChangeUrgency = (urgency: Object) => {
    this.onChange({ urgency: urgency.value });
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
        attachments: [],
        maintenenceIssues: [],
        urgency: 0,
        chkMaintenance: false,
        chkPropertyManager: false,
        chkGasCompany: false,
        chkElectricCompany: false,
        notes: ''
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
    saveRecord('maintenance', props);
    onCloseTab();
  };

  render() {
    const { isAlertVisible, isConfirmVisible, message } = this.state;

    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const {
      selectedAccount,
      attachments,
      urgency,
      chkMaintenance,
      chkPropertyManager,
      chkGasCompany,
      chkElectricCompany,
      notes
    } = isEmpty(props) ? this.state : props;

    const urgencyValues = urgencies.filter(
      (item: Object) => item.value === urgency
    );

    return (
      <Cotainer column>
        <Row>
          <Col w={60}>
            <Row>
              <Col w={50}>
                <RoundedSection>
                  <HorizontalInput
                    type="select"
                    options={urgencies}
                    label="Urgency"
                    value={urgencyValues[0]}
                    onChange={this.onChangeUrgency}
                  />
                </RoundedSection>
              </Col>
              <Col w={50} m>
                <Fieldset legend="Notified">
                  <HorizontalInput
                    type="checkbox"
                    value={chkMaintenance}
                    name="chkMaintenance"
                    label="Maintenance"
                    onChange={this.handleInputChange}
                  />
                  <HorizontalInput
                    type="checkbox"
                    value={chkPropertyManager}
                    name="chkPropertyManager"
                    label="Property Manager"
                    onChange={this.handleInputChange}
                  />
                  <HorizontalInput
                    type="checkbox"
                    value={chkGasCompany}
                    name="chkGasCompany"
                    label="Gas Company"
                    onChange={this.handleInputChange}
                  />
                  <HorizontalInput
                    type="checkbox"
                    value={chkElectricCompany}
                    name="chkElectricCompany"
                    label="Electric Company"
                    onChange={this.handleInputChange}
                  />
                </Fieldset>
              </Col>
            </Row>
            <Row m p>
              <Col w={100}>
                <Fieldset legend="Notes">
                  <Input
                    type="textarea"
                    value={notes}
                    name="notes"
                    onChange={this.handleInputChange}
                  />
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
)(MaintenanceReport);
