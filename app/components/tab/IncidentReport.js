/* eslint-disable react/no-unused-state */
/* eslint-disable no-restricted-globals */
// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import findIndex from 'lodash.findindex';
import AccountSelector from './common/AccountSelector';
import ClassificationSelector from './common/ClassificationSelector';
import * as TabActions from '../../actions/tab';
import Individuals from './common/Individuals';
import Vehicles from './common/Vehicles';
import Alert from '../dialog/Alert';
import Confirm from '../dialog/Confirm';
import TimeInput from '../inputs/TimeInput';
import Attachments from './common/Attachments';
import TabButtonContainer from './common/TabButtonContainer';
import Cotainer from '../sections/Container';
import RoundedSection from '../sections/RoundedSection';
import Fieldset from '../sections/Fieldset';
import Col from '../sections/Col';
import Row from '../sections/Row';
import HorizontalInput from '../inputs/HorizontalInput';
import Input from '../inputs/Input';

const tabName = 'INCIDENT REPORT';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: Object) => void,
  saveRecord: (recordType: string, props: Object) => void,
  onCloseTab: () => void
};

type States = {
  id: number,
  selectedAccount: Object,
  individuals: Array<any>,
  attachments: Array<any>,
  selectedIndividualId: number,
  vehicles: Array<any>,
  selectedVehicleId: number,
  selectedClassification: Object,
  location: string,
  incidentDate: string,
  incidentTime: string,
  notes: string,
  chkArrestTookPlace: boolean,
  chkSuspectWasIdentified: boolean,
  chkVictimInjured: boolean,
  chkSuspectInjured: boolean,
  chkOfficerInjured: boolean,
  chkLEOnScene: boolean,
  chkFireDeptOnScene: boolean,
  chkEMTOnScene: boolean,
  chkSolvable: boolean,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  dlgType: number,
  message: string
};

class IncidentReport extends Component<Props, States> {
  props: Props;

  state = {
    id: 0,
    selectedAccount: {},
    individuals: [],
    selectedIndividualId: 0,
    vehicles: [],
    attachments: [],
    selectedVehicleId: 0,
    selectedClassification: {},
    location: '',
    incidentDate: '',
    incidentTime: '',
    notes: '',
    chkArrestTookPlace: false,
    chkSuspectWasIdentified: false,
    chkVictimInjured: false,
    chkSuspectInjured: false,
    chkOfficerInjured: false,
    chkLEOnScene: false,
    chkFireDeptOnScene: false,
    chkEMTOnScene: false,
    chkSolvable: false,
    isAlertVisible: false,
    isConfirmVisible: false,
    dlgType: 0,
    message: ''
  };

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  handleCloseModal = (individual: Object) => {
    if (individual) {
      if (individual.refId) {
        const { tabStore, setTabProperties } = this.props;
        const { props, tabId } = tabStore.selectedTabProps;
        const individuals = props.individuals.filter(
          item => item.refId === individual.refId
        );
        if (individuals.length === 0) {
          props.individuals.push(individual);
        } else {
          props.individuals.splice(
            findIndex(
              props.individuals,
              item => item.refId === individual.refId
            ),
            1,
            individual
          );
        }
        setTabProperties(tabName, tabId, props);
      }
    }
  };

  handleCloseVehicleModal = (vehicle: Object) => {
    if (vehicle) {
      if (vehicle.refId) {
        const { tabStore, setTabProperties } = this.props;
        const { props, tabId } = tabStore.selectedTabProps;
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
        setTabProperties(tabName, tabId, props);
      }
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

  onSelectAccount = account => {
    const { setTabProperties, tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.selectedAccount = account;
    setTabProperties(tabName, tabId, props);
  };

  onSelectClassification = classification => {
    const { setTabProperties, tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.selectedClassification = classification;
    setTabProperties(tabName, tabId, props);
  };

  onConfirmClick = () => {
    const { dlgType } = this.state;
    if (dlgType === 1) {
      const { onCloseTab } = this.props;
      onCloseTab();
    } else if (dlgType === 2) {
      const { tabStore, setTabProperties } = this.props;
      const { tabId } = tabStore.selectedTabProps;
      setTabProperties(tabName, tabId, {
        selectedAccount: {},
        individuals: [],
        selectedIndividualId: 0,
        vehicles: [],
        selectedVehicleId: 0,
        selectedClassification: {},
        location: '',
        incidentDate: '',
        incidentTime: '',
        notes: '',
        chkArrestTookPlace: false,
        chkSuspectWasIdentified: false,
        chkVictimInjured: false,
        chkSuspectInjured: false,
        chkOfficerInjured: false,
        chkLEOnScene: false,
        chkFireDeptOnScene: false,
        chkEMTOnScene: false,
        chkSolvable: false,
        isAlertVisible: false,
        isConfirmVisible: false,
        dlgType: 0,
        message: ''
      });
    }
    this.setState({
      isConfirmVisible: false
    });
  };

  onDeleteClick = () => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    const { selectedIndividualId, individuals } = props;
    const result = individuals.filter(
      individual => individual.refId !== selectedIndividualId
    );
    props.selectedIndividualId = 0;
    props.individuals = result;
    setTabProperties(tabName, tabId, props);
  };

  onDeleteVehicleClick = () => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedVehicleId } = props;
    if (selectedVehicleId) {
      const { setTabProperties } = this.props;
      const { tabId } = tabStore.selectedTabProps;
      const { vehicles } = props;
      const result = vehicles.filter(
        vehicle => vehicle.refId !== selectedVehicleId
      );
      props.selectedVehicleId = 0;
      props.vehicles = result;
      setTabProperties(tabName, tabId, props);
    }
  };

  onSaveClick = () => {
    const { tabStore, loginStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedAccount, individuals, selectedClassification } = props;
    if (!selectedAccount.value) {
      this.setState({
        isAlertVisible: true,
        message: 'An account must be selected'
      });
      return;
    }
    if (!selectedClassification.value) {
      this.setState({
        isAlertVisible: true,
        message: 'A Classification must be selected'
      });
      return;
    }
    if (individuals.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'A single individual must be added to this report'
      });
      return;
    }

    const {
      id,
      location,
      incidentDate,
      incidentTime,
      chkArrestTookPlace,
      chkSuspectWasIdentified,
      chkVictimInjured,
      chkSuspectInjured,
      chkOfficerInjured,
      chkLEOnScene,
      chkFireDeptOnScene,
      chkEMTOnScene,
      chkSolvable,
      notes,
      attachments,
      vehicles
    } = props;

    const { userId } = loginStore.auth;
    const jsonData = {
      classification: selectedClassification.value,
      location,
      incidentDate,
      incidentTime,
      chkArrestTookPlace: chkArrestTookPlace ? 1 : 0,
      chkSuspectWasIdentified: chkSuspectWasIdentified ? 1 : 0,
      chkVictimInjured: chkVictimInjured ? 1 : 0,
      chkSuspectInjured: chkSuspectInjured ? 1 : 0,
      chkOfficerInjured: chkOfficerInjured ? 1 : 0,
      chkLEOnScene: chkLEOnScene ? 1 : 0,
      chkFireDeptOnScene: chkFireDeptOnScene ? 1 : 0,
      chkEMTOnScene: chkEMTOnScene ? 1 : 0,
      chkSolvable: chkSolvable ? 1 : 0,
      notes,
      account: selectedAccount.value,
      id,
      attachments,
      userId,
      individuals,
      vehicles
    };

    const { onCloseTab, saveRecord } = this.props;
    saveRecord('incident', jsonData);
    onCloseTab();
  };

  onClearClick = () => {
    this.setState({
      isConfirmVisible: true,
      message:
        'Are you sure you want to completely clear this form?<br>All changes made will be lost.',
      dlgType: 2
    });
  };

  handleChangeSelectedIndividual = (refId: number) => {
    const { tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.selectedIndividualId = refId;
    const { setTabProperties } = this.props;
    setTabProperties(tabName, tabId, props);
  };

  handleChangeSelectedVehicle = (refId: number) => {
    const { tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.selectedVehicleId = refId;
    const { setTabProperties } = this.props;
    setTabProperties(tabName, tabId, props);
  };

  handleIncidentTimeChange = (value: string) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.incidentTime = value;
    setTabProperties(tabName, tabId, props);
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

  onAddIndividual = () => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;

    props.selectedIndividualId = 0;
    setTabProperties(tabName, tabId, props);
  };

  onAddVehicle = () => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;

    props.selectedVehicleId = 0;
    setTabProperties(tabName, tabId, props);
  };

  onCloseTab = () => {
    this.setState({
      isConfirmVisible: true,
      message: 'Are you sure?',
      dlgType: 1
    });
  };

  render() {
    const { isAlertVisible, isConfirmVisible, message } = this.state;

    const { loginStore, tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const {
      selectedAccount,
      selectedClassification,
      location,
      notes,
      incidentDate,
      incidentTime,
      chkArrestTookPlace,
      chkSuspectWasIdentified,
      chkVictimInjured,
      chkSuspectInjured,
      chkOfficerInjured,
      chkLEOnScene,
      chkFireDeptOnScene,
      chkEMTOnScene,
      chkSolvable,
      selectedVehicleId,
      selectedIndividualId,
      individuals,
      vehicles,
      attachments
    } = isEmpty(props) ? this.state : props;

    let callerTypesValues = [];
    if (loginStore.loader) {
      const { callertypes } = loginStore.loader;
      callerTypesValues = callertypes.map(callerType => {
        const item = callerType;
        item.value = callerType.id;
        item.label = callerType.name;
        return item;
      });
    }

    return (
      <Cotainer column>
        <Row>
          <Col w={60}>
            <RoundedSection>
              <Individuals
                individuals={individuals || []}
                callerTypesValues={callerTypesValues}
                selectedIndividualId={selectedIndividualId}
                handleChangeSelectedIndividual={
                  this.handleChangeSelectedIndividual
                }
                onAddIndividual={this.onAddIndividual}
                handleCloseModal={this.handleCloseModal}
                onDeleteClick={this.onDeleteClick}
              />
            </RoundedSection>
            <Row m p>
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
            </Row>
            <Row m p>
              <Col w={100}>
                <RoundedSection column>
                  <Row>
                    <Col>
                      <Row>
                        <Col>Classification:</Col>
                        <Col>
                          <ClassificationSelector
                            selectedClassification={selectedClassification}
                            onSelectClassification={this.onSelectClassification}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col m>
                      <HorizontalInput
                        type="text"
                        name="location"
                        label="Location:"
                        value={location}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row m p>
                    <Col>
                      <HorizontalInput
                        type="date"
                        name="incidentDate"
                        label="Incident Date:"
                        value={incidentDate}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col m>
                      <Row>
                        <Col>Incident Time:</Col>
                        <Col>
                          <TimeInput
                            defaultValue={incidentTime}
                            handleOnChange={this.handleIncidentTimeChange}
                            className=""
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </RoundedSection>
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
              <RoundedSection column>
                <Row>
                  <Col>
                    <HorizontalInput
                      type="checkbox"
                      value={chkArrestTookPlace}
                      name="chkArrestTookPlace"
                      label="An arrest took place"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col>
                    <HorizontalInput
                      type="checkbox"
                      value={chkLEOnScene}
                      name="chkLEOnScene"
                      label="L.E. On Scene"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <HorizontalInput
                      type="checkbox"
                      value={chkSuspectWasIdentified}
                      name="chkSuspectWasIdentified"
                      label="Suspect was identified"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col>
                    <HorizontalInput
                      type="checkbox"
                      value={chkFireDeptOnScene}
                      name="chkFireDeptOnScene"
                      label="Fire Dept. On Scene"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <HorizontalInput
                      type="checkbox"
                      value={chkVictimInjured}
                      name="chkVictimInjured"
                      label="Victim injured"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col>
                    <HorizontalInput
                      type="checkbox"
                      value={chkEMTOnScene}
                      name="chkEMTOnScene"
                      label="EMT On Scene"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <HorizontalInput
                      type="checkbox"
                      value={chkSuspectInjured}
                      name="chkSuspectInjured"
                      label="Suspect Injured"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col>
                    <HorizontalInput
                      type="checkbox"
                      value={chkSolvable}
                      name="chkSolvable"
                      label="Sovlable ?"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <HorizontalInput
                      type="checkbox"
                      value={chkOfficerInjured}
                      name="chkOfficerInjured"
                      label="Officer Injured"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col />
                </Row>
              </RoundedSection>
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
)(IncidentReport);
