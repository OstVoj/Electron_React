import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.css';

class Alert extends React.Component {
  render() {
    const { show, message, onClose } = this.props;
    if (!show) {
      return null;
    }

    return (
      <div className={styles.backDrop}>
        <div className={styles.modal}>
          <div>{message}</div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className="tab-container-button"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  message: PropTypes.string
};

export default Alert;
