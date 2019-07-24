import React from 'react';
import PropTypes from 'prop-types';
import styles from './RoundedSection.css';

const RoundedSection = ({ children, column }) => (
  <div
    className={styles.container}
    style={column ? { flexDirection: 'column' } : { flexDirection: 'row' }}
  >
    {children}
  </div>
);

RoundedSection.propTypes = {
  column: PropTypes.bool,
  children: PropTypes.node
};

RoundedSection.defaultProps = {
  column: false,
  children: ''
};

export default RoundedSection;
