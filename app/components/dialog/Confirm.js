import React from 'react';
import PropTypes from 'prop-types';
import styles from './Confirm.css';

class Confirm extends React.Component {
  render() {
    const { show, message, onOK, onCancel } = this.props;
    if (!show) {
      return null;
    }

    return (
      <div className={styles.backDrop}>
        <div className={styles.modal}>
          <div dangerouslySetInnerHTML={{ __html: message }} />
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className="tab-container-button"
              onClick={onOK}
            >
              OK
            </button>
            <button
              type="button"
              className="tab-container-button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  onOK: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  message: PropTypes.string
};

export default Confirm;
