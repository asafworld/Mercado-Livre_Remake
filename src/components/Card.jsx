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
    const array = JSON.parse(items);
    const equalId = array.filter((item) => item.id === id);
    if (equalId.length > 0) {
      console.log('exist');
      array.forEach((item, index) => {
        if (item.id === id) {
          const { qntd } = item;
          array[index].qntd = (qntd + 1);
        }
      });
      console.log(array);
      localStorage.setItem('addedProductsIds', JSON.stringify(array));
    } else {
      localStorage.setItem('addedProductsIds', JSON.stringify([...array, {
        id,
        qntd: 1,
      }]));
    }
  }

  // let newQntd;
  // const newArr = array.map((item) => {
  //   if(item.id === id) {
  //     newQntd = item.qntd +1
  //   }
  // })

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
          Add to cart
        </button>
      </article>
    );
  }
}

Card.propTypes = {
  item: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Card;
