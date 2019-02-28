/* eslint-disable no-alert */
// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import * as EmailValidator from 'email-validator';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './Individual.css';
import utility from '../../utils/utility';

const _ = require('lodash');

const genders = [
  {
    value: 'M',
    label: 'Male'
  },
  {
    value: 'F',
    label: 'Female'
  }
];

type Props = {
  onClose: (Individual: Object) => void,
  callerTypesValues: [],
  individual: Object
};

type States = {
  refId: number,
  lname: string,
  mname: string,
  fname: string,
  phoneHome: string,
  phoneMobile: string,
  phoneWork: string,
  dob: Date,
  dlNumber: number,
  dlState: string,
  company: string,
  email: string,
  personType: string,
  address: string,
  address2: string,
  city: string,
  state: string,
  zip: string,
  selectedGender: {
    value: '',
    label: ''
  },
  selectedType: {
    value: '',
    label: ''
  }
};

export default class Individual extends Component<Props, States> {
  props: Props;

  state = {
    lname: '',
    mname: '',
    fname: '',
    phoneHome: '',
    phoneWork: '',
    phoneMobile: '',
    dob: null,
    dlNumber: 0,
    dlState: '',
    company: '',
    email: '',
    personType: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    selectedGender: {
      value: '',
      label: ''
    },
    selectedType: {
      value: '',
      label: ''
    }
  };

  componentDidMount() {
    const { callerTypesValues, individual } = this.props;
    this.setState({
      ...individual
    });

    const gender = genders.filter(
      (item: Object) => item.value === individual.gender
    );
    if (gender.length > 0) {
      this.setState({
        selectedGender: gender[0]
      });
    }

    const personTypes = callerTypesValues.filter(
      (item: Object) => item.value === individual.personType
    );
    if (personTypes.length > 0) {
      this.setState({
        selectedType: personTypes[0]
      });
    }
  }

  onChangeDob = (date: Date) => {
    this.setState({
      dob: date
    });
  };

  handleInputChange = (event: Object) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onSelectGender = (gender: Object) => {
    this.setState({
      selectedGender: gender
    });
  };

  onSelectCallerType = (callerType: Object) => {
    this.setState({
      selectedType: callerType
    });
  };

  onSave = () => {
    const { onClose, individual } = this.props;
    const refId = _.isEmpty(individual)
      ? utility.getRandomInt()
      : individual.refId;
    const {
      lname,
      mname,
      fname,
      dob,
      selectedGender,
      dlState,
      dlNumber,
      company,
      email,
      address,
      address2,
      city,
      state,
      zip,
      phoneHome,
      phoneMobile,
      phoneWork,
      selectedType
    } = this.state;

    if (fname.length === 0) {
      alert('First Name must be populated!');
      return;
    }
    if (email.length > 0) {
      if (!EmailValidator.validate(email)) {
        alert('Email address is invalid!');
        return;
      }
    }
    if (zip.length > 0) {
      if (!utility.validateZipCode(zip)) {
        alert('Zip code is invalid!');
        return;
      }
    }
    const jsonData = {
      refId,
      lname,
      mname,
      fname,
      gender: selectedGender.value,
      dob,
      dlState,
      dlNumber,
      company,
      email,
      address,
      address2,
      city,
      state,
      zip,
      phoneHome,
      phoneMobile,
      phoneWork,
      personType: selectedType.value
    };
    onClose(jsonData);
  };

  render() {
    const { onClose, callerTypesValues } = this.props;
    const {
      lname,
      mname,
      fname,
      dob,
      selectedGender,
      dlState,
      dlNumber,
      company,
      email,
      address,
      address2,
      city,
      state,
      zip,
      phoneHome,
      phoneMobile,
      phoneWork,
      selectedType
    } = this.state;

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.left}>
          <fieldset>
            <legend>Name</legend>
            <div className={styles.optionsDiv}>
              <label>First Name:</label>
              <input
                type="text"
                className="greenText"
                value={fname}
                name="fname"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Middle Name:</label>
              <input
                type="text"
                className="greenText"
                value={mname}
                name="mname"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Last Name:</label>
              <input
                type="text"
                className="greenText"
                value={lname}
                name="lname"
                onChange={this.handleInputChange}
              />
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend>Additional Info</legend>
            <div className={styles.optionsDiv}>
              <label>DOB:</label>
              <DatePicker
                selected={dob}
                onChange={this.onChangeDob}
                className="greenText"
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Gender:</label>
              <Select
                className={styles.select}
                options={genders}
                value={selectedGender}
                onChange={this.onSelectGender}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>DL#:</label>
              <input
                type="text"
                className="greenText"
                value={dlNumber}
                name="dlNumber"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>DL State:</label>
              <input
                type="text"
                className="greenText"
                value={dlState}
                name="dlState"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Company:</label>
              <input
                type="text"
                className="greenText"
                value={company}
                name="company"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Email:</label>
              <input
                type="text"
                className="greenText"
                value={email}
                name="email"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Type:</label>
              <Select
                className={styles.select}
                options={callerTypesValues}
                onChange={this.onSelectCallerType}
                value={selectedType}
              />
            </div>
            <br />
          </fieldset>
        </div>
        <div className={styles.right}>
          <fieldset>
            <legend>Phone</legend>
            <div className={styles.optionsDiv}>
              <label>Home:</label>
              <input
                type="text"
                className="greenText"
                value={phoneHome}
                name="phoneHome"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Mobile:</label>
              <input
                type="text"
                className="greenText"
                value={phoneMobile}
                name="phoneMobile"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Work:</label>
              <input
                type="text"
                className="greenText"
                value={phoneWork}
                name="phoneWork"
                onChange={this.handleInputChange}
              />
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend>Address</legend>
            <div className={styles.optionsDiv}>
              <label>Address:</label>
              <input
                type="text"
                className="greenText"
                value={address}
                name="address"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Address 2:</label>
              <input
                type="text"
                className="greenText"
                value={address2}
                name="address2"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>City:</label>
              <input
                type="text"
                className="greenText"
                value={city}
                name="city"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>State:</label>
              <input
                type="text"
                className="greenText"
                value={state}
                name="state"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className={styles.optionsDiv}>
              <label>Zip:</label>
              <input
                type="text"
                className="greenText"
                value={zip}
                name="zip"
                onChange={this.handleInputChange}
              />
            </div>
          </fieldset>
          <br />
          <br />
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className="tab-container-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="tab-container-button"
              onClick={this.onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
