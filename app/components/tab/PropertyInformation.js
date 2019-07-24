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
import * as TabActions from '../../actions/tab';
import Individuals from './common/Individuals';
import Alert from '../dialog/Alert';
import Confirm from '../dialog/Confirm';
import Attachments from './common/Attachments';
import TabButtonContainer from './common/TabButtonContainer';
import Cotainer from '../sections/Container';
import RoundedSection from '../sections/RoundedSection';
import Fieldset from '../sections/Fieldset';
import Col from '../sections/Col';
import Row from '../sections/Row';
import HorizontalInput from '../inputs/HorizontalInput';
import Input from '../inputs/Input';

const tabName = 'PROPERTY INFORMATION';

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
  notes: string,
  locationOfIncident: string,
  stolen: boolean,
  recovered: boolean,
  lost: boolean,
  found: boolean,
  evidence: boolean,
  dateStolen: string,
  articleType: string,
  dateRecovered: string,
  articleColor: string,
  dateLost: string,
  estValue: string,
  dateFound: string,
  serial: string,
  agency: string,
  storedAt: string,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  dlgType: number,
  message: string
};

class PropertyInformationReport extends Component<Props, States> {
  props: Props;

  state = {
    id: 0,
    selectedAccount: {},
    individuals: [],
    selectedIndividualId: 0,
    attachments: [],
    notes: '',
    locationOfIncident: '',
    stolen: false,
    recovered: false,
    lost: false,
    found: false,
    evidence: false,
    dateStolen: '',
    articleType: '',
    dateRecovered: '',
    articleColor: '',
    dateLost: '',
    estValue: '',
    dateFound: '',
    serial: '',
    agency: '',
    storedAt: '',
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
        notes: '',
        stolen: false,
        recovered: false,
        lost: false,
        found: false,
        evidence: false,
        dateStolen: '',
        articleType: '',
        dateRecovered: '',
        articleColor: '',
        dateLost: '',
        estValue: '',
        dateFound: '',
        serial: '',
        agency: '',
        storedAt: '',
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
      notes,
      attachments,
      locationOfIncident,
      stolen,
      recovered,
      lost,
      found,
      evidence,
      dateStolen,
      articleType,
      dateRecovered,
      articleColor,
      dateLost,
      estValue,
      dateFound,
      serial,
      agency,
      storedAt
    } = props;

    const { userId } = loginStore.auth;
    const jsonData = {
      location,
      notes,
      account: selectedAccount.value,
      id,
      attachments,
      userId,
      individuals,
      locationOfIncident,
      stolen: stolen ? 1 : 0,
      recovered: recovered ? 1 : 0,
      lost: lost ? 1 : 0,
      found: found ? 1 : 0,
      evidence: evidence ? 1 : 0,
      dateStolen,
      articleType,
      dateRecovered,
      articleColor,
      dateLost,
      estValue,
      dateFound,
      serial,
      agency,
      storedAt
    };

    const { onCloseTab, saveRecord } = this.props;
    saveRecord('property information', jsonData);
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

  onAddIndividual = () => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;

    props.selectedIndividualId = 0;
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
      notes,
      selectedIndividualId,
      individuals,
      attachments,
      locationOfIncident,
      stolen,
      recovered,
      lost,
      found,
      evidence,
      dateStolen,
      articleType,
      dateRecovered,
      articleColor,
      dateLost,
      estValue,
      dateFound,
      serial,
      agency,
      storedAt
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
              <Col w={100}>
                <Fieldset legend="General Information">
                  <Row m p>
                    <Col m p>
                      <HorizontalInput
                        name="stolen"
                        label="Stolen"
                        type="checkbox"
                        value={stolen}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        name="recovered"
                        label="Recovered"
                        type="checkbox"
                        value={recovered}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        name="lost"
                        label="Lost"
                        type="checkbox"
                        value={lost}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        name="found"
                        label="Found"
                        type="checkbox"
                        value={found}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        name="evidence"
                        label="Evidence"
                        type="checkbox"
                        value={evidence}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row m p>
                    <Col m p>
                      <HorizontalInput
                        name="dateStolen"
                        label="Date Stolen"
                        type="date"
                        value={dateStolen}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        name="articleType"
                        label="Article Type"
                        type="text"
                        value={articleType}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row m p>
                    <Col m p>
                      <HorizontalInput
                        name="dateRecovered"
                        label="Date Recovered"
                        type="date"
                        value={dateRecovered}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        name="articleColor"
                        label="Article Color"
                        type="text"
                        value={articleColor}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row m p>
                    <Col m p>
                      <HorizontalInput
                        name="dateLost"
                        label="Date Lost"
                        type="date"
                        value={dateLost}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        name="estValue"
                        label="Est. Value"
                        type="text"
                        value={estValue}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row m p>
                    <Col m p>
                      <HorizontalInput
                        name="dateFound"
                        label="Date Found"
                        type="date"
                        value={dateFound}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        name="serial"
                        label="Serial"
                        type="text"
                        value={serial}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row m p>
                    <Col m p>
                      <HorizontalInput
                        name="agency"
                        label="Agency"
                        type="text"
                        value={agency}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        name="storedAt"
                        label="Stored At"
                        type="text"
                        value={storedAt}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                </Fieldset>
              </Col>
            </Row>
            <Row m p>
              <Col w={100}>
                <Fieldset legend="Location of Incident">
                  <Input
                    type="text"
                    name="locationOfIncident"
                    value={locationOfIncident}
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
)(PropertyInformationReport);
