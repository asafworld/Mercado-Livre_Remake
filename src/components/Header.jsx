import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <section>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Cart
        </Link>
      </section>
    );
  }
}

export default Header;
