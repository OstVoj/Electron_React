import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import TimeInput from './TimeInput';
import styles from './Input.css';

const Input = ({
  type,
  value,
  onChange,
  onKeyPress,
  options,
  name,
  readOnly,
  tabIndex
}) => {
  switch (type) {
    case 'select':
      return <Select options={options} value={value} onChange={onChange} />;
    case 'textarea':
      return readOnly ? (
        <textarea
          rows="5"
          value={value}
          className={`${styles.input} ${styles[`${type}Input`]}`}
          onChange={onChange}
          name={name}
          readOnly
        />
      ) : (
        <textarea
          rows="5"
          value={value}
          className={`${styles.input} ${styles[`${type}Input`]}`}
          onChange={onChange}
          name={name}
        />
      );
    case 'timeInput':
      return (
        <TimeInput defaultValue={value} handleOnChange={onChange} name={name} />
      );
    default:
      return readOnly ? (
        <input
          className={`${styles.input} ${styles[`${type}Input`]}`}
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          checked={value}
          readOnly
        />
      ) : (
        <input
          className={`${styles.input} ${styles[`${type}Input`]}`}
          type={type}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          name={name}
          checked={value}
          tabIndex={tabIndex}
        />
      );
  }
};

Input.propTypes = {
  tabIndex: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  options: PropTypes.array,
  name: PropTypes.string,
  readOnly: PropTypes.bool
};

Input.defaultProps = {
  tabIndex: 0,
  type: 'text',
  value: '',
  options: [],
  readOnly: false,
  onChange: e => {
    console.log('No onChange function. value: ', e.target.value);
  },
  onKeyPress: e => {
    console.log('No onKeyPress function.');
  }
};

export default Input;
