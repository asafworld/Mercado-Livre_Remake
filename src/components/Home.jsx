import React from 'react';
import Category from './Category';
import Header from './Header';
import InputProducts from './InputProducts';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Card from './Card';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
      product: '',
      results: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('addedProductsIds') === null) {
      const array = JSON.stringify([]);
      localStorage.setItem('addedProductsIds', array);
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

  render() {
    const { results } = this.state;
    return (
      <>
        <Header />
        <section>
          <h1
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
          <Category
            onCategoryChange={ this.onCategoryChange }
            onChange={ this.onChange }
          />
          <InputProducts
            onChange={ this.onChange }
            onSearch={ this.onSearch }
          />
          { results.map((item) => (
            <Card
              item={ item }
              key={ item.id }
            />
          )) }
        </section>
      </>
    );
  }
}

export default Home;
