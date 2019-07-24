import React from 'react';
import PropTypes from 'prop-types';

const Col = ({
  children,
  w,
  offset,
  m,
  className,
  width,
  column,
  justify,
  align
}) => {
  if (
    (!offset.length || offset === '0px' || offset === '0' || offset === '0%') &&
    m
  ) {
    offset = '10px';
  }

  const style = {
    width: `calc(${w}% - ${offset})`,
    marginLeft: offset
  };

  if (width) {
    style.width = `${width}px`;
  }

  if (justify || align) {
    style.display = 'flex';
  }

  if (justify) {
    style.justifyContent = justify;
  }

  if (align) {
    style.alignItems = align;
  }

  if (column) {
    style.flexDirection = 'column';
  }

  style.color = 'green';

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

Col.propTypes = {
  children: PropTypes.node,
  w: PropTypes.number,
  offset: PropTypes.string,
  m: PropTypes.bool
};

Col.defaultProps = {
  w: 100,
  m: false,
  offset: '0px'
};

export default Col;
