import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  componentDidMount() {
    if (localStorage.getItem('addedProductsIds') === null) {
      const array = JSON.stringify([]);
      localStorage.setItem('addedProductsIds', array);
    }
  }

  render() {
    return (
      <header>
        <p>0</p>
        <Link to="/cart" data-testid="shopping-cart-button">
          Cart
        </Link>
      </header>
    );
  }
}

export default Header;
