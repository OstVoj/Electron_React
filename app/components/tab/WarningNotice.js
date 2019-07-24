/* eslint-disable react/no-unused-state */
// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import findIndex from 'lodash.findindex';
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
import Individuals from './common/Individuals';
import CodeViolations from './common/CodeViolations';

const tabName = 'WARNING NOTICE';

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
  individuals: Array<string>,
  codeOfViolations: Array<number>,
  notes: string,
  internal: string,
  other: string,
  isViolatorPropertyResident: boolean,
  validatorIsAGuestOf: string,
  finePayee: string,
  fineAmount: string,
  requestedThatViolatorNotReturnToProperty: boolean,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string,
  dlgType: number,
  selectedIndividualId: number
};

class WarningNotice extends Component<Props, States> {
  props: Props;

  state = {
    selectedAccount: {},
    attachments: [],
    individuals: [],
    codeOfViolations: [],
    internal: '',
    other: '',
    isViolatorPropertyResident: false,
    validatorIsAGuestOf: '',
    requestedThatViolatorNotReturnToProperty: false,
    finePayee: '',
    fineAmount: '',
    notes: '',
    isAlertVisible: false,
    isConfirmVisible: false,
    message: '',
    dlgType: 0,
    selectedIndividualId: 0
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
        individuals: [],
        codeOfViolations: [],
        internal: '',
        other: '',
        isViolatorPropertyResident: false,
        validatorIsAGuestOf: '',
        requestedThatViolatorNotReturnToProperty: false,
        finePayee: '',
        fineAmount: '',
        notes: '',
        selectedIndividualId: 0
      });
    }
    this.setState({
      isConfirmVisible: false
    });
  };

  handleChangeSelectedIndividual = (refId: number) => {
    this.onChange({
      selectedIndividualId: refId
    });
  };

  onAddIndividual = () => {
    this.onChange({
      selectedIndividualId: 0
    });
  };

  handleCloseModal = (individual: Object) => {
    if (individual) {
      if (individual.refId) {
        const { tabStore } = this.props;
        const { props } = tabStore.selectedTabProps;
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
        this.onChange({
          individuals: props.individuals
        });
      }
    }
  };

  onDeleteIndividualClick = () => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedIndividualId } = props;
    if (selectedIndividualId) {
      const { individuals } = props;
      const result = individuals.filter(
        individual => individual.refId !== selectedIndividualId
      );
      props.selectedIndividualId = 0;
      props.individuals = result;
      this.onChange({
        selectedIndividualId: 0,
        individuals: result
      });
    }
  };

  onAddCodeViolation = (codeViolation: Object) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { codeOfViolations } = props;
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

    props.account = selectedAccount.value;
    const { userId } = loginStore.auth;
    props.userId = userId;

    const { onCloseTab, saveRecord } = this.props;
    saveRecord('warning notice', props);
    onCloseTab();
  };

  render() {
    const { isAlertVisible, isConfirmVisible, message } = this.state;

    const { tabStore, loginStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const {
      selectedAccount,
      attachments,
      individuals,
      codeOfViolations,
      internal,
      other,
      isViolatorPropertyResident,
      validatorIsAGuestOf,
      requestedThatViolatorNotReturnToProperty,
      finePayee,
      fineAmount,
      notes,
      selectedIndividualId
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
            <Row m p>
              <Col w={100}>
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
                    onDeleteClick={this.onDeleteIndividualClick}
                  />
                </RoundedSection>
              </Col>
            </Row>
            <Row m p>
              <Col w={100}>
                <CodeViolations
                  codeViolations={codeOfViolations}
                  onAddCodeViolation={this.onAddCodeViolation}
                  onRemoveCodeViolations={this.onRemoveCodeViolations}
                />
              </Col>
            </Row>
            <Row>
              <Col w={100}>
                <Fieldset legend="Citation IDs">
                  <Row>
                    <Col w={45}>
                      <HorizontalInput
                        type="input"
                        value={internal}
                        name="internal"
                        label="Internal"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col w={10} />
                    <Col w={45}>
                      <HorizontalInput
                        type="input"
                        value={other}
                        name="other"
                        label="Other"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                </Fieldset>
              </Col>
            </Row>
            <Row m p>
              <Col w={100}>
                <Fieldset legend="Disposition">
                  <Row>
                    <Col w={35}>
                      <HorizontalInput
                        type="checkbox"
                        value={isViolatorPropertyResident}
                        name="isViolatorPropertyResident"
                        label="Violator is a property resident"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col w={10} />
                    <Col w={55}>
                      <HorizontalInput
                        type="input"
                        value={validatorIsAGuestOf}
                        name="validatorIsAGuestOf"
                        label="If not, validator is a guest of:"
                        onChange={this.handleInputChange}
                        size={30}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col w={100}>
                      <HorizontalInput
                        type="checkbox"
                        value={requestedThatViolatorNotReturnToProperty}
                        name="requestedThatViolatorNotReturnToProperty"
                        label="Requested that violator not return to property"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
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
            <Row m p>
              <Col w={100}>
                <Fieldset legend="Remittance">
                  <Row>
                    <Col>
                      <HorizontalInput
                        type="text"
                        value={finePayee}
                        name="finePayee"
                        label="Fine Payee"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row m p>
                    <Col>
                      <HorizontalInput
                        type="text"
                        value={fineAmount}
                        name="fineAmount"
                        label="Fine Amount"
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
)(WarningNotice);
