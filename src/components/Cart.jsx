import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  render() {
    return (
      <>
        <header>
          <Link to="/">
            Home
          </Link>
        </header>
        <section>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </section>
      </>
    );
  }
}

export default Cart;
