import React from 'react';
import PropTypes from 'prop-types';
import Col from '../../sections/Col';
import Row from '../../sections/Row';
import styles from './TabButtonContainer.css';

const TabButtonContainer = ({ onSave, onCancel, onClear }) => (
  <Row p c>
    <Col w={33}>
      <button
        type="button"
        className={styles.tabContainerButton}
        onClick={onCancel}
      >
        Cancel
      </button>
    </Col>
    <Col w={33}>
      <button
        type="button"
        className={styles.tabContainerButton}
        onClick={onClear}
      >
        Clear
      </button>
    </Col>
    <Col w={33}>
      <button
        type="button"
        className={styles.tabContainerButton}
        onClick={onSave}
      >
        Save
      </button>
    </Col>
  </Row>
);

TabButtonContainer.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onClear: PropTypes.func
};

TabButtonContainer.defaultProps = {
  onSave: e => {
    console.log('No onChange function. value: ', e.target.value);
  },
  onCancel: e => {
    console.log('No onChange function. value: ', e.target.value);
  },
  onClear: e => {
    console.log('No onChange function. value: ', e.target.value);
  }
};

export default TabButtonContainer;
