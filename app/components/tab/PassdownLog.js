// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import * as TabActions from '../../actions/tab';
import Cotainer from '../sections/Container';
import Fieldset from '../sections/Fieldset';
import Col from '../sections/Col';
import Row from '../sections/Row';
import DistrictSelector from './common/DistrictSelector';
import PassdownStatusSelector from './common/PassdownStatusSelector';
import Modal from '../Modal';
import PassDown from './common/Passdown';
import styles from './PassdownLog.css';

const tabName = 'PASSDOWN LOG';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: Object) => void,
  getPassdownLogs: (
    districtId: string,
    accountId: string,
    status: string,
    daysAgo: number
  ) => void,
  savePassdownLog: (
    excerpt: string,
    districtId: string,
    accountId: string,
    status: string,
    priority: string,
    recordId: string
  ) => void,
  setAdding: (adding: boolean) => boolean
};

type States = {
  isModalVisible: boolean,
  selectedPassdown: ?PropTypes.Object,
  tries: number
};

class PassdownLog extends Component<Props, States> {
  props: Props;

  state = {
    isModalVisible: false,
    selectedPassdown: null,
    tries: 0
  };

  componentDidMount() {
    const { tries } = this.state;
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const selectedDistrict = get(props, 'selectedDistrict');
    const selectedStatus = get(props, 'selectedStatus');
    if (tries > 5 || selectedDistrict || selectedStatus) {
      this.setState({
        tries: 0
      });
      this.getPassdownLogs(
        selectedDistrict ? selectedDistrict.value : '',
        selectedStatus ? selectedStatus.value : '',
        '',
        30
      );
    } else {
      this.setState({
        tries: tries + 1
      });
      setTimeout(() => this.componentDidMount(), 300);
    }
  }

  componentDidUpdate = prevProps => {
    const { tabStore } = this.props;
    const adding = get(tabStore, 'adding');
    const prevAdding = get(prevProps.tabStore, 'adding');
    if (prevAdding && !adding) {
      const props = get(tabStore.selectedTabProps, 'props');

      const selectedDistrict = get(props, 'selectedDistrict');
      const selectedStatus = get(props, 'selectedStatus');
      this.getPassdownLogs(
        selectedDistrict ? selectedDistrict.value : '',
        selectedStatus ? selectedStatus.value : '',
        '',
        30
      );
    }
  };

  getPassdownLogs = (
    selectedDistrict: string,
    selectedStatus: string,
    account: string,
    daysAgo: number
  ) => {
    const { getPassdownLogs } = this.props;

    getPassdownLogs(selectedDistrict, account, selectedStatus, daysAgo);
  };

  onChange = changes => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    setTabProperties(tabName, tabId, {
      ...props,
      ...changes
    });
  };

  onSelectDistrict = (district: ?PropTypes.Object) => {
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const selectedStatus = get(props, 'selectedStatus');
    this.getPassdownLogs(
      district ? district.value : '',
      selectedStatus ? selectedStatus.value : '',
      '',
      30
    );
    this.onChange({ selectedDistrict: district });
  };

  onSelectStatus = (status: ?PropTypes.Object) => {
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');

    const selectedDistrict = get(props, 'selectedDistrict');
    this.getPassdownLogs(
      selectedDistrict ? selectedDistrict.value : '',
      status ? status.value : '',
      '',
      30
    );
    this.onChange({ selectedStatus: status });
  };

  onClearDistrictFilter = () => {
    this.onSelectDistrict(null);
  };

  onClearStatusFilter = () => {
    this.onSelectStatus(null);
  };

  onSelectPassdown = (passdown: Object) => {
    this.setState({
      selectedPassdown: passdown,
      isModalVisible: true
    });
  };

  renderPassdownRows = (passdownLogs: Array) => {
    const { selectedPassdown } = this.state;
    const result = passdownLogs.map((passdownLog: Object, key: number) => {
      const { officerId, recordId, date, accountName, excerpt } = passdownLog;
      let note = excerpt;
      if (excerpt.length > 20) {
        note = excerpt.substring(0, 20);
        note = `${note}...`;
      }

      return (
        <tr
          key={key}
          onDoubleClick={() => this.onSelectPassdown(passdownLog)}
          onClick={() => this.setState({ selectedPassdown: passdownLog })}
          className={
            selectedPassdown &&
            selectedPassdown.recordId === passdownLog.recordId
              ? styles.activeRow
              : ''
          }
        >
          <td>{recordId}</td>
          <td>{date}</td>
          <td>{accountName}</td>
          <td>{officerId}</td>
          <td>{note}</td>
        </tr>
      );
    });
    return result;
  };

  renderPassdownLogs = () => {
    const { tabStore } = this.props;
    const passdownLogs = get(tabStore, 'passdownLogs');

    return (
      <table>
        <thead>
          <tr>
            <th>Passdown ID</th>
            <th>Date / Time</th>
            <th>Account</th>
            <th>Officer</th>
            <th>Excerpt</th>
          </tr>
        </thead>
        <tbody>
          {passdownLogs &&
            passdownLogs.length > 0 &&
            this.renderPassdownRows(passdownLogs)}
        </tbody>
      </table>
    );
  };

  onClickAdd = () => {
    this.setState({
      isModalVisible: true,
      selectedPassdown: null
    });
  };

  handleCloseModal = (data: Object) => {
    this.setState({
      isModalVisible: false
    });
    if (data) {
      const { savePassdownLog, setAdding } = this.props;

      setAdding(true);
      savePassdownLog(
        data.excerpt,
        data.districtId,
        data.accountId,
        data.status,
        data.priority,
        data.recordId
      );
    }
  };

  render() {
    const { isModalVisible, selectedPassdown } = this.state;
    const { tabStore, loginStore } = this.props;

    const adding = get(tabStore, 'adding');
    const props = get(tabStore.selectedTabProps, 'props');

    const selectedDistrict = get(props, 'selectedDistrict');
    const selectedStatus = get(props, 'selectedStatus');

    return (
      <Cotainer column>
        <Col>
          <Row m p>
            <Col w={70}>
              <Fieldset legend="District Filter">
                <Row>
                  <Col align="center">Select District:</Col>
                  <Col>
                    <DistrictSelector
                      selectedDistrict={selectedDistrict}
                      onSelectDistrict={this.onSelectDistrict}
                    />
                  </Col>
                  <Col justify="center" align="center">
                    <button
                      type="button"
                      className="tabContainerButton"
                      onClick={this.onClearDistrictFilter}
                    >
                      Clear
                    </button>
                  </Col>
                </Row>
                <Row m p>
                  <Col align="center">Select Status:</Col>
                  <Col>
                    <PassdownStatusSelector
                      selectedStatus={selectedStatus}
                      onSelectStatus={this.onSelectStatus}
                    />
                  </Col>
                  <Col justify="center" align="center">
                    <button
                      type="button"
                      className="tabContainerButton"
                      onClick={this.onClearStatusFilter}
                    >
                      Clear
                    </button>
                  </Col>
                </Row>
              </Fieldset>
            </Col>
            <Col m p w={30} justify="center" align="center">
              <button
                type="button"
                className="tabContainerButton"
                onClick={this.onClickAdd}
              >
                Add New Passdown
              </button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Fieldset legend="Passdown Results">
            <div className={styles.passdownList}>
              {!adding && this.renderPassdownLogs()}
            </div>
          </Fieldset>
          <Row m p center>
            Last 30 Days Displayed
          </Row>
        </Col>
        <Modal show={isModalVisible} onClose={this.handleCloseModal} width={70}>
          <PassDown
            onClose={this.handleCloseModal}
            passdown={selectedPassdown}
            loginStore={loginStore}
          />
        </Modal>
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
)(PassdownLog);
