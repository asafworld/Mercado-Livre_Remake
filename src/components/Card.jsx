import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { item: { title, thumbnail, price, id } } = this.props;
    return (
      <Link to={ `/productDetail/${id}` } data-testid="product-detail-link">
        <section
          data-testid="product"
        >
          <p data-testid="product-detail-name">{ title }</p>
          <img src={ thumbnail } alt={ title } />
          <p>{ price }</p>
        </section>
      </Link>
    );
  }
}

Card.propTypes = {
  item: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Card;
