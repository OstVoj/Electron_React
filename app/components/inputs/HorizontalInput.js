/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import Row from '../sections/Row';
import Col from '../sections/Col';
import Input from './Input';
import inputStyles from './Input.css';

const HorizontalInput = ({
  size,
  label,
  type,
  value,
  onChange,
  onKeyPress,
  offset,
  options,
  name,
  readOnly,
  tabIndex
}) => (
  <Row m={offset}>
    {type !== 'checkbox' && label.length && size < 100 && (
      <Col w={100 - size} className={inputStyles.labelColumn}>
        <label className={inputStyles.label}>{label}</label>
      </Col>
    )}
    {type !== 'checkbox' && (
      <Col w={size} m={size < 100}>
        <Input
          type={type}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          options={options}
          name={name}
          readOnly={readOnly}
          tabIndex={tabIndex}
        />
      </Col>
    )}
    {type === 'checkbox' && (
      <Col className={inputStyles.inputCheckboxColumn}>
        <Input
          type={type}
          value={value}
          onChange={onChange}
          options={options}
          name={name}
          readOnly={readOnly}
        />
      </Col>
    )}
    {type === 'checkbox' && label.length && size < 100 && (
      <Col>
        <label className={inputStyles.label}>{label}</label>
      </Col>
    )}
  </Row>
);

HorizontalInput.propTypes = {
  size: PropTypes.number,
  tabIndex: PropTypes.number,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  offset: PropTypes.bool,
  options: PropTypes.array,
  name: PropTypes.string,
  readOnly: PropTypes.bool
};

HorizontalInput.defaultProps = {
  size: 60,
  tabIndex: 0,
  label: '',
  type: 'text',
  value: '',
  onChange: e => {
    console.log('No onChange function. value: ', e.target.value);
  },
  onKeyPress: e => {
    console.log('No onKeyPress function.');
  },
  offset: false,
  options: [],
  name: '',
  readOnly: false
};

export default HorizontalInput;
