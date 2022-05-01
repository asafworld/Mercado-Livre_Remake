import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import priceFormat from '../services/priceFormat';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount = () => {
    const itemsId = localStorage.getItem('addedProductsIds');
    const ids = JSON.parse(itemsId);
    this.setState({ products: ids });
  }

  plusOne = (item) => {
    const { products } = this.state;
    const same = products.find((e) => e.id === item.id);
    products.forEach((e) => {
      if (e.id === same.id) {
        e.qntd += 1;
      }
    });
    this.setState({ products });
    localStorage.setItem('addedProductsIds', JSON.stringify(products));
  }

  minusOne = (item) => {
    const { products } = this.state;
    const same = products.find((e) => e.id === item.id);
    products.forEach((e) => {
      if (e.id === same.id) {
        e.qntd -= 1;
      }
    });
    if (item.qntd >= 1) {
      this.setState({ products });
      localStorage.setItem('addedProductsIds', JSON.stringify(products));
    }
  }

  remove = (item) => {
    const { products } = this.state;
    const newArray = products.filter((e) => e.id !== item.id);
    this.setState({ products: newArray });
    localStorage.setItem('addedProductsIds', JSON.stringify(newArray));
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

  render() {
    const { products } = this.state;
    return (
      <>
        <header>
          <nav>
            <Link to="/">
              <img src="https://upload.wikimedia.org/wikipedia/pt/0/04/Logotipo_MercadoLivre.png" alt="logo-mercado-livre" className="logo" />
            </Link>
          </nav>
        </header>
        { products.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p> : (
            products.map((item, index) => (
              <div key={ index }>
                <p data-testid="shopping-cart-product-name">{ item.title }</p>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>{ priceFormat((item.price * item.qntd)) }</p>
                <p data-testid="shopping-cart-product-quantity">
                  { item.qntd }
                </p>
                <button
                  type="button"
                  onClick={ () => this.plusOne(item) }
                  data-testid="product-increase-quantity"
                  disabled={ this.exist(item) }
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={ () => this.minusOne(item) }
                  data-testid="product-decrease-quantity"
                  disabled={ item.qntd === 1 }
                >
                  -
                </button>
                <button type="button" onClick={ () => this.remove(item) }>x</button>
              </div>
            ))
          ) }
        <Link to="/checkout" data-testid="checkout-products">
          Finalizar Compra
        </Link>
      </>
    );
  }
}

export default Cart;
