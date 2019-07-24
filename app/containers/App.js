// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from '../actions/login';
import routes from '../constants/routes';
import logger from '../utils/logger';

type Props = {
  children: React.Node,
  loginStore: PropTypes.object,
  getLoader: () => void
};

export class App extends React.Component<Props> {
  props: Props;

  componentDidMount() {
    logger.log('Starting Application');
  }

  componentDidUpdate(prevProps: PropTypes.object) {
    const { loginStore } = this.props;
    if (!prevProps.loginStore.loginCompleted && loginStore.loginCompleted) {
      if (loginStore.auth) {
        const { success } = loginStore.auth;
        if (success === '1') {
          const { getLoader } = this.props;
          getLoader();
        }
      }
    }
  }

  render() {
    const { children } = this.props;
    const { loginStore } = this.props;
    if (loginStore.auth) {
      const { success } = loginStore.auth;
      if (success === '1') {
        return <React.Fragment>{children}</React.Fragment>;
      }
    }
    // eslint-disable-next-line no-restricted-globals
    return location.hash === '#/' ? (
      <React.Fragment>{children}</React.Fragment>
    ) : (
      <Redirect to={routes.LOGIN} />
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login,
    gpsStore: state.gps,
    ...this.props
  };
}

function mapDispatchToProps(dispatch: PropTypes.object) {
  return bindActionCreators(LoginActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
