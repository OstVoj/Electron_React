// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { FadeLoader } from 'react-spinners';
import * as TabActions from '../../actions/tab';
import Container from '../sections/Container';
import Fieldset from '../sections/Fieldset';
import Row from '../sections/Row';
import Col from '../sections/Col';
import styles from './PostOrders.css';
import DistrictSelector from './common/DistrictSelector';
import AccountSelector from './common/AccountSelector';
import PostOrderDetails from './common/PostOrderDetails';
import HorizontalInput from '../inputs/HorizontalInput';
import Modal from '../Modal';

const tabName = 'POST ORDERS';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: any) => void,
  getPostOrders: (
    district: string,
    accountId: string,
    address: string,
    city: string
  ) => void,
  setPostOrders: (postOrders: Array<any>) => void,
  getPostOrderDetails: (accountId: string) => void
};

type States = {
  isModalVisible: boolean
};

class PostOrders extends Component<Props, States> {
  props: Props;

  state = {
    isModalVisible: false
  };

  onSearch = () => {
    const { getPostOrders, tabStore } = this.props;
    const { props } = tabStore.selectedTabProps;
    const selectedDistrict = get(props, 'selectedDistrict');
    const selectedAccount = get(props, 'selectedAccount');
    const address = get(props, 'address');
    const city = get(props, 'city');
    getPostOrders(
      selectedDistrict ? selectedDistrict.value : '',
      selectedAccount ? selectedAccount.value : '',
      address || '',
      city || ''
    );
  };

  onClear = () => {
    this.onChange({
      selectedAccount: null,
      selectedDistrict: null,
      address: '',
      city: ''
    });
    const { setPostOrders } = this.props;
    setPostOrders([]);
  };

  onChange = changes => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    setTabProperties(tabName, tabId, {
      ...props,
      ...changes
    });
  };

  onSelectDistrict = (selectedDistrict: Object) => {
    this.onChange({
      selectedDistrict
    });
  };

  onSelectAccount = (selectedAccount: Object) => {
    this.onChange({
      selectedAccount
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

  setSelectedAccountId = (accountId: string) => {
    this.onChange({
      selectedAccountId: accountId
    });
  };

  getPostOrderDetails = (accountId: string) => {
    this.onChange({
      selectedAccountId: accountId
    });

    const { getPostOrderDetails } = this.props;
    getPostOrderDetails(accountId);

    this.setState({ isModalVisible: true });
  };

  renderPostOrders = (postOrders: Array<any>) => {
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');
    const selectedAccountId = get(props, 'selectedAccountId');
    const postOrdersLoading = get(tabStore, 'postOrdersLoading');

    return postOrdersLoading ? (
      <tbody>
        <tr>
          <td colSpan={5} align="center">
            <Col justify="center">
              <FadeLoader
                sizeUnit="px"
                size={150}
                color="#ffffff"
                loading={postOrdersLoading}
              />
            </Col>
          </td>
        </tr>
      </tbody>
    ) : (
      <tbody>
        {postOrders &&
          postOrders.map(postOrder => (
            <tr
              key={postOrder.accountId}
              onClick={() => this.setSelectedAccountId(postOrder.accountId)}
              onDoubleClick={() =>
                this.getPostOrderDetails(postOrder.accountId)
              }
              className={
                selectedAccountId === postOrder.accountId
                  ? styles.activeRow
                  : ''
              }
            >
              <td>{postOrder.accountId}</td>
              <td>{postOrder.districtName}</td>
              <td>{postOrder.name}</td>
              <td>{postOrder.address}</td>
              <td>{postOrder.city}</td>
            </tr>
          ))}
      </tbody>
    );
  };

  render() {
    const { isModalVisible } = this.state;
    const { tabStore } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;

    const selectedDistrict = get(props, 'selectedDistrict');
    const selectedAccount = get(props, 'selectedAccount');
    const address = get(props, 'address');
    const city = get(props, 'city');
    const selectedPostOrders = get(tabStore, 'postOrders');
    const postOrders = get(selectedPostOrders, tabId);
    const postOrderDetailsLoading = get(tabStore, 'postOrderDetailsLoading');
    const postOrderDetails = get(tabStore, 'postOrderDetails');

    return (
      <Container column>
        <Row m p>
          <Col w={100}>
            <Fieldset legend="District Filter">
              <Row>
                <Col w={70}>
                  <Row>
                    <Col w={40} align="center">
                      District:
                    </Col>
                    <Col w={60} m>
                      <DistrictSelector
                        onSelectDistrict={this.onSelectDistrict}
                        selectedDistrict={selectedDistrict}
                      />
                    </Col>
                  </Row>
                  <Row p>
                    <Col w={40} align="center">
                      Account:
                    </Col>
                    <Col w={60} m>
                      <AccountSelector
                        onSelectAccount={this.onSelectAccount}
                        selectedAccount={selectedAccount}
                      />
                    </Col>
                  </Row>
                  <Row p>
                    <HorizontalInput
                      name="address"
                      label="Address:"
                      value={address}
                      onChange={this.handleInputChange}
                    />
                  </Row>
                  <Row p>
                    <HorizontalInput
                      name="city"
                      label="City:"
                      value={city}
                      onChange={this.handleInputChange}
                    />
                  </Row>
                </Col>
                <Col w={30} m p justify="space-around" column>
                  <Row>
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
                  <Row>
                    <Col justify="center">
                      <button
                        type="button"
                        className={styles.tabContainerButton}
                        onClick={this.onClear}
                      >
                        Clear
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Fieldset>
          </Col>
        </Row>
        <Row m p>
          <Col w={100}>
            <Fieldset legend="Post Order Results">
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>Account ID</th>
                      <th>District</th>
                      <th>Account Name</th>
                      <th>Address</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  {this.renderPostOrders(postOrders)}
                </table>
              </div>
            </Fieldset>
          </Col>
        </Row>
        <Modal
          show={isModalVisible}
          onClose={() => this.setState({ isModalVisible: false })}
        >
          <PostOrderDetails
            onClose={() => this.setState({ isModalVisible: false })}
            isLoading={postOrderDetailsLoading}
            postOrderDetails={postOrderDetails}
          />
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
)(PostOrders);
