import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  componentDidMount() {
    if (localStorage.getItem('addedProductsIds') === null) {
      const array = JSON.stringify([]);
      localStorage.setItem('addedProductsIds', array);
    }
  }

  addToCart = (id) => {
    const items = localStorage.getItem('addedProductsIds');
    let array = JSON.parse(items);
    const equalId = array.filter((item) => item.id === id);
    if (equalId.length > 0) {
      console.log('exist');
      const newArray = array.find((item) => item.id === id);
      array = array.filter((item) => item.id !== id);
      localStorage.setItem('addedProductsIds', JSON.stringify([...array, {
        id,
        qntd: newArray.qntd + 1,
      }]));
    } else {
      localStorage.setItem('addedProductsIds', JSON.stringify([...array, {
        id,
        qntd: 1,
      }]));
    }
  }

  render() {
    const { item: { title, thumbnail, price, id } } = this.props;
    return (
      <article>
        <Link to={ `/productDetail/${id}` } data-testid="product-detail-link">
          <section
            data-testid="product"
          >
            <p data-testid="product-detail-name">{ title }</p>
            <img src={ thumbnail } alt={ title } />
            <p>{ price }</p>
          </section>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => this.addToCart(id) }
        >
          <i className="fa-solid fa-cart-plus" />
        </button>
      </article>
    );
  }
}

Card.propTypes = {
  item: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Card;
