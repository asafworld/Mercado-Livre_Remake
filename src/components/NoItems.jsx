import React, { Component } from 'react';
import './NoItems.css';

class NoItems extends Component {
  render() {
    return (
      <section className="no-items">
        <p
          data-testid="shopping-cart-empty-message"
          className="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
        <img src="https://www.eyeconeoptical.com/webroot/img/img-no-cartitems.png" alt="no-items-img" className="no-items-img" />
      </section>
    );
  }
}

export default NoItems;
