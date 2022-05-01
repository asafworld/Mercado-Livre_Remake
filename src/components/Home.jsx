import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import Header from './Header';
import Input from './Input';
import { getProductsFromCategoryAndQuery } from '../services/api';
import priceFormat from '../services/priceFormat';
import './Home.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
      product: '',
      results: [],
      sum: 0,
    };
  }

  componentDidMount() {
    const getProducts = localStorage.getItem('addedProductsIds');
    if (getProducts === null) {
      const array = JSON.stringify([]);
      localStorage.setItem('addedProductsIds', array);
    } else {
      this.sum(JSON.parse(getProducts));
    }
  }

  onSearch = async () => {
    const { category, product } = this.state;
    const getProducts = await getProductsFromCategoryAndQuery(category, product);
    this.setState({ results: getProducts.results });
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  }

  onCategoryChange = async (value) => {
    const { product } = this.state;
    const getProducts = await getProductsFromCategoryAndQuery(value, product);
    this.setState({ results: getProducts.results });
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    const { onChange } = this;
    onChange('product', target.value);
  }

  exist = (item) => {
    const getProducts = localStorage.getItem('addedProductsIds');
    const products = JSON.parse(getProducts);
    const same = products.find((e) => e.id === item.id);
    if (same !== undefined) {
      return same.qntd === item.available_quantity;
    }
    return false;
  }

  sum = (items) => {
    let sum = 0;
    items.forEach((e) => {
      sum += e.qntd;
    });
    this.setState({ sum });
  }

  addToCart = (item) => {
    const items = localStorage.getItem('addedProductsIds');
    const array = JSON.parse(items);
    const existEqual = array.some((e) => e.id === item.id);
    if (!existEqual) {
      const all = {
        ...item,
        qntd: 1,
      };
      localStorage.setItem('addedProductsIds', JSON.stringify([...array, all]));
      this.sum([...array, all]);
    } else {
      const same = array.find((e) => e.id === item.id);
      array.forEach((e) => {
        if (e.id === same.id) {
          e.qntd += 1;
        }
      });
      localStorage.setItem('addedProductsIds', JSON.stringify(array));
      this.sum(array);
    }
  }

  render() {
    const { results, product, sum } = this.state;
    return (
      <>
        <Header sum={ sum } />
        <section className="bottom-header">
          <h2
            data-testid="home-initial-message"
            className="initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
          <section className="search-input">
            <Input
              type="text"
              name="product"
              id="product"
              value={ product }
              className="query-input"
              onInputChange={ this.onInputChange }
              datatest="query-input"
              labelText=""
              placeholder="Busque pelo que você deseja..."
            />
            <hr />
            <button
              type="button"
              onClick={ this.onSearch }
              data-testid="query-button"
              className="query-button"
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </section>
        </section>
        <main>
          <aside className="search">
            <Category
              onCategoryChange={ this.onCategoryChange }
              onChange={ this.onChange }
            />
          </aside>
          <section className="cards-container">
            { results.map((item) => (
              <section key={ item.id } className="card">
                <Link to={ `/product/${item.id}` } data-testid="product-detail-link">
                  <section
                    data-testid="product"
                  >
                    <img className="img-card" src={ item.thumbnail } alt={ item.title } />
                    { item.shipping.free_shipping && (
                      <p data-testid="free-shipping" className="free">
                        <i className="fa-solid fa-truck-fast" />
                        {' Frete Grátis'}
                      </p>
                    ) }
                    <div className="product-info">
                      <p
                        data-testid="product-detail-name"
                        className="name-card"
                      >
                        { item.title }
                      </p>
                      <p className="price-card">{ priceFormat(item.price)}</p>
                      <p
                        className="stock-card"
                      >
                        { `Estoque: ${item.available_quantity}` }
                      </p>
                    </div>
                  </section>
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => this.addToCart(item) }
                  disabled={ this.exist(item) }
                  className="add-to-cart"
                >
                  <i className="fa-solid fa-cart-plus" />
                </button>
              </section>
            )) }
          </section>
        </main>
      </>
    );
  }
}

export default Home;
