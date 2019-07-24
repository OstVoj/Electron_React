import React from 'react';
import PropTypes from 'prop-types';
import styles from './Fieldset.css';

const Fieldset = ({ children, legend, h }) => {
  const style = {};
  if (h) {
    style.height = `${h}vh`;
    style.overflowY = 'auto';
  }

  return (
    <fieldset className={styles.main}>
      <legend>{legend}</legend>
      <div className={styles.body} style={style}>
        {children}
      </div>
    </fieldset>
  );
};

Fieldset.propTypes = {
  legend: PropTypes.string,
  children: PropTypes.node
};

Fieldset.defaultProps = {
  legend: '',
  children: ''
};

export default Fieldset;
