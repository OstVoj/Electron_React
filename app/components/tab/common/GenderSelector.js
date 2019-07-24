// @flow
import React, { Component } from 'react';
import Select from 'react-select';

type Props = {
  genders: Array<{ value: string, label: string }>,
  selectedGender: Object,
  className: string,
  onSelectGender: (gender: Object) => void
};

export default class GenderSelector extends Component<Props> {
  props: Props;

  render() {
    const { genders, className, selectedGender, onSelectGender } = this.props;

    return (
      <Select
        className={className}
        options={genders}
        value={selectedGender}
        onChange={onSelectGender}
      />
    );
  }
}
