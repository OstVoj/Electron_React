// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

type Props = {
  loginStore: Object,
  onSelectActivity: (activity: Object) => void,
  selectedActivity: Object
};

class ActivitySelector extends Component<Props> {
  props: Props;

  render() {
    const { onSelectActivity, selectedActivity, loginStore } = this.props;
    let selectValues = [];
    if (loginStore.loader) {
      const { activities } = loginStore.loader;
      selectValues = activities.map(activity => {
        const ret = activity;
        ret.value = activity.id;
        ret.label = activity.details;
        return ret;
      });
    }

    return (
      <Select
        options={selectValues}
        value={selectedActivity}
        onChange={activity => onSelectActivity(activity)}
      />
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login
  };
}

export default connect(mapStateToProps)(ActivitySelector);
