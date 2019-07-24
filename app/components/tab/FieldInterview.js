/* eslint-disable react/no-unused-state */
// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import findIndex from 'lodash.findindex';
import * as TabActions from '../../actions/tab';
import Attachments from './common/Attachments';
import Cotainer from '../sections/Container';
import Fieldset from '../sections/Fieldset';
import RoundedSection from '../sections/RoundedSection';
import Col from '../sections/Col';
import Row from '../sections/Row';
import InputList from '../inputs/InputList';
import AccountSelector from './common/AccountSelector';
import TabButtonContainer from './common/TabButtonContainer';
import Individuals from './common/Individuals';
import Alert from '../dialog/Alert';
import Confirm from '../dialog/Confirm';

const tabName = 'FI-FIELD INTERVIEW';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: Object) => void,
  saveRecord: (recordType: string, props: Object) => void,
  onCloseTab: () => void
};

type States = {
  description: Object,
  misc: Object,
  employment: Object,
  notes: string,
  attachments: Array<string>,
  criminalOrganizationInformation: Object,
  account: any,
  individualInformation: Object,
  individuals: Array<any>,
  selectedAccount: Object,
  selectedIndividualId: number,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string,
  dlgType: number
};

class FieldInterview extends Component<Props, States> {
  props: Props;

  state = {
    selectedAccount: {},
    description: {
      height: '',
      weight: '',
      hair: '',
      eyes: '',
      race: '',
      age: ''
    },
    misc: {
      tattoos: '',
      scars: '',
      piercings: '',
      clothing: '',
      probationOfficer: '',
      reasonForFI: ''
    },
    employment: {
      occupation: ''
    },
    notes: '',
    attachments: [],
    criminalOrganizationInformation: {
      gangAffiliation: '',
      alias: ''
    },
    account: '',
    individualInformation: {},
    individuals: [],
    selectedIndividualId: 0,
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

  onSelectAccount = account => {
    const { setTabProperties, tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.selectedAccount = account;
    setTabProperties(tabName, tabId, props);
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
    const attchments = props.attachments.filter(
      attachment => attachment !== selectedAttachment
    );
    this.onChange({ attachments: attchments });
  };

  handleChangeSelectedIndividual = (refId: number) => {
    const { tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.selectedIndividualId = refId;
    const { setTabProperties } = this.props;
    setTabProperties(tabName, tabId, props);
  };

  onAddIndividual = () => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;

    props.selectedIndividualId = 0;
    setTabProperties(tabName, tabId, props);
  };

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

  onDeleteClick = () => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedIndividualId } = props;
    if (selectedIndividualId) {
      const { setTabProperties } = this.props;
      const { tabId } = tabStore.selectedTabProps;
      const { individuals } = props;
      const result = individuals.filter(
        individual => individual.refId !== selectedIndividualId
      );
      props.selectedIndividualId = 0;
      props.individuals = result;
      setTabProperties(tabName, tabId, props);
    }
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
        description: {
          height: '',
          weight: '',
          hair: '',
          eyes: '',
          race: '',
          age: ''
        },
        misc: {
          tattoos: '',
          scars: '',
          piercings: '',
          clothing: '',
          probationOfficer: '',
          reasonForFI: ''
        },
        employment: {
          occupation: ''
        },
        notes: '',
        attachments: [],
        criminalOrganizationInformation: {
          gangAffiliation: '',
          alias: ''
        },
        account: '',
        individualInformation: [],
        individuals: []
      });
    }
    this.setState({
      isConfirmVisible: false
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

    const { userId } = loginStore.auth;
    props.account = selectedAccount.value;
    props.userId = userId;

    const { onCloseTab, saveRecord } = this.props;
    saveRecord('field interview', props);
    onCloseTab();
  };

  render() {
    const { isAlertVisible, isConfirmVisible, message } = this.state;

    const { loginStore, tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const {
      description,
      misc,
      employment,
      notes,
      attachments,
      criminalOrganizationInformation,
      individuals,
      selectedAccount,
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

    const inputListOptions = {
      notes: {
        notes: {
          size: 100,
          type: 'textarea'
        }
      },
      account: {
        account: {
          type: 'select',
          options: []
        }
      },
      misc: {
        reasonForFI: {
          label: 'Reason For FI'
        }
      }
    };

    return (
      <Cotainer>
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
            <Col w={40}>
              <Fieldset legend="Description">
                <InputList
                  value={description}
                  name="description"
                  onChange={this.onChange}
                />
              </Fieldset>
            </Col>
            <Col w={60} m>
              <Fieldset legend="Misc">
                <InputList
                  value={misc}
                  name="misc"
                  onChange={this.onChange}
                  options={inputListOptions.misc}
                />
              </Fieldset>
            </Col>
          </Row>
          <Row m>
            <Col w={100}>
              <Fieldset legend="Employment">
                <InputList
                  value={employment}
                  name="employment"
                  onChange={this.onChange}
                />
              </Fieldset>
            </Col>
          </Row>
          <Fieldset legend="Notes">
            <InputList
              value={{ notes }}
              onChange={this.onChange}
              options={inputListOptions.notes}
            />
          </Fieldset>
        </Col>
        <Col w={40} m>
          <Attachments
            attachments={attachments}
            onAddAttachment={this.onAddAttachment}
            onRemoveAttachment={this.onRemoveAttachment}
          />
          <Row m p>
            <Col w={100}>
              <Fieldset legend="Criminal Organization Information">
                <InputList
                  value={criminalOrganizationInformation}
                  name="criminalOrganizationInformation"
                  onChange={this.onChange}
                />
              </Fieldset>
            </Col>
          </Row>
          <Fieldset legend="Account">
            <AccountSelector
              selectedAccount={selectedAccount}
              onSelectAccount={this.onSelectAccount}
            />
          </Fieldset>
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
)(FieldInterview);
