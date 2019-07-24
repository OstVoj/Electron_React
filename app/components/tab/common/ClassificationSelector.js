// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

type Props = {
  loginStore: Object,
  onSelectClassification: (classification: Object) => void,
  selectedClassification: Object
};

class ClassificationSelector extends Component<Props> {
  props: Props;

  render() {
    const {
      onSelectClassification,
      selectedClassification,
      loginStore
    } = this.props;
    let selectValues = [];
    if (loginStore.loader) {
      const { classifications } = loginStore.loader;
      selectValues = classifications.map(classification => {
        const ret = classification;
        ret.value = classification.id;
        ret.label = classification.details;
        return ret;
      });
      selectValues.sort((a, b) => {
        const nameA = a.details.toUpperCase();
        const nameB = b.details.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    return (
      <Select
        options={selectValues}
        value={selectedClassification}
        onChange={item => onSelectClassification(item)}
      />
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login
  };
}

export default connect(mapStateToProps)(ClassificationSelector);
