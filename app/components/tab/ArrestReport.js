/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as TabActions from '../../actions/tab';
import styles from './ArrestReport.css';
import Modal from '../Modal';
import Individual from './Individual';
import model from '../../service/model';

const _ = require('lodash');
const { remote } = require('electron');

const { app } = remote;
const dbPath = `${app.getPath('home')}/${process.env.DB_PATH}/${
  process.env.DB_NAME
}`;

const tabName = 'ARREST REPORT';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: () => void,
  onCloseTab: () => void
};

type States = {
  selectedAccount: Object,
  isModalVisible: boolean,
  individuals: Object,
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
  notes: string
};

class ArrestReport extends Component<Props, States> {
  props: Props;

  state = {
    selectedAccount: {},
    isModalVisible: false,
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
    notes: ''
  };

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  handleCloseModal = (individual: Object) => {
    this.setState({
      isModalVisible: false
    });
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
          _.findIndex(
            props.individuals,
            item => item.refId === individual.refId
          ),
          1,
          individual
        );
      }
      setTabProperties(tabName, tabId, props);
    }
  };

  onSelectAccount = account => {
    const { setTabProperties, tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.selectedAccount = account;
    setTabProperties(tabName, tabId, props);
  };

  onDeleteClick = () => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    const { selectedIndividualId, individuals } = props;
    if (selectedIndividualId) {
      if (confirm('Are you sure?')) {
        const result = individuals.filter(
          individual => individual.refId !== selectedIndividualId
        );
        props.selectedIndividualId = 0;
        props.individuals = result;
        setTabProperties(tabName, tabId, props);
      }
    }
  };

  onSaveClick = () => {
    const { tabStore, loginStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedAccount, individuals } = props;
    if (!selectedAccount.value) {
      alert('An account must be selected');
      return;
    }
    if (individuals.length === 0) {
      alert('A single individual must be added to this report');
      return;
    }

    const {
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
      notes
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
      account: selectedAccount.value
    };
    model.addRecord(
      dbPath,
      userId,
      selectedAccount.value,
      JSON.stringify(jsonData)
    );
    individuals.forEach(individual => {
      const data = JSON.stringify({
        ...individual
      });
      model.addIndividual(dbPath, data);
    });
    const { onCloseTab } = this.props;
    onCloseTab();
  };

  onClearClick = () => {
    if (
      confirm(
        'Are you sure you want to completely clear this form? All changes made will be lost.'
      )
    ) {
      const { tabStore, setTabProperties } = this.props;
      const { tabId } = tabStore.selectedTabProps;
      setTabProperties(tabName, tabId, {
        selectedAccount: {},
        isModalVisible: false,
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
        notes: ''
      });
    }
  };

  showModal = (isAdd: boolean) => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    const { selectedIndividualId } = props;

    if (isAdd) {
      props.selectedIndividualId = 0;
      setTabProperties(tabName, tabId, props);
    } else if (!selectedIndividualId) {
      return;
    }
    this.setState({
      isModalVisible: true
    });
  };

  getIndividualRows = (individuals: Array) => {
    const { tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const { selectedIndividualId } = props;
    const result = individuals.map((individual: Object) => (
      <tr
        key={individual.refId}
        className={
          selectedIndividualId === individual.refId ? styles.activeRow : ''
        }
        onClick={() => this.handleChangeSelectedIndividual(individual.refId)}
      >
        <td>{individual.fname}</td>
        <td>{individual.lname}</td>
        <td>{individual.address}</td>
        <td>{individual.city}</td>
      </tr>
    ));
    return result;
  };

  handleChangeSelectedIndividual = (refId: number) => {
    const { tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props.selectedIndividualId = refId;
    const { setTabProperties } = this.props;
    setTabProperties(tabName, tabId, props);
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    props[name] = value;
    setTabProperties(tabName, tabId, props);
  };

  onCloseTab = () => {
    if (confirm('Are you sure?')) {
      const { onCloseTab } = this.props;
      onCloseTab();
    }
  };

  render() {
    const { isModalVisible } = this.state;

    const { loginStore, tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
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
      selectedIndividualId
    } = _.isEmpty(props) ? this.state : props;

    const items = individuals.filter(
      item => item.refId === selectedIndividualId
    );
    const selectedIndividual = items.length > 0 ? items[0] : {};

    let selectValues = [];
    let callerTypesValues = [];
    if (loginStore.loader) {
      const { accounts, callertypes } = loginStore.loader;
      selectValues = accounts.map(account => {
        const ret = account;
        ret.value = account.accountId;
        ret.label = account.name;
        return ret;
      });
      selectValues.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      callerTypesValues = callertypes.map(callerType => {
        const item = callerType;
        item.value = callerType.id;
        item.label = callerType.name;
        return item;
      });
    }

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.left}>
          <div className="rounded-description-container">
            <fieldset>
              <legend>Individual Information</legend>
              {!_.isEmpty(individuals) && (
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Address</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>{this.getIndividualRows(individuals)}</tbody>
                </table>
              )}
            </fieldset>
            <div className={styles.buttonContainer}>
              <button
                type="button"
                className="tab-container-button"
                onClick={() => this.showModal(true)}
              >
                Add
              </button>
              {!_.isEmpty(individuals) && (
                <button
                  type="button"
                  className="tab-container-button"
                  onClick={() => this.showModal(false)}
                  disabled={!selectedIndividualId}
                >
                  Edit
                </button>
              )}
              {!_.isEmpty(individuals) && (
                <button
                  type="button"
                  className="tab-container-button"
                  onClick={this.onDeleteClick}
                  disabled={!selectedIndividualId}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <div className={styles.fieldsetContainer}>
            <fieldset>
              <legend>Altercation</legend>
              <input
                type="checkbox"
                name="chkFelony"
                checked={chkFelony}
                onChange={this.handleInputChange}
              />
              Felony
              <br />
              <br />
              <input
                type="checkbox"
                checked={chkMisdemeanor}
                name="chkMisdemeanor"
                onChange={this.handleInputChange}
              />
              Misdemeanor
              <br />
              <br />
              <input
                type="checkbox"
                checked={chkCivil}
                name="chkCivil"
                onChange={this.handleInputChange}
              />
              Civil
              <br />
              <br />
              <input
                type="checkbox"
                checked={chkOther}
                name="chkOther"
                onChange={this.handleInputChange}
              />
              Other
            </fieldset>
            <fieldset>
              <legend>Executor</legend>
              <input
                type="checkbox"
                checked={chkSecurity}
                name="chkSecurity"
                onChange={this.handleInputChange}
              />
              Security Company
              <br />
              <br />
              <input
                type="checkbox"
                checked={chkCitizen}
                name="chkCitizen"
                onChange={this.handleInputChange}
              />
              Citizen's Arrest
              <br />
              <br />
              <input
                type="checkbox"
                checked={chkProperty}
                name="chkProperty"
                onChange={this.handleInputChange}
              />
              Property Manager
              <br />
              <br />
              <input
                type="checkbox"
                checked={chkLaw}
                name="chkLaw"
                onChange={this.handleInputChange}
              />
              Law Enforcement
            </fieldset>
            <fieldset>
              <legend>Options</legend>
              <div className={styles.optionsDiv}>
                <label>Warrant #:</label>
                <input
                  type="text"
                  className="greenText"
                  value={warrant}
                  name="warrant"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div className={styles.optionsDiv}>
                <label>Court:</label>
                <input
                  type="text"
                  className="greenText"
                  value={court}
                  name="court"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div className={styles.optionsDiv}>
                <label>Rec Agency:</label>
                <input
                  type="text"
                  className="greenText"
                  value={agency}
                  name="agency"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div className={styles.optionsDiv}>
                <label>Case #:</label>
                <input
                  type="text"
                  className="greenText"
                  value={casenumber}
                  name="casenumber"
                  onChange={this.handleInputChange}
                />
              </div>
            </fieldset>
          </div>
          <fieldset className={styles.notesContainer}>
            <legend>Notes</legend>
            <textarea
              className={styles.notesTextArea}
              value={notes}
              name="notes"
              onChange={this.handleInputChange}
              rows="5"
            />
          </fieldset>
        </div>
        <div className={styles.right}>
          <fieldset>
            <legend>Criminal Organization Information</legend>
            <div className={styles.optionsDiv}>
              <label>Gang Affiliation:</label>
              <input
                type="text"
                className="greenText"
                value={gang}
                name="gang"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Alias:</label>
              <input
                type="text"
                className="greenText"
                value={alias}
                name="alias"
                onChange={this.handleInputChange}
              />
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend>Account</legend>
            <Select
              options={selectValues}
              value={selectedAccount}
              onChange={this.onSelectAccount}
            />
          </fieldset>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className="tab-container-button"
              onClick={this.onCloseTab}
            >
              Cancel
            </button>
            <button
              type="button"
              className="tab-container-button"
              onClick={this.onClearClick}
            >
              Clear
            </button>
            <button
              type="button"
              className="tab-container-button"
              onClick={this.onSaveClick}
            >
              Save
            </button>
          </div>
        </div>
        <Modal show={isModalVisible} onClose={this.handleCloseModal}>
          <Individual
            onClose={(individual: Object) => this.handleCloseModal(individual)}
            callerTypesValues={callerTypesValues}
            individual={selectedIndividual}
          />
        </Modal>
      </div>
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
