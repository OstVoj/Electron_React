/* eslint-disable react/no-unused-state */
// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash.get';
import findIndex from 'lodash.findindex';
import isEmpty from 'lodash.isempty';
import AccountSelector from './common/AccountSelector';
import * as TabActions from '../../actions/tab';
import Individuals from './common/Individuals';
import Attachments from './common/Attachments';
import Alert from '../dialog/Alert';
import Confirm from '../dialog/Confirm';
import TabButtonContainer from './common/TabButtonContainer';
import Cotainer from '../sections/Container';
import RoundedSection from '../sections/RoundedSection';
import Fieldset from '../sections/Fieldset';
import Col from '../sections/Col';
import Row from '../sections/Row';
import HorizontalInput from '../inputs/HorizontalInput';
import Input from '../inputs/Input';

const tabName = 'ARREST REPORT';

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
  selectedIndividualId: number,
  warrant: string,
  court: string,
  agency: string,
  casenumber: string,
  gang: string,
  alias: string,
  chkFelony: boolean,
  chkMisdemeanor: boolean,
  chkCivil: boolean,
  chkOther: boolean,
  chkSecurity: boolean,
  chkCitizen: boolean,
  chkProperty: boolean,
  chkLaw: boolean,
  notes: string,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  dlgType: number,
  message: string,
  attachments: Array<string>,
  selectedAttachment: string
};

class ArrestReport extends Component<Props, States> {
  props: Props;

  state = {
    id: 0,
    selectedAccount: {},
    individuals: [],
    selectedIndividualId: 0,
    warrant: '',
    court: '',
    agency: '',
    casenumber: '',
    gang: '',
    alias: '',
    chkFelony: false,
    chkMisdemeanor: false,
    chkCivil: false,
    chkOther: false,
    chkSecurity: false,
    chkCitizen: false,
    chkProperty: false,
    chkLaw: false,
    notes: '',
    isAlertVisible: false,
    isConfirmVisible: false,
    dlgType: 0,
    message: '',
    attachments: [],
    selectedAttachment: ''
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

  onSelectAccount = account => {
    const { setTabProperties, tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.selectedAccount = account;
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
        warrant: '',
        court: '',
        agency: '',
        casenumber: '',
        gang: '',
        alias: '',
        chkFelony: false,
        chkMisdemeanor: false,
        chkCivil: false,
        chkOther: false,
        chkSecurity: false,
        chkCitizen: false,
        chkProperty: false,
        chkLaw: false,
        notes: '',
        attachments: []
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

  onSaveClick = () => {
    const { tabStore, loginStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedAccount, individuals } = props;
    if (!selectedAccount.value) {
      this.setState({
        isAlertVisible: true,
        message: 'An account must be selected'
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
      warrant,
      court,
      agency,
      casenumber,
      gang,
      alias,
      chkFelony,
      chkMisdemeanor,
      chkCivil,
      chkOther,
      chkSecurity,
      chkCitizen,
      chkProperty,
      chkLaw,
      notes,
      attachments
    } = props;

    const { userId } = loginStore.auth;
    const jsonData = {
      warrant,
      court,
      agency,
      casenumber,
      gang,
      alias,
      chkFelony: chkFelony ? 1 : 0,
      chkMisdemeanor: chkMisdemeanor ? 1 : 0,
      chkCivil: chkCivil ? 1 : 0,
      chkOther: chkOther ? 1 : 0,
      chkSecurity: chkSecurity ? 1 : 0,
      chkCitizen: chkCitizen ? 1 : 0,
      chkProperty: chkProperty ? 1 : 0,
      chkLaw: chkLaw ? 1 : 0,
      notes,
      account: selectedAccount.value,
      id,
      attachments,
      userId,
      individuals
    };

    const { onCloseTab, saveRecord } = this.props;
    saveRecord('arrest', jsonData);
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

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props[name] = value;
    setTabProperties(tabName, tabId, props);
  };

  onAddAttachment = (copyPath: string) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.attachments.push(copyPath);
    setTabProperties(tabName, tabId, props);
  };

  onAddIndividual = () => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;

    props.selectedIndividualId = 0;
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
      warrant,
      court,
      agency,
      casenumber,
      gang,
      alias,
      chkFelony,
      chkMisdemeanor,
      chkCivil,
      chkOther,
      chkSecurity,
      chkCitizen,
      chkProperty,
      chkLaw,
      notes,
      individuals,
      selectedIndividualId,
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
              <Col w={30}>
                <Fieldset legend="Altercation">
                  <HorizontalInput
                    type="checkbox"
                    name="chkFelony"
                    label="Felony"
                    value={chkFelony}
                    onChange={this.handleInputChange}
                  />
                  <HorizontalInput
                    type="checkbox"
                    name="chkMisdemeanor"
                    label="Misdemeanor"
                    value={chkMisdemeanor}
                    onChange={this.handleInputChange}
                  />
                  <HorizontalInput
                    type="checkbox"
                    name="chkCivil"
                    label="Civil"
                    value={chkCivil}
                    onChange={this.handleInputChange}
                  />
                  <HorizontalInput
                    type="checkbox"
                    name="chkOther"
                    label="Other"
                    value={chkOther}
                    onChange={this.handleInputChange}
                  />
                </Fieldset>
              </Col>
              <Col w={30}>
                <Fieldset legend="Executor">
                  <HorizontalInput
                    type="checkbox"
                    name="chkSecurity"
                    label="Security Company"
                    value={chkSecurity}
                    onChange={this.handleInputChange}
                  />
                  <HorizontalInput
                    type="checkbox"
                    name="chkCitizen"
                    label="Citizen's Arrest"
                    value={chkCitizen}
                    onChange={this.handleInputChange}
                  />
                  <HorizontalInput
                    type="checkbox"
                    name="chkProperty"
                    label="Property Manager"
                    value={chkProperty}
                    onChange={this.handleInputChange}
                  />
                  <HorizontalInput
                    type="checkbox"
                    name="chkLaw"
                    label="Law Enforcement"
                    value={chkLaw}
                    onChange={this.handleInputChange}
                  />
                </Fieldset>
              </Col>
              <Col w={40}>
                <Fieldset legend="Options">
                  <HorizontalInput
                    type="text"
                    name="warrant"
                    label="Warrant #:"
                    value={warrant}
                    onChange={this.handleInputChange}
                  />
                  <br />
                  <HorizontalInput
                    type="text"
                    name="court"
                    label="Court:"
                    value={court}
                    onChange={this.handleInputChange}
                  />
                  <br />
                  <HorizontalInput
                    type="text"
                    name="agency"
                    label="Rec Agency:"
                    value={agency}
                    onChange={this.handleInputChange}
                  />
                  <br />
                  <HorizontalInput
                    type="text"
                    name="casenumber"
                    label="Case #:"
                    value={casenumber}
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
              <Col>
                <Fieldset legend="Criminal Organization Information">
                  <HorizontalInput
                    name="gang"
                    value={gang}
                    label="Gang Affiliation:"
                    onChange={this.handleInputChange}
                  />
                  <br />
                  <HorizontalInput
                    name="alias"
                    value={alias}
                    label="Alias:"
                    onChange={this.handleInputChange}
                  />
                </Fieldset>
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
)(ArrestReport);
