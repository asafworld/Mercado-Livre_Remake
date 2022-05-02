import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import priceFormat from '../services/priceFormat';
import './Cart.css';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      totalPrice: 0,
    };
  }

  componentDidMount = () => {
    const itemsId = localStorage.getItem('addedProductsIds');
    const products = JSON.parse(itemsId);
    this.setState({ products });
    let total = 0;
    products.forEach((e) => {
      total += (e.price * e.qntd);
    });
    this.setState({ totalPrice: total });
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
    let total = 0;
    products.forEach((e) => {
      total += (e.price * e.qntd);
    });
    this.setState({ totalPrice: total });
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
    let total = 0;
    products.forEach((e) => {
      total += (e.price * e.qntd);
    });
    this.setState({ totalPrice: total });
  }

  remove = (item) => {
    const { products } = this.state;
    const newArray = products.filter((e) => e.id !== item.id);
    this.setState({ products: newArray });
    localStorage.setItem('addedProductsIds', JSON.stringify(newArray));
    let total = 0;
    newArray.forEach((e) => {
      total += (e.price * e.qntd);
    });
    this.setState({ totalPrice: total });
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
    const { products, totalPrice } = this.state;
    return (
      <>
        <header>
          <nav>
            <Link to="/">
              <img src="https://upload.wikimedia.org/wikipedia/pt/0/04/Logotipo_MercadoLivre.png" alt="logo-mercado-livre" className="logo" />
            </Link>
          </nav>
        </header>
        <main className="cart">
          { products.length === 0
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p> : (
              products.map((item) => (
                <section key={ item.id } className="card-container">
                  <section
                    data-testid="product"
                    className="card"
                  >
                    <img className="img-card" src={ item.thumbnail } alt={ item.title } />
                    <div className="product-info">
                      <Link to={ `/product/${item.id}` }>
                        <p
                          data-testid="shopping-cart-product-name"
                          className="name-card"
                        >
                          { item.title }
                        </p>
                      </Link>
                      <p
                        className="price-card"
                      >
                        { priceFormat((item.price * item.qntd))}
                      </p>
                      <p
                        className="stock-card"
                      >
                        { `Estoque: ${item.available_quantity}` }
                      </p>
                      { item.shipping.free_shipping && (
                        <p data-testid="free-shipping" className="free">
                          <i className="fa-solid fa-truck-fast" />
                          {' Frete Grátis'}
                        </p>
                      ) }
                      <div className="control-cart">
                        <button
                          type="button"
                          onClick={ () => this.minusOne(item) }
                          data-testid="product-decrease-quantity"
                          disabled={ item.qntd === 1 }
                          className="more-less-cart less"
                        >
                          -
                        </button>
                        <p data-testid="shopping-cart-product-quantity">{ item.qntd }</p>
                        <button
                          type="button"
                          onClick={ () => this.plusOne(item) }
                          data-testid="product-increase-quantity"
                          disabled={ this.exist(item) }
                          className="more-less-cart more"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={ () => this.remove(item) }
                      className="delete-cart"
                    >
                      ⨉
                    </button>
                  </section>
                </section>
              ))
            ) }
        </main>
        <footer className="footer-cart">
          <p className="total">
            Total:
            {' '}
            <span className="total-price">{ priceFormat(totalPrice) }</span>
          </p>
          <Link
            to="/checkout"
            data-testid="checkout-products"
            className="checkout-link"
          >
            Finalizar Compra
          </Link>
        </footer>
      </>
    );
  }
}

export default Cart;
