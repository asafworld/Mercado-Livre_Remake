import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Category extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const obj = await categories.json();
    this.setState({ categories: obj });
  }

  onInputChange = ({ target }) => {
    const { onChange, onCategoryChange } = this.props;
    onChange('category', target.value);
    onCategoryChange(target.value);
  }

  render() {
    const { categories } = this.state;
    return (
      categories.map((categoria) => (
        <label
          htmlFor={ categoria.id }
          key={ categoria.id }
          data-testid="category"
        >
          <input
            type="radio"
            name="category"
            value={ categoria.id }
            id={ categoria.id }
            onChange={ this.onInputChange }
          />
          {categoria.name}
        </label>))
    );
  }
}

Category.propTypes = {
  onChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default Category;
