import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { sum } = this.props;
    return (
      <header>
        <nav className="link-cart-container">
          <Link
            to="/"
          >
            <img src="https://upload.wikimedia.org/wikipedia/pt/0/04/Logotipo_MercadoLivre.png" alt="logo-mercado-livre" className="logo" />
          </Link>
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <i className="fa-solid fa-cart-shopping" />
            <span
              className="counter-items"
              data-testid="shopping-cart-size"
            >
              { sum < 100 ? sum : '99+' }
            </span>
          </Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  sum: PropTypes.number.isRequired,
};

export default Header;
