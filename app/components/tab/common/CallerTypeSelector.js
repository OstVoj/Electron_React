// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

type Props = {
  loginStore: Object,
  onSelectCallerType: (callerType: Object) => void,
  selectedType: Object,
  className: string
};

class CallerTypeSelector extends Component<Props> {
  props: Props;

  render() {
    const {
      onSelectCallerType,
      selectedType,
      loginStore,
      className
    } = this.props;
    let callerTypesValues = [];
    if (loginStore.loader) {
      const { callertypes } = loginStore.loader;
      callerTypesValues = callertypes.map(callerType => {
        const item = callerType;
        item.value = callerType.id;
        item.label = callerType.name;
        return item;
      });
    }

    return (
      <Select
        options={callerTypesValues}
        value={selectedType}
        onChange={type => onSelectCallerType(type)}
        className={className}
      />
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login
  };
}

export default connect(mapStateToProps)(CallerTypeSelector);
