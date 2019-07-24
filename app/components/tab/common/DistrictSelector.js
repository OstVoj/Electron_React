// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

type Props = {
  loginStore: Object,
  onSelectDistrict: (activity: Object) => void,
  selectedDistrict: Object
};

class DistrictSelector extends Component<Props> {
  props: Props;

  render() {
    const { onSelectDistrict, selectedDistrict, loginStore } = this.props;
    let selectValues = [];
    if (loginStore.loader) {
      const { districts } = loginStore.loader;
      selectValues = districts.map(district => {
        const ret = district;
        ret.value = district.id;
        ret.label = district.details;
        return ret;
      });
    }

    return (
      <Select
        options={selectValues}
        value={selectedDistrict}
        onChange={district => onSelectDistrict(district)}
      />
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login
  };
}

export default connect(mapStateToProps)(DistrictSelector);
