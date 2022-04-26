import React, { Component } from 'react';
import { getProduct } from '../services/api';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      searchValue: '',
      result: false,
    };
    this.search = this.search.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  search = async () => {
    const { searchValue } = this.state;
    const productsList = await getProduct(searchValue);
    const zero = 0;
    if (productsList.results.length === zero) {
      this.setState({ products: productsList.results, result: true });
    } else {
      this.setState({ products: productsList.results, result: false });
    }
  }

  render() {
    const { products, searchValue, result } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="search-input">
            <input
              type="text"
              name="searchValue"
              id="search-input"
              data-testid="query-input"
              value={ searchValue }
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ () => this.search() }
            >
              Pesquisar
            </button>
          </label>
        </form>
        <div className="product-card">
          {result ? <h1>Nenhum produto foi encontrado</h1> : (
            products.map((product) => (
              <div data-testid="product" key={ product.id }>
                <p>{ product.title }</p>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{ product.price }</p>
              </div>)))}
        </div>
      </section>
    );
  }
}

export default Card;
