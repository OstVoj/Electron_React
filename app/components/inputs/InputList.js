import React from 'react';
import PropTypes from 'prop-types';
import HorizontalInput from './HorizontalInput';

const InputList = ({ size, name, type, value, onChange, options }) => {
  const keyToLabel = key => `${capitalize(addSpaces(key))}:`;

  const capitalize = s => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const addSpaces = s => {
    if (typeof s !== 'string') return '';
    return s.replace(/([A-Z])/g, ' $1').trim();
  };

  const onItemChange = (key, val) => {
    const changed = { ...value, [key]: val };
    if (name.length) {
      onChange({ [name]: changed });
    } else {
      onChange(changed);
    }
  };

  const valueKeys = Object.keys(value);

  return (
    <div>
      {valueKeys.map((key, i) => {
        const itemOptions = {
          size,
          type,
          label: keyToLabel(key),
          ...(options[key] || {})
        };

        return (
          <HorizontalInput
            key={i}
            size={itemOptions.size}
            label={itemOptions.label}
            type={itemOptions.type}
            options={itemOptions.options}
            value={value[key]}
            onChange={e => {
              onItemChange(key, e.target.value);
            }}
            offset={i + 1 < valueKeys.length}
          />
        );
      })}
    </div>
  );
};

InputList.propTypes = {
  value: PropTypes.object,
  size: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

InputList.defaultProps = {
  size: 60,
  name: '',
  type: 'text',
  value: {},
  options: {}
};

export default InputList;
