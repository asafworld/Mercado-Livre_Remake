import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Comment from './Comment';

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
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getTheProduct();
    const { match: { params: { id } } } = this.props;
    const key = `comments-${id}`;
    const atual = localStorage.getItem(key);
    if (atual !== null) {
      const atualParse = JSON.parse(atual);
      this.setState({ comments: atualParse });
      console.log('ok');
    }
  }

  addToCart = (id, itemProp) => {
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
        obj: itemProp,
      }]));
    }
  }

  getTheProduct = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const response = await request.json();
    console.log(response);
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

  render() {
    const { productInfo, attributes, commentEmail, comment, comments, rate } = this.state;
    return (
      <section>
        <Header />
        <div key={ productInfo.title }>
          <p data-testid="product-detail-name">{ productInfo.title }</p>
          <img src={ productInfo.thumbnail } alt={ productInfo.name } />
          <p>{ productInfo.price }</p>
        </div>
        { attributes.map((att, index) => (
          <p key={ index }>{ `${att.name}:: ${att.value_name}` }</p>
        )) }
        <button
          type="button"
          onClick={ () => this.addToCart(productInfo.id, productInfo) }
          data-testid="product-detail-add-to-cart"
        >
          <i className="fa-solid fa-cart-plus" />
        </button>
        <form action="get">
          <label htmlFor="comment-email">
            <input
              type="email"
              id="comment-email"
              name="commentEmail"
              value={ commentEmail }
              onChange={ this.onInputChange }
              data-testid="product-detail-email"
            />
          </label>
          <label htmlFor="1">
            <input
              type="radio"
              name="rate"
              id="1"
              value={ 1 }
              onChange={ this.onInputChange }
              data-testid="1-rating"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              type="radio"
              name="rate"
              id="2"
              value={ 2 }
              onChange={ this.onInputChange }
              data-testid="2-rating"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              type="radio"
              name="rate"
              id="3"
              value={ 3 }
              onChange={ this.onInputChange }
              data-testid="3-rating"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              type="radio"
              name="rate"
              id="4"
              value={ 4 }
              onChange={ this.onInputChange }
              data-testid="4-rating"
            />
            4
          </label>
          <label htmlFor="5">
            <input
              type="radio"
              name="rate"
              id="5"
              value={ 5 }
              onChange={ this.onInputChange }
              data-testid="5-rating"
            />
            5
          </label>
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
