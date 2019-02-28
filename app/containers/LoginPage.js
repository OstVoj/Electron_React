// @flow
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as LoginActions from '../actions/login';

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login,
    ...this.props
  };
}

function mapDispatchToProps(dispatch: PropTypes.object) {
  return bindActionCreators(LoginActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
