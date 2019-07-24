import React from 'react';
import PropTypes from 'prop-types';
import styles from './Container.css';

const Container = ({ children, column, center }) => {
  const style = column ? { flexDirection: 'column' } : { flexDirection: 'row' };
  if (center) {
    style.alignItems = 'center';
  }

  return (
    <div className={styles.container} data-tid="container" style={style}>
      {children}
    </div>
  );
};

Container.propTypes = {
  column: PropTypes.bool,
  children: PropTypes.node
};

Container.defaultProps = {
  column: false,
  children: ''
};

export default Container;
