// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

type Props = {
  selectedPriority: ?PropTypes.Object,
  onSelectPriority: (priority: PropTypes.Object) => void
};

export default class PassdownPrioritySelector extends Component<Props> {
  props: Props;

  render() {
    const priorities = [
      {
        label: 'Low',
        value: 'Low'
      },
      {
        label: 'Medium',
        value: 'Medium'
      },
      {
        label: 'High',
        value: 'High'
      }
    ];
    const { selectedPriority, onSelectPriority } = this.props;

    return (
      <Select
        options={priorities}
        value={selectedPriority}
        onChange={onSelectPriority}
      />
    );
  }
}
