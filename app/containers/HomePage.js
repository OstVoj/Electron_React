// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Home from '../components/Home';

type Props = {
  history: PropTypes.object
};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return <Home {...this.props} />;
  }
}
