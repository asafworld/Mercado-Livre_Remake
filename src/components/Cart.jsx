import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      addedId: [],
      products: [],
    };
  }

  componentDidMount = () => {
    const itemsId = localStorage.getItem('addedProductsIds');
    const ids = JSON.parse(itemsId);
    this.setState({ addedId: ids });
    console.log(ids);
    ids.forEach((e) => {
      this.getProducts(e.id);
    });
  }

  getProducts = async (e) => {
    const request = await fetch(`https://api.mercadolibre.com/items/${e}`);
    const response = await request.json();
    console.log(response);
    this.setState((prev) => ({ products: [...prev.products, response] }));
  }

  render() {
    const { addedId, products } = this.state;
    console.log(products);
    return (
      <>
        <header>
          <Link to="/">
            Home
          </Link>
        </header>
        { addedId.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p> : (
            products.map((prod, index) => (
              <div key={ index }>
                <p data-testid="shopping-cart-product-name">{ prod.title }</p>
                <img src={ prod.thumbnail } alt={ prod.title } />
                <p>{ prod.price }</p>
                <p data-testid="shopping-cart-product-quantity">
                  { addedId[index].qntd }
                </p>
              </div>
            ))
          ) }
      </>
    );
  }
}

export default Cart;
