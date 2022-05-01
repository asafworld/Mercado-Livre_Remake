import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Comment from './Comment';
import Input from './Input';
import priceFormat from '../services/priceFormat';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      productInfo: {},
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
    this.setState({ productInfo: response, attributes: response.attributes });
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
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
      productInfo, attributes, commentEmail, comment, comments, rate, sum } = this.state;
    const rates = [{ n: '1' }, { n: '2' }, { n: '3' }, { n: '4' }, { n: '5' }];
    return (
      <section>
        <Header sum={ sum } />
        <div key={ productInfo.title }>
          <p data-testid="product-detail-name">{ productInfo.title }</p>
          <img src={ productInfo.thumbnail } alt={ productInfo.name } />
          <p>{ priceFormat(productInfo.price) }</p>
        </div>
        { attributes.map((att, index) => (
          <p key={ index }>{ `${att.name}:: ${att.value_name}` }</p>
        )) }
        <p>{ `Estoque: ${productInfo.available_quantity}` }</p>
        <button
          type="button"
          onClick={ () => this.addToCart(productInfo) }
          data-testid="product-detail-add-to-cart"
          disabled={ this.exist(productInfo) }
        >
          <i className="fa-solid fa-cart-plus" />
        </button>
        <form action="get">
          <Input
            type="email"
            name="commentEmail"
            id="commentEmail"
            value={ commentEmail }
            onInputChange={ this.onInputChange }
            datatest="product-detail-email"
            labelText="Email"
          />
          {rates.map((e) => (
            <Input
              key={ e.n }
              type="radio"
              name="rate"
              id={ e.n }
              value={ e.n }
              onInputChange={ this.onInputChange }
              datatest={ `${e.n}-rating` }
              labelText={ e.n }
            />
          ))}
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
            onClick={ () => this.addComment(productInfo.id) }
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
