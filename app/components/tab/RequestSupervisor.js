// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import * as TabActions from '../../actions/tab';
import Container from '../sections/Container';
import Row from '../sections/Row';
import Col from '../sections/Col';
import HorizontalInput from '../inputs/HorizontalInput';
import styles from './RequestSupervisor.css';

const tabName = 'REQUEST SUPERVISOR';

type Props = {
  loginStore: Object,
  tabStore: Object,
  setTabProperties: (tabName: string, tabId: number, props: Object) => void,
  requestSuperVisor: (callbackNumber: string) => void,
  setRequestSupervisorStatus: (status: boolean) => void,
  onCloseTab: () => void
};

class RequestSupervisor extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { loginStore } = this.props;
    const { loader } = loginStore;
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');
    const callbackNumber = get(props, 'callbackNumber');

    if (!callbackNumber) {
      const { auth } = loginStore;
      const { userId } = auth;
      const officers = get(loader, 'officers');

      if (officers) {
        const filters = officers.filter(officer => officer.userId === userId);
        let number = '';
        if (filters.length > 0) {
          number = filters[0].callbackNumber;
        }
        this.onChange({
          callbackNumber: number
        });
      }
    }
  }

  componentDidUpdate(prevProps: PropTypes.Object) {
    const { loginStore, tabStore } = this.props;
    const { loader } = loginStore;

    if (loader && !prevProps.loginStore.loader) {
      const props = get(tabStore.selectedTabProps, 'props');
      const callbackNumber = get(props, 'callbackNumber');

      if (!callbackNumber) {
        const { auth } = loginStore;
        const { userId } = auth;
        const officers = get(loader, 'officers');

        if (officers) {
          const filters = officers.filter(officer => officer.userId === userId);
          let number = '';
          if (filters.length > 0) {
            number = filters[0].callbackNumber;
          }
          this.onChange({
            callbackNumber: number
          });
        }
      }
    }

    if (
      tabStore.requestSupervisorStatus &&
      !prevProps.tabStore.requestSupervisorStatus
    ) {
      this.onClose();
    }
  }

  handleInputChange = (event: Object) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const changes = {};
    changes[name] = value;
    this.onChange(changes);
  };

  onChange = changes => {
    const { tabStore, setTabProperties } = this.props;
    const { props, tabId } = tabStore.selectedTabProps;
    setTabProperties(tabName, tabId, {
      ...props,
      ...changes
    });
  };

  onYes = () => {
    const { tabStore, setRequestSupervisorStatus } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');
    const callbackNumber = get(props, 'callbackNumber');

    if (callbackNumber) {
      setRequestSupervisorStatus(false);

      const { requestSuperVisor } = this.props;

      requestSuperVisor(callbackNumber);
    }
  };

  onClose = () => {
    const { onCloseTab } = this.props;
    onCloseTab();
  };

  render() {
    const { tabStore } = this.props;
    const props = get(tabStore.selectedTabProps, 'props');
    const callbackNumber = get(props, 'callbackNumber');

    return (
      <Container column>
        <Row m p>
          <Col align="center" justify="center">
            Would you like your supervisor contact you?
          </Col>
        </Row>
        <Row m p>
          <Col align="center" justify="center">
            <div className={styles.inputContainer}>
              <HorizontalInput
                label="Optional Callback Number:"
                type="text"
                value={callbackNumber}
                name="callbackNumber"
                onChange={this.handleInputChange}
              />
            </div>
          </Col>
        </Row>
        <Row m p>
          <Col align="center" justify="center">
            <div className={styles.buttonContainer}>
              <button
                type="button"
                className="tab-container-button"
                onClick={this.onClose}
              >
                NO
              </button>
              <button
                type="button"
                className="tab-container-button"
                onClick={this.onYes}
              >
                YES
              </button>
            </div>
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
)(RequestSupervisor);
