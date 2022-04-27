import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <Link to="cart" data-testid="shopping-cart-button">
          Cart
        </Link>
      </header>
    );
  }
}

export default Header;
