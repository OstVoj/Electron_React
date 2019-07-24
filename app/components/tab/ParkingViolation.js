// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash.get';
import * as TabActions from '../../actions/tab';
import Container from '../sections/Container';
import Col from '../sections/Col';
import RoundedSection from '../sections/RoundedSection';
import Fieldset from '../sections/Fieldset';
import Vehicles from './common/Vehicles';
import Row from '../sections/Row';
import CodeViolations from './common/CodeViolations';
import Alert from '../dialog/Alert';
import Confirm from '../dialog/Confirm';
import Attachments from './common/Attachments';
import AccountSelector from './common/AccountSelector';
import TabButtonContainer from './common/TabButtonContainer';
import Input from '../inputs/Input';
import HorizontalInput from '../inputs/HorizontalInput';
import ImpoundSelector from './common/ImpoundSelector';
import TowStatus from './common/TowStatus';
import Modal from '../Modal';

const tabName = 'PARKING VIOLATION';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: Object) => void,
  saveRecord: (recordType: string, props: Object) => void,
  getTowStatus: (plate: string, accountId: number) => void,
  onCloseTab: () => void
};

type States = {
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string,
  dlgType: number,
  isModalVisible: boolean
};

class ParkingViolation extends Component<Props, States> {
  props: Props;

  state = {
    isAlertVisible: false,
    isConfirmVisible: false,
    message: '',
    dlgType: 0,
    isModalVisible: false
  };

  onChange = changes => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    setTabProperties(tabName, tabId, {
      ...props,
      ...changes
    });
  };

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const props = {};
    props[name] = value;

    this.onChange({
      ...props
    });
  };

  handleChangeSelectedVehicle = (refId: number) => {
    this.onChange({
      selectedVehicleId: refId
    });
  };

  onAddVehicle = () => {
    this.onChange({
      selectedVehicleId: 0
    });
  };

  onSelectAccount = account => {
    this.onChange({
      selectedAccount: account
    });
  };

  onSelectImpound = impound => {
    this.onChange({
      selectedImpound: impound
    });
  };

  handleCloseVehicleModal = (vehicle: Object) => {
    if (vehicle) {
      if (vehicle.refId) {
        const { tabStore, setTabProperties } = this.props;
        const { props, tabId } = tabStore.selectedTabProps;
        if (props.vehicles) {
          const vehicles = props.vehicles.filter(
            item => item.refId === vehicle.refId
          );
          if (vehicles.length === 0) {
            props.vehicles.push(vehicle);
          } else {
            props.vehicles.splice(
              findIndex(props.vehicles, item => item.refId === vehicle.refId),
              1,
              vehicle
            );
          }
        } else {
          props.vehicles = [vehicle];
        }
        setTabProperties(tabName, tabId, props);
      }
    }
  };

  onDeleteVehicleClick = () => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedVehicleId } = props;
    if (selectedVehicleId) {
      const { vehicles } = props;
      const result = vehicles.filter(
        vehicle => vehicle.refId !== selectedVehicleId
      );
      this.onChange({
        selectedVehicleId: 0,
        vehicles: result
      });
    }
  };

  onAddCodeViolation = (codeViolation: Object) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { codeOfViolations } = props;

    if (codeOfViolations) {
      const filters = codeOfViolations.filter(
        (item: Object) => item.id === codeViolation.id
      );
      if (filters.length === 0) {
        codeOfViolations.push(codeViolation);
        this.onChange({ codeOfViolations });
      } else {
        this.setState({
          isAlertVisible: true,
          message:
            'Code Violation have already been added. Please choose another.'
        });
      }
    } else {
      const violations = [codeViolation];
      this.onChange({ codeOfViolations: violations });
    }
  };

  onRemoveCodeViolations = (selectedCodeViolations: Array) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { codeOfViolations } = props;

    const result = codeOfViolations.filter((codeViolation: any) => {
      const filter = selectedCodeViolations.filter(
        (selected: any) => selected === codeViolation.id
      );
      return filter.length === 0;
    });
    this.onChange({ codeOfViolations: result });
  };

  onAddAttachment = (copyPath: string) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;

    const attachments = get(props, 'attachments');

    if (attachments) {
      attachments.push(copyPath);
      this.onChange({
        attachments
      });
    } else {
      this.onChange({
        attachments: [copyPath]
      });
    }
  };

  onRemoveAttachment = (selectedAttachment: string) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;

    const attachments = props.attachments.filter(
      attachment => attachment !== selectedAttachment
    );

    this.onChange({
      attachments
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
      setTabProperties(tabName, tabId, {});
    }
    this.setState({
      isConfirmVisible: false
    });
  };

  onTowStatus = () => {
    const { getTowStatus, tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { plate, selectedAccount } = props;
    if (!selectedAccount) {
      this.setState({
        isAlertVisible: true,
        message: 'Please select an account'
      });
      return;
    }
    if (!plate) {
      this.setState({
        isAlertVisible: true,
        message: 'Please input the plate'
      });
      return;
    }
    getTowStatus(plate, selectedAccount.value);
    this.setState({
      isModalVisible: true
    });
  };

  onSaveClick = () => {
    const { tabStore, loginStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedAccount } = props;
    if (!selectedAccount) {
      this.setState({
        isAlertVisible: true,
        message: 'An account must be selected'
      });
      return;
    }

    const { userId } = loginStore.auth;
    const jsonData = {
      ...props,
      account: selectedAccount.value,
      userId
    };

    const { onCloseTab, saveRecord } = this.props;
    saveRecord('parking violation', jsonData);
    onCloseTab();
  };

  handleCloseModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  render() {
    const {
      isAlertVisible,
      isConfirmVisible,
      message,
      isModalVisible
    } = this.state;
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const vehicles = get(props, 'vehicles');
    const codeOfViolations = get(props, 'codeOfViolations');
    const selectedVehicleId = get(props, 'selectedVehicleId');
    const attachments = get(props, 'attachments');
    const selectedAccount = get(props, 'selectedAccount');
    const selectedImpound = get(props, 'selectedImpound');
    const notes = get(props, 'notes');
    const towCompanyName = get(props, 'towCompanyName');
    const towCompanyPhone = get(props, 'towCompanyPhone');
    const nameOfOperatorClearingVehicle = get(
      props,
      'nameOfOperatorClearingVehicle'
    );
    const agencyOperatorWorksFor = get(props, 'agencyOperatorWorksFor');
    const directLineForClearingVehicles = get(
      props,
      'directLineForClearingVehicles'
    );
    const plate = get(props, 'plate');
    const date = get(props, 'date');
    const time = get(props, 'time');
    const internal = get(props, 'internal');
    const other = get(props, 'other');
    const towStatus = get(tabStore, 'towStatus');

    return (
      <Container>
        <Col w={60}>
          <RoundedSection>
            <Vehicles
              vehicles={vehicles || []}
              selectedVehicleId={selectedVehicleId}
              handleChangeSelectedVehicle={this.handleChangeSelectedVehicle}
              onAddVehicle={this.onAddVehicle}
              handleCloseModal={this.handleCloseVehicleModal}
              onDeleteClick={this.onDeleteVehicleClick}
            />
          </RoundedSection>
          <Row m p>
            <Col w={100}>
              <CodeViolations
                codeViolations={codeOfViolations}
                onAddCodeViolation={this.onAddCodeViolation}
                onRemoveCodeViolations={this.onRemoveCodeViolations}
              />
            </Col>
          </Row>
          <Fieldset legend="Impound Information">
            <Row>
              <Col m p align="center" w={40}>
                Disposition
              </Col>
              <Col m p w={60}>
                <ImpoundSelector
                  selectedImpound={selectedImpound || null}
                  onSelectImpound={this.onSelectImpound}
                />
              </Col>
            </Row>
            <Row m p>
              <Col m p>
                <HorizontalInput
                  label="Tow Company Name:"
                  value={towCompanyName}
                  name="towCompanyName"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row p>
              <Col m p>
                <HorizontalInput
                  label="Tow Company Phone:"
                  value={towCompanyPhone}
                  name="towCompanyPhone"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row p>
              <Col m p>
                <HorizontalInput
                  label="Name of Operator Clearing Vehicle:"
                  value={nameOfOperatorClearingVehicle}
                  name="nameOfOperatorClearingVehicle"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row p>
              <Col m p>
                <HorizontalInput
                  label="Agency Operator works for:"
                  value={agencyOperatorWorksFor}
                  name="agencyOperatorWorksFor"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row p>
              <Col m p>
                <HorizontalInput
                  label="Direct Line for Clearing Vehicles:"
                  value={directLineForClearingVehicles}
                  name="directLineForClearingVehicles"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
          </Fieldset>
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
        <Col w={40} m p>
          <Attachments
            attachments={attachments}
            onAddAttachment={this.onAddAttachment}
            onRemoveAttachment={this.onRemoveAttachment}
          />
          <Row m p>
            <Col w={100}>
              <Fieldset legend="Plate Information">
                <Row m p>
                  <HorizontalInput
                    label="Plate:"
                    value={plate}
                    name="plate"
                    onChange={this.handleInputChange}
                  />
                </Row>
                <Row m p>
                  <Col justify="center">
                    <button
                      type="button"
                      className="green-button"
                      onClick={this.onTowStatus}
                    >
                      TOW STATUS
                    </button>
                  </Col>
                </Row>
              </Fieldset>
            </Col>
          </Row>
          <Row m p>
            <Col w={100}>
              <Fieldset legend="Date of Violation">
                <Row m p>
                  <Col w={100}>
                    <HorizontalInput
                      label="Date"
                      type="date"
                      value={date}
                      name="date"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row m p>
                  <Col w={100}>
                    <HorizontalInput
                      label="Time"
                      type="time"
                      value={time}
                      name="time"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
              </Fieldset>
            </Col>
          </Row>
          <Row m p>
            <Col w={100}>
              <Fieldset legend="Account">
                <AccountSelector
                  selectedAccount={selectedAccount || null}
                  onSelectAccount={this.onSelectAccount}
                />
              </Fieldset>
            </Col>
          </Row>
          <Row m p>
            <Col w={100}>
              <Fieldset legend="Citation IDs">
                <Row m p>
                  <Col>
                    <HorizontalInput
                      type="text"
                      label="Internal"
                      value={internal}
                      name="internal"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row m p>
                  <Col>
                    <HorizontalInput
                      type="text"
                      label="Other"
                      value={other}
                      name="other"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
              </Fieldset>
            </Col>
          </Row>
          <TabButtonContainer
            onSave={this.onSaveClick}
            onCancel={this.onCloseTab}
            onClear={this.onClearClick}
          />
        </Col>
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
        <Modal show={isModalVisible} onClose={this.handleCloseModal}>
          <TowStatus onClose={this.handleCloseModal} towStatus={towStatus} />
        </Modal>
      </Container>
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
)(ParkingViolation);
