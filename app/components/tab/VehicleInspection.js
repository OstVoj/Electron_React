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
import InspectionItems from './common/InspectionItems';

const tabName = 'VEHICLE INSPECTION';

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
  inspectionItems: Array<any>,
  vehicleDriveAbility: string,
  priorDriver: string,
  urgentMaintenance: string,
  shiftStartMileAge: string,
  shiftEndMileAge: string,
  vehicle: string,
  notes: string,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string,
  dlgType: number
};

class VehicleInspection extends Component<Props, States> {
  props: Props;

  state = {
    selectedAccount: {},
    attachments: [],
    inspectionItems: [],
    vehicleDriveAbility: '',
    priorDriver: '',
    urgentMaintenance: '',
    shiftStartMileAge: '',
    shiftEndMileAge: '',
    vehicle: '',
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

  onChangeSelectedInspections = (inspections: Array<number>) => {
    this.onChange({
      inspectionItems: inspections
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
        inspectionItems: [],
        vehicleDriveAbility: '',
        priorDriver: '',
        urgentMaintenance: '',
        shiftStartMileAge: '',
        shiftEndMileAge: '',
        vehicle: '',
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
    const { selectedAccount, inspectionItems } = props;
    if (!selectedAccount.value) {
      this.setState({
        isAlertVisible: true,
        message: 'An account must be selected'
      });
      return;
    }
    if (inspectionItems.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'Inspection Items must be selected'
      });
      return;
    }

    props.account = selectedAccount.value;
    const { userId } = loginStore.auth;
    props.userId = userId;

    const { onCloseTab, saveRecord } = this.props;
    saveRecord('vehicle inspection', props);
    onCloseTab();
  };

  render() {
    const { isAlertVisible, isConfirmVisible, message } = this.state;

    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const {
      selectedAccount,
      attachments,
      inspectionItems,
      vehicleDriveAbility,
      priorDriver,
      urgentMaintenance,
      shiftStartMileAge,
      shiftEndMileAge,
      vehicle,
      notes
    } = isEmpty(props) ? this.state : props;

    return (
      <Cotainer column>
        <Row>
          <Col w={60}>
            <Row>
              <Col w={100}>
                <InspectionItems
                  selectedInspections={inspectionItems}
                  onChangeSelectedInspection={this.onChangeSelectedInspections}
                />
              </Col>
            </Row>
            <Row m p>
              <Col w={100}>
                <RoundedSection column>
                  <Row m p>
                    <HorizontalInput
                      type="input"
                      value={vehicleDriveAbility}
                      name="vehicleDriveAbility"
                      label="Vehicle DriveAbility"
                      onChange={this.handleInputChange}
                    />
                  </Row>
                  <Row m p>
                    <HorizontalInput
                      type="input"
                      value={priorDriver}
                      name="priorDriver"
                      label="Prior Driver"
                      onChange={this.handleInputChange}
                    />
                  </Row>
                  <Row m p>
                    <HorizontalInput
                      type="input"
                      value={urgentMaintenance}
                      name="urgentMaintenance"
                      label="Urgent Maintenance"
                      onChange={this.handleInputChange}
                    />
                  </Row>
                  <Row m p>
                    <HorizontalInput
                      type="input"
                      value={shiftStartMileAge}
                      name="shiftStartMileAge"
                      label="Shift start mileage"
                      onChange={this.handleInputChange}
                    />
                  </Row>
                  <Row m p>
                    <HorizontalInput
                      type="input"
                      value={shiftEndMileAge}
                      name="shiftEndMileAge"
                      label="Shift end mileage"
                      onChange={this.handleInputChange}
                    />
                  </Row>
                  <Row m p>
                    <HorizontalInput
                      type="input"
                      value={vehicle}
                      name="vehicle"
                      label="Vehicle #"
                      onChange={this.handleInputChange}
                    />
                  </Row>
                </RoundedSection>
              </Col>
            </Row>
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
)(VehicleInspection);
