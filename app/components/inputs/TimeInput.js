// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

type Props = {
  defaultValue: string,
  handleOnChange: (value: string) => void,
  className: string
};

type States = {
  value: string
};

class TimeInput extends Component<Props, States> {
  props: Props;

  state = {
    value: ''
  };

  onFocus = () => {
    const currentDate = new Date();
    let minutes = currentDate.getMinutes().toString();
    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }
    let hours = currentDate.getHours().toString();
    if (hours.length === 1) {
      hours = `0${hours}`;
    }
    const value = `${hours}${minutes}`;

    this.setState({
      value
    });

    const { handleOnChange } = this.props;
    handleOnChange(value);
  };

  handleInputChange = (e: Object) => {
    const { value } = e.target;
    const { handleOnChange } = this.props;
    handleOnChange(value);
  };

  render() {
    const width = '32px';
    const background = 'transparent';
    const color = 'white';
    const { defaultValue, className } = this.props;

    return (
      <input
        size={6}
        style={{ width, background, color }}
        value={defaultValue}
        onFocus={this.onFocus}
        onChange={this.handleInputChange}
        className={className}
      />
    );
  }
}

export default TimeInput;
