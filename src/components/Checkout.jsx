import React, { Component } from 'react';
import Header from './Header';
import Input from './Input';
import priceFormat from '../services/priceFormat';

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
        <main>
          <section>
            <p>Revise seus produtos</p>
            {products.map((e, i) => (
              <section key={ i }>
                <img src={ e.thumbnail } alt={ e.title } />
                <p>{ e.title }</p>
                <p>{ e.qntd }</p>
                <p>{ priceFormat(e.price * e.qntd) }</p>
              </section>
            ))}
            <p>
              Total:
              {' '}
              <span>{ priceFormat(totalPrice) }</span>
            </p>
          </section>
          <section>
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
