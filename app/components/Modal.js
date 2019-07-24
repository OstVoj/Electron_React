import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    const { show, children, width, topOffset } = this.props;
    if (!show) {
      return null;
    }

    const padding = width ? `${(100 - width) / 2}%` : 50;
    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingTop: topOffset,
      paddingLeft: padding,
      paddingRight: padding
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#000',
      border: '2px solid white',
      borderRadius: 5,
      width: 'auto',
      height: 'auto',
      margin: '50px auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          {children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  width: PropTypes.number,
  topOffset: PropTypes.number
};

Modal.defaultValues = {
  topOffset: 50
};

export default Modal;
