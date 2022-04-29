import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      addedId: [],
      products: [],
      orderedProducts: [],
    };
  }

  componentDidMount = async () => {
    const itemsId = localStorage.getItem('addedProductsIds');
    const ids = JSON.parse(itemsId);
    const finalProd = [];
    this.setState({ addedId: ids });
    await ids.forEach(async (e) => {
      finalProd.push(e.obj);
    });
    this.setState({ orderedProducts: finalProd });
  }

  getQntd = (id) => {
    const { addedId } = this.state;
    const item = addedId.find((e) => e.id === id);
    return item.qntd;
  }

  plusOne = (id) => {
    const items = localStorage.getItem('addedProductsIds');
    const array = JSON.parse(items);
    const equalId = array.filter((item) => item.id === id);
    if (equalId.length > 0) {
      array.forEach((item, index) => {
        if (item.id === id) {
          const { qntd } = item;
          array[index].qntd = (qntd + 1);
        }
      });
      localStorage.setItem('addedProductsIds', JSON.stringify(array));
      this.setState({ addedId: array });
    }
  }

  minusOne = (id) => {
    const items = localStorage.getItem('addedProductsIds');
    const array = JSON.parse(items);
    const equalId = array.filter((item) => item.id === id);
    if (equalId.length > 0) {
      console.log('exist');
      array.forEach((item, index) => {
        if (item.id === id) {
          const { qntd } = item;
          array[index].qntd = (qntd - 1);
          if (qntd > 1) {
            localStorage.setItem('addedProductsIds', JSON.stringify(array));
            this.setState({ addedId: array });
          }
        }
      });
    }
  }

  removeItem = (id) => {
    const { orderedProducts } = this.state;
    const items = localStorage.getItem('addedProductsIds');
    const array = JSON.parse(items);
    const differentId = array.filter((item) => item.id !== id);
    const newProducts = orderedProducts.filter((element) => element.id !== id);
    localStorage.setItem('addedProductsIds', JSON.stringify(differentId));
    this.setState({
      addedId: differentId,
      products: newProducts,
      orderedProducts: newProducts });
  }

  existUndefined = (array) => {
    const exist = array.some((e) => e === undefined);
    return exist;
  }

  render() {
    const { addedId, products, orderedProducts } = this.state;
    console.log(products);
    console.log(orderedProducts);
    return (
      <>
        <header>
          <Link to="/">
            Home
          </Link>
        </header>
        { orderedProducts.length > 0
          && orderedProducts.length === addedId.length
          && !this.existUndefined(orderedProducts)
          ? (
            <section>
              {orderedProducts.map((prod, index) => (
                <div key={ index }>
                  <button
                    type="button"
                    onClick={ () => this.removeItem(prod.id) }
                  >
                    x
                  </button>
                  <img src={ prod.thumbnail } alt={ prod.title } />
                  <p data-testid="shopping-cart-product-name">{ prod.title }</p>
                  <button
                    type="button"
                    onClick={ () => this.minusOne(prod.id) }
                    data-testid="product-decrease-quantity"
                  >
                    -
                    <p data-testid="shopping-cart-product-quantity">
                      { this.getQntd(prod.id) }
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.plusOne(prod.id) }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                  <p>{ prod.price * this.getQntd(prod.id) }</p>
                </div>))}
            </section>
          )
          : (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>
          ) }
        <Link to="/checkout" data-testid="checkout-products">
          Finalizar Compra
        </Link>
      </>
    );
  }
}

export default Cart;
