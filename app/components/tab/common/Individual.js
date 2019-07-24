// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import isEmpty from 'lodash.isempty';
import * as EmailValidator from 'email-validator';
import keydown, { Keys } from 'react-keydown';
import Alert from '../../dialog/Alert';
import Confirm from '../../dialog/Confirm';
import styles from './Individual.css';
import utility from '../../../utils/utility';
import GenderSelector from './GenderSelector';
import CallerTypeSelector from './CallerTypeSelector';
import Container from '../../sections/Container';
import Col from '../../sections/Col';
import Row from '../../sections/Row';
import Fieldset from '../../sections/Fieldset';
import HorizontalInput from '../../inputs/HorizontalInput';

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
  callerTypesValues: Array<any>,
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
  dob: string,
  dlNumber: string,
  dlState: string,
  company: string,
  email: string,
  personType: string,
  address: string,
  address2: string,
  city: string,
  state: string,
  zip: string,
  selectedGender: Object,
  selectedType: Object,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string
};

@keydown
export default class Individual extends Component<Props, States> {
  props: Props;

  state = {
    refId: 0,
    lname: '',
    mname: '',
    fname: '',
    phoneHome: '',
    phoneWork: '',
    phoneMobile: '',
    dob: '',
    dlNumber: '',
    dlState: '',
    company: '',
    email: '',
    personType: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    selectedGender: {},
    selectedType: {},
    isAlertVisible: false,
    isConfirmVisible: false,
    message: ''
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

  componentDidUpdate(props: Object) {
    const { keydown } = props;
    if (keydown.event) {
      const { event } = keydown;
      const { keyCode } = event;
      if (keyCode === 27) {
        this.onClose();
      }
    }
  }

  onChangeDob = (date: string) => {
    this.setState({
      dob: date
    });
  };

  onClose = () => {
    this.setState({
      isConfirmVisible: true,
      message: 'Are you sure?'
    });
  };

  onConfirmClose = () => {
    const { onClose } = this.props;
    onClose();
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
    const refId = isEmpty(individual)
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
      this.setState({
        isAlertVisible: true,
        message: 'First Name must be populated!'
      });
      return;
    }
    if (email.length > 0) {
      if (!EmailValidator.validate(email)) {
        this.setState({
          isAlertVisible: true,
          message: 'Email address is invalid!'
        });
        return;
      }
    }
    if (zip.length > 0) {
      if (!utility.validateZipCode(zip)) {
        this.setState({
          isAlertVisible: true,
          message: 'Zip code is invalid!'
        });
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
      selectedType,
      isAlertVisible,
      isConfirmVisible,
      message
    } = this.state;

    return (
      <Container column center>
        <Row>
          <Col w={50}>
            <Fieldset legend="Name">
              <Row m>
                <HorizontalInput
                  type="text"
                  name="fname"
                  value={fname}
                  label="First Name:"
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  name="mname"
                  value={mname}
                  label="Middle Name:"
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  name="lname"
                  value={lname}
                  label="Last Name:"
                  onChange={this.handleInputChange}
                />
              </Row>
            </Fieldset>
            <br />
            <Fieldset legend="Additional Info">
              <Row m>
                <HorizontalInput
                  type="date"
                  value={dob}
                  label="DOB:"
                  onChange={this.handleInputChange}
                  name="dob"
                />
              </Row>
              <Row m>
                <Col w={40}>Gender:</Col>
                <Col w={60} m>
                  <GenderSelector
                    genders={genders}
                    className={styles.select}
                    selectedGender={selectedGender}
                    onSelectGender={this.onSelectGender}
                  />
                </Col>
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  name="dlNumber"
                  value={dlNumber}
                  label="DL#:"
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  name="dlState"
                  label="DL State:"
                  value={dlState}
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  name="company"
                  value={company}
                  label="Company:"
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  value={email}
                  name="email"
                  label="Email:"
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <Col w={40}>Type:</Col>
                <Col w={60} m>
                  <CallerTypeSelector
                    className={styles.select}
                    onSelectCallerType={this.onSelectCallerType}
                    selectedType={selectedType}
                  />
                </Col>
              </Row>
            </Fieldset>
          </Col>
          <Col w={50}>
            <Fieldset legend="Phone">
              <Row m>
                <HorizontalInput
                  type="text"
                  label="Home:"
                  name="phoneHome"
                  value={phoneHome}
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  label="Mobile:"
                  name="phoneMobile"
                  value={phoneMobile}
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  label="Work:"
                  value={phoneWork}
                  name="phoneWork"
                  onChange={this.handleInputChange}
                />
              </Row>
            </Fieldset>
            <br />
            <Fieldset legend="Address">
              <Row m>
                <HorizontalInput
                  name="address"
                  type="text"
                  value={address}
                  label="Address:"
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  name="address2"
                  value={address2}
                  label="Address 2:"
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  name="city"
                  value={city}
                  label="City:"
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  name="state"
                  value={state}
                  label="State:"
                  onChange={this.handleInputChange}
                />
              </Row>
              <Row m>
                <HorizontalInput
                  type="text"
                  name="zip"
                  value={zip}
                  label="Zip:"
                  onChange={this.handleInputChange}
                />
              </Row>
            </Fieldset>
          </Col>
        </Row>
        <br />
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.onClose}
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
          onOK={() => this.onConfirmClose()}
          onCancel={() =>
            this.setState({
              isConfirmVisible: false
            })
          }
          show={isConfirmVisible}
          message={message}
        />
      </Container>
    );
  }
}
