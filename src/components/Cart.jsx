import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  render() {
    return (
      <section>
        <Link to="/" data-testid="shopping-cart-button">Home</Link>
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
      </section>
    );
  }
}

export default Cart;
