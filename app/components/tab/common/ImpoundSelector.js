// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

type Props = {
  loginStore: PropTypes.Object,
  disabled?: boolean,
  onSelectImpound: (impound: PropTypes.Object) => void,
  selectedImpound: ?PropTypes.Object
};

class ImpoundSelector extends Component<Props> {
  props: Props;

  static defaultProps = {
    disabled: false
  };

  render() {
    const {
      onSelectImpound,
      selectedImpound,
      loginStore,
      disabled
    } = this.props;
    let selectValues = [];
    if (loginStore.loader) {
      const { impounds } = loginStore.loader;
      selectValues = impounds.map(impound => {
        const ret = impound;
        ret.value = impound.id;
        ret.label = impound.details;
        return ret;
      });
    }

    return (
      <Select
        options={selectValues}
        value={selectedImpound}
        onChange={impound => onSelectImpound(impound)}
        isDisabled={disabled}
      />
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login
  };
}

export default connect(mapStateToProps)(ImpoundSelector);
