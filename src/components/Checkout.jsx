import React, { Component } from 'react';
import Input from './Input';

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
    };
  }

  componentDidMount() {
    const getProducts = localStorage.getItem('addedProductsIds');
    const products = JSON.parse(getProducts);
    this.setState({ products });
    let total = 0;
    products.forEach((e) => {
      total += (e.obj.price * e.qntd);
    });
    this.setState({ totalPrice: total });
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { products, totalPrice, name, email, cpf, phone, cep, address } = this.state;
    return (
      <main>
        <section>
          <p>Revise seus produtos</p>
          {products.map((e, i) => (
            <section key={ i }>
              <img src={ e.obj.thumbnail } alt={ e.obj.title } />
              <p>{ e.obj.title }</p>
              <p>{ e.qntd }</p>
              <p>{ e.obj.price * e.qntd }</p>
            </section>
          ))}
          <p>
            Total:
            {' '}
            <span>{ totalPrice }</span>
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
              labelText="Telefone: "
            />
            <Input
              name="address"
              type="address"
              value={ address }
              id="checkout-address"
              onInputChange={ this.onInputChange }
              datatest="checkout-address"
              labelText="Telefone: "
            />
          </form>
        </section>
      </main>
    );
  }
}

export default Checkout;
