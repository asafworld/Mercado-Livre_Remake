import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Input from './Input';
import priceFormat from '../services/priceFormat';
import './Checkout.css';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      totalPrice: 0,
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      sum: 0,
    };
  }

  componentDidMount() {
    const getProducts = localStorage.getItem('addedProductsIds');
    const products = JSON.parse(getProducts);
    this.setState({ products });
    let total = 0;
    products.forEach((e) => {
      total += (e.price * e.qntd);
    });
    this.setState({ totalPrice: total });
    this.sum(products);
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  sum = (items) => {
    let sum = 0;
    items.forEach((e) => {
      sum += e.qntd;
    });
    this.setState({ sum });
  }

  render() {
    const { products, totalPrice,
      name, email, cpf, phone, cep, address, sum } = this.state;
    return (
      <>
        <Header sum={ sum } />
        <h3 className="checkout-title ">Revise seus produtos</h3>
        <main className="checkout">
          <section className="checkout-products">
            {products.map((item) => (
              <section key={ item.id } className="card-container">
                <section
                  data-testid="product"
                  className="card"
                >
                  <img className="img-card" src={ item.thumbnail } alt={ item.title } />
                  <div className="product-info">
                    <Link to={ `/product/${item.id}` }>
                      <p
                        data-testid="shopping-cart-product-name"
                        className="name-card"
                      >
                        { item.title }
                      </p>
                    </Link>
                    <p
                      className="price-card"
                    >
                      { priceFormat((item.price * item.qntd))}
                    </p>
                    { item.shipping.free_shipping && (
                      <p data-testid="free-shipping" className="free">
                        <i className="fa-solid fa-truck-fast" />
                        {' Frete Grátis'}
                      </p>
                    ) }
                    <div className="control-cart">
                      <p
                        data-testid="shopping-cart-product-quantity"
                        className="shopping-cart-product-quantity"
                      >
                        { item.qntd }

                      </p>

                    </div>
                  </div>
                </section>
              </section>
            ))}
          </section>
          <p>
            Total:
            {' '}
            <span>{ priceFormat(totalPrice) }</span>
          </p>
          <section className="form-checkout">
            <p>Informações pessoais</p>
            <form action="get">
              <Input
                name="name"
                type="text"
                value={ name }
                id="checkout-fullname"
                onInputChange={ this.onInputChange }
                datatest="checkout-fullname"
                labelText="Nome Completo: "
              />
              <Input
                name="email"
                type="email"
                value={ email }
                id="checkout-email"
                onInputChange={ this.onInputChange }
                datatest="checkout-email"
                labelText="Email: "
              />
              <Input
                name="cpf"
                type="cpf"
                value={ cpf }
                id="checkout-cpf"
                onInputChange={ this.onInputChange }
                datatest="checkout-cpf"
                labelText="CPF: "
              />
              <Input
                name="phone"
                type="phone"
                value={ phone }
                id="checkout-phone"
                onInputChange={ this.onInputChange }
                datatest="checkout-phone"
                labelText="Telefone: "
              />
              <Input
                name="cep"
                type="cep"
                value={ cep }
                id="checkout-cep"
                onInputChange={ this.onInputChange }
                datatest="checkout-cep"
                labelText="CEP: "
              />
              <Input
                name="address"
                type="address"
                value={ address }
                id="checkout-address"
                onInputChange={ this.onInputChange }
                datatest="checkout-address"
                labelText="Endereço: "
              />
            </form>
          </section>
        </main>
      </>
    );
  }
}

export default Checkout;
