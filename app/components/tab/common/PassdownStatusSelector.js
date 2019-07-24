// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

type Props = {
  selectedStatus: ?PropTypes.Object,
  onSelectStatus: (status: PropTypes.Object) => void
};

export default class PassdownStatusSelector extends Component<Props> {
  props: Props;

  render() {
    const status = [
      {
        label: 'Urgent',
        value: 'Urgent'
      },
      {
        label: 'Incomplete',
        value: 'Incomplete'
      },
      {
        label: 'Pending',
        value: 'Pending'
      },
      {
        label: 'Completed',
        value: 'Completed'
      },
      {
        label: 'Disregard',
        value: 'Disregard'
      }
    ];
    const { selectedStatus, onSelectStatus } = this.props;

    return (
      <Select
        options={status}
        value={selectedStatus}
        onChange={onSelectStatus}
      />
    );
  }
}
