import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      type,
      datatest,
      value,
      id,
      className,
      onInputChange,
      name,
      labelText } = this.props;
    return (
      <label htmlFor={ id }>
        { labelText }
        <input
          name={ name }
          type={ type }
          value={ value }
          id={ id }
          className={ className }
          onChange={ onInputChange }
          data-testid={ datatest }
        />
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  datatest: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
};

Input.defaultProps = {
  className: '',
};

export default Input;
