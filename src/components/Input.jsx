import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  constructor() {
    super();
    this.state = { product: '' };
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    const { onChange } = this.props;
    onChange('product', target.value);
  }

  render() {
    const { onInputChange } = this;
    const { product } = this.state;
    const { onSearch } = this.props;
    return (
      <section>
        <label
          htmlFor="product"
        >
          <input
            type="text"
            name="product"
            id="product"
            value={ product }
            onChange={ onInputChange }
            data-testid="query-input"
          />
        </label>
        <button
          type="button"
          onClick={ onSearch }
          data-testid="query-button"
        >
          Pesquisar
        </button>
      </section>
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Input;
