import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Comment from './Comment';
import Input from './Input';
import priceFormat from '../services/priceFormat';
import './ProductDetail.css';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {},
      attributes: [],
      commentEmail: '',
      rate: 0,
      comment: '',
      comments: [],
      sum: 0,
    };
  }

  componentDidMount() {
    this.getTheProduct();
    const { match: { params: { id } } } = this.props;
    const key = `comments-${id}`;
    const atual = localStorage.getItem(key);
    if (atual !== null) {
      const atualParse = JSON.parse(atual);
      this.setState({ comments: atualParse });
    }
    const getProducts = localStorage.getItem('addedProductsIds');
    this.sum(JSON.parse(getProducts));
  }

  addToCart = (item) => {
    const items = localStorage.getItem('addedProductsIds');
    const array = JSON.parse(items);
    console.log(array);
    const existEqual = array.some((e) => e.id === item.id);
    if (!existEqual) {
      const all = {
        ...item,
        qntd: 1,
      };
      localStorage.setItem('addedProductsIds', JSON.stringify([...array, all]));
      this.sum([...array, all]);
    } else {
      const same = array.find((e) => e.id === item.id);
      array.forEach((e) => {
        if (e.id === same.id) {
          e.qntd += 1;
        }
      });
      localStorage.setItem('addedProductsIds', JSON.stringify(array));
      this.sum(array);
    }
  }

  getTheProduct = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const response = await request.json();
    this.setState({ item: response, attributes: response.attributes });
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    if (target.name === 'rate') {
      const e = document.querySelectorAll('.rate-label');
      for (let i = 0; i < target.value; i += 1) {
        e[i].firstChild.textContent = '★';
      }
      for (let i = e.length - 1; i >= target.value; i -= 1) {
        e[i].firstChild.textContent = '☆';
      }
    }
  }

  addComment = (id) => {
    const key = `comments-${id}`;
    const atual = localStorage.getItem(key);
    const { commentEmail, rate, comment } = this.state;
    const objComment = {
      commentEmail,
      rate,
      comment,
    };
    if (atual === null) {
      localStorage.setItem(key, JSON.stringify([objComment]));
    } else {
      const atualParse = JSON.parse(atual);
      localStorage.setItem(key, JSON.stringify([...atualParse, objComment]));
    }
    this.setState((prev) => (
      { comments: [...prev.comments, objComment],
        commentEmail: '',
        rate: 0,
        comment: '' }
    ));
  }

  sum = (items) => {
    let sum = 0;
    items.forEach((e) => {
      sum += e.qntd;
    });
    this.setState({ sum });
  }

  exist = (item) => {
    const getProducts = localStorage.getItem('addedProductsIds');
    const products = JSON.parse(getProducts);
    const same = products.find((e) => e.id === item.id);
    if (same !== undefined) {
      return same.qntd === item.available_quantity;
    }
    return false;
  }

  render() {
    const {
      item, attributes, commentEmail, comment, comments, rate, sum } = this.state;
    const rates = [{ n: '1' }, { n: '2' }, { n: '3' }, { n: '4' }, { n: '5' }];
    return (
      <section>
        <Header sum={ sum } />
        <section key={ item.id } className="card-container-detail">
          <section
            data-testid="product"
            className="card"
          >
            <img className="img-card" src={ item.thumbnail } alt={ item.title } />
            <div className="product-info">
              <p
                data-testid="product-detail-name"
                className="name-card"
              >
                { item.title }
              </p>
              <p className="price-card">{ priceFormat(item.price)}</p>
              <p
                className="stock-card"
              >
                { `Estoque: ${item.available_quantity}` }
              </p>
            </div>
          </section>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addToCart(item) }
            disabled={ this.exist(item) }
            className="add-to-cart-detail"
          >
            <i className="las la-cart-plus" />
          </button>
        </section>
        { attributes.map((att, index) => (
          <p key={ index }>{ `${att.name}:: ${att.value_name}` }</p>
        )) }
        <p>{ `Estoque: ${item.available_quantity}` }</p>
        <form action="get" className="comment-form">
          <Input
            type="email"
            name="commentEmail"
            id="commentEmail"
            value={ commentEmail }
            onInputChange={ this.onInputChange }
            datatest="product-detail-email"
            labelText="Email"
          />
          <div className="rate">
            {rates.map((e) => (
              <Input
                key={ e.n }
                type="radio"
                name="rate"
                id={ e.n }
                value={ e.n }
                onInputChange={ this.onInputChange }
                datatest={ `${e.n}-rating` }
                labelText="☆"
                className="rate-input"
                labelClass="rate-label"
              />
            ))}
          </div>
          <label htmlFor="comment">
            <textarea
              id="comment"
              name="comment"
              onChange={ this.onInputChange }
              value={ comment }
              data-testid="product-detail-evaluation"
            />
          </label>
          <button
            type="button"
            onClick={ () => this.addComment(item.id) }
            data-testid="submit-review-btn"
            disabled={ rate === 0 || commentEmail.length === 0 }
          >
            Enviar
          </button>
        </form>
        {comments.map((e, i) => (
          <Comment
            key={ i }
            commentEmail={ e.commentEmail }
            rate={ e.rate }
            comment={ e.comment }
          />
        ))}
      </section>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default ProductDetail;
