// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { FadeLoader } from 'react-spinners';
import * as TabActions from '../../actions/tab';
import styles from './SubjectIdVerification.css';
import Container from '../sections/Container';
import Row from '../sections/Row';
import Col from '../sections/Col';
import Fieldset from '../sections/Fieldset';
import Input from '../inputs/Input';
import HorizontalInput from '../inputs/HorizontalInput';

const tabName = 'SUBJECT I.D. VERIFICATION';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: Object) => void,
  searchProfiles: (
    firstName: string,
    lastName: string,
    dlNumber: string,
    propertyCardId: string
  ) => void,
  getProfileInfos: (profileId: string) => void,
  setProfiles: (profiles: Object) => void,
  setProfileInfo: (profile: Object) => void
};

class SubjectIdVerification extends Component<Props> {
  props: Props;

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

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  };

  onClear = () => {
    this.onChange({
      lastName: '',
      firstName: '',
      dlNumber: '',
      propertyCardId: '',
      selectedProfileId: 0
    });
    const { setProfiles, setProfileInfo } = this.props;
    setProfiles(null);
    setProfileInfo(null);
  };

  onSearch = () => {
    this.onChange({
      selectedProfileId: 0
    });

    const { tabStore, searchProfiles } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');
    const lastName = get(props, 'lastName');
    const firstName = get(props, 'firstName');
    const dlNumber = get(props, 'dlNumber');
    const propertyCardId = get(props, 'propertyCardId');

    searchProfiles(
      firstName || '',
      lastName || '',
      dlNumber || '',
      propertyCardId || ''
    );
  };

  getProfileInfos = (profileId: string) => {
    const { getProfileInfos } = this.props;

    getProfileInfos(profileId);

    this.onChange({
      selectedProfileId: profileId
    });
  };

  renderProfiles = () => {
    const { tabStore } = this.props;
    const tabId = get(tabStore.selectedTabProps, 'tabId');
    const selectedProfiles = get(tabStore, 'profiles');
    const profiles = get(selectedProfiles, tabId);
    const props = get(tabStore.selectedTabProps, 'props');
    const selectedProfileId = get(props, 'selectedProfileId');
    const profileInfosLoading = get(tabStore, 'profileInfosLoading');

    return profileInfosLoading ? (
      <tbody>
        <tr>
          <td colSpan={3} align="center">
            <Col justify="center">
              <FadeLoader
                sizeUnit="px"
                size={150}
                color="#ffffff"
                loading={profileInfosLoading}
              />
            </Col>
          </td>
        </tr>
      </tbody>
    ) : (
      <tbody>
        {profiles &&
          profiles.map(profile => (
            <tr
              key={profile.profileId}
              onClick={() => this.getProfileInfos(profile.profileId)}
              className={
                selectedProfileId === profile.profileId ? styles.activeRow : ''
              }
            >
              <td>{profile.profileId}</td>
              <td>{profile.lname}</td>
              <td>{profile.fname}</td>
            </tr>
          ))}
      </tbody>
    );
  };

  render() {
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');
    const lastName = get(props, 'lastName');
    const firstName = get(props, 'firstName');
    const dlNumber = get(props, 'dlNumber');
    const propertyCardId = get(props, 'propertyCardId');

    const tabId = get(tabStore.selectedTabProps, 'tabId');

    const selectedProfile = get(tabStore, 'profile');
    const profile = get(selectedProfile, tabId);
    const lname = get(profile, 'lname');
    const fname = get(profile, 'fname');
    const mname = get(profile, 'mname');
    const phoneHome = get(profile, 'phoneHome');
    const phoneWork = get(profile, 'phoneWork');
    const phoneMobile = get(profile, 'phoneMobile');
    const account = get(profile, 'account');
    const dateCreated = get(profile, 'date');
    const livesOnsite = get(profile, 'livesOnsite');
    const propertyCardIdSearched = get(profile, 'propertyCardId');
    const cardStatus = get(profile, 'cardStatus');
    const residentStatus = get(profile, 'residentStatus');
    const notes = get(profile, 'notes');
    const address = get(profile, 'address');
    const address2 = get(profile, 'address2');
    const city = get(profile, 'city');
    const state = get(profile, 'state');
    const zip = get(profile, 'zip');
    const dob = get(profile, 'dob');
    const gender = get(profile, 'gender');
    const dlNumberSearched = get(profile, 'dlnumber');
    const dlState = get(profile, 'dlstate');
    const company = get(profile, 'company');
    const email = get(profile, 'email');

    const profileInfoLoading = get(tabStore, 'profileInfoLoading');
    const profileImageLoading = get(tabStore, 'profileImageLoading');

    const profileImages = get(tabStore, 'profileImages');
    let image = '';
    if (profileImages) {
      image = profileImages[tabId];
    }

    return (
      <Container>
        <Row>
          <Col w={60}>
            <Row>
              <Col>
                <Fieldset legend="Search">
                  <Row>
                    <Col>
                      <HorizontalInput
                        label="Last Name:"
                        value={lastName}
                        name="lastName"
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        tabIndex={1}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        label="DL Number:"
                        value={dlNumber}
                        name="dlNumber"
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        tabIndex={3}
                      />
                    </Col>
                  </Row>
                  <Row m p>
                    <Col>
                      <HorizontalInput
                        label="First Name:"
                        value={firstName}
                        name="firstName"
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        tabIndex={2}
                      />
                    </Col>
                    <Col m p>
                      <HorizontalInput
                        label="Property Card ID:"
                        value={propertyCardId}
                        name="propertyCardId"
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        tabIndex={4}
                      />
                    </Col>
                  </Row>
                  <Row m p>
                    <Col justify="center">
                      <button
                        type="button"
                        className={styles.tabContainerButton}
                        onClick={this.onClear}
                      >
                        Clear
                      </button>
                    </Col>
                    <Col justify="center">
                      <button
                        type="button"
                        className={styles.tabContainerButton}
                        onClick={this.onSearch}
                      >
                        Search
                      </button>
                    </Col>
                  </Row>
                </Fieldset>
              </Col>
            </Row>
            <Row m p>
              <Col>
                <Fieldset legend="Resident / Employee Information">
                  <div className={styles.table}>
                    <table>
                      <thead>
                        <tr>
                          <th>Profile ID</th>
                          <th>Last Name</th>
                          <th>First Name</th>
                        </tr>
                      </thead>
                      {this.renderProfiles()}
                    </table>
                  </div>
                </Fieldset>
              </Col>
            </Row>
            <Row m p>
              <Col w={50}>
                <Fieldset legend="Name">
                  {profileInfoLoading ? (
                    <Row>
                      <Col justify="center">
                        <FadeLoader
                          sizeUnit="px"
                          size={150}
                          color="#ffffff"
                          loading={profileInfoLoading}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col>
                        <Row m p>
                          <Col>Last Name:</Col>
                          <Col>{lname}</Col>
                        </Row>
                        <Row m p>
                          <Col>First Name:</Col>
                          <Col>{fname}</Col>
                        </Row>
                        <Row m p>
                          <Col>Middle Name:</Col>
                          <Col>{mname}</Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                </Fieldset>
              </Col>
              <Col w={50}>
                <Fieldset legend="Phone">
                  {profileInfoLoading ? (
                    <Row>
                      <Col justify="center">
                        <FadeLoader
                          sizeUnit="px"
                          size={150}
                          color="#ffffff"
                          loading={profileInfoLoading}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col>
                        <Row m p>
                          <Col>Home:</Col>
                          <Col>{phoneHome}</Col>
                        </Row>
                        <Row m p>
                          <Col>Mobile:</Col>
                          <Col>{phoneMobile}</Col>
                        </Row>
                        <Row m p>
                          <Col>Work:</Col>
                          <Col>{phoneWork}</Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                </Fieldset>
              </Col>
            </Row>
            <Row m p>
              <Col>
                <Fieldset legend="Property Details">
                  {profileInfoLoading ? (
                    <Row>
                      <Col justify="center">
                        <FadeLoader
                          sizeUnit="px"
                          size={150}
                          color="#ffffff"
                          loading={profileInfoLoading}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col>
                        <Row>
                          <Col>
                            <Row m p>
                              <Col>Account:</Col>
                              <Col>{account}</Col>
                            </Row>
                            <Row m p>
                              <Col>Date Created:</Col>
                              <Col>{dateCreated}</Col>
                            </Row>
                            <Row m p>
                              <Col>Lives Onsite:</Col>
                              <Col>{livesOnsite}</Col>
                            </Row>
                          </Col>
                          <Col>
                            <Row m p>
                              <Col>Property Card ID:</Col>
                              <Col>{propertyCardIdSearched}</Col>
                            </Row>
                            <Row m p>
                              <Col>Card Status:</Col>
                              <Col>{cardStatus}</Col>
                            </Row>
                            <Row m p>
                              <Col>Resident Status:</Col>
                              <Col>{residentStatus}</Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                </Fieldset>
              </Col>
            </Row>
            <Row m p>
              <Col>
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
            <Fieldset legend="Photo">
              <Row>
                <Col align="center" justify="center">
                  {profileImageLoading ? (
                    <FadeLoader
                      sizeUnit="px"
                      size={150}
                      color="#ffffff"
                      loading={profileImageLoading}
                    />
                  ) : (
                    image &&
                    profile && (
                      <img src={image} alt="profile" className={styles.image} />
                    )
                  )}
                </Col>
              </Row>
            </Fieldset>
            <Row m p>
              <Col>
                <Fieldset legend="Address">
                  {profileInfoLoading ? (
                    <Row>
                      <Col justify="center">
                        <FadeLoader
                          sizeUnit="px"
                          size={150}
                          color="#ffffff"
                          loading={profileInfoLoading}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col>
                        <Row m p>
                          <Col>Address:</Col>
                          <Col>{address}</Col>
                        </Row>
                        <Row m p>
                          <Col>Address2:</Col>
                          <Col>{address2}</Col>
                        </Row>
                        <Row m p>
                          <Col>City:</Col>
                          <Col>{city}</Col>
                        </Row>
                        <Row m p>
                          <Col>State:</Col>
                          <Col>{state}</Col>
                        </Row>
                        <Row m p>
                          <Col>Zip:</Col>
                          <Col>{zip}</Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                </Fieldset>
              </Col>
            </Row>
            <Row m p>
              <Col>
                <Fieldset legend="Additional Info">
                  {profileInfoLoading ? (
                    <Row>
                      <Col justify="center">
                        <FadeLoader
                          sizeUnit="px"
                          size={150}
                          color="#ffffff"
                          loading={profileInfoLoading}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col>
                        <Row m p>
                          <Col>DOB:</Col>
                          <Col>{dob}</Col>
                        </Row>
                        <Row m p>
                          <Col>Gender:</Col>
                          <Col>{gender}</Col>
                        </Row>
                        <Row m p>
                          <Col>DL#:</Col>
                          <Col>{dlNumberSearched}</Col>
                        </Row>
                        <Row m p>
                          <Col>DL State:</Col>
                          <Col>{dlState}</Col>
                        </Row>
                        <Row m p>
                          <Col>Company:</Col>
                          <Col>{company}</Col>
                        </Row>
                        <Row m p>
                          <Col>Email:</Col>
                          <Col>{email}</Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                </Fieldset>
              </Col>
            </Row>
          </Col>
        </Row>
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
)(SubjectIdVerification);
