import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

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
        <nav className="link-cart-container">
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <i className="fa-solid fa-cart-shopping" />
          </Link>
          <span className="counter-items">0</span>
        </nav>
      </header>
    );
  }
}

export default Header;
