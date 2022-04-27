import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { item: { title, thumbnail, price } } = this.props;
    return (
      <section
        data-testid="product"
      >
        <p>{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
      </section>
    );
  }
}

Card.propTypes = {
  item: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Card;
