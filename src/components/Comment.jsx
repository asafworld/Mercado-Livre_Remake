import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

class Comment extends Component {
  createStars = (rate) => {
    const star = '★';
    const emptyStar = '☆';
    const maxRate = 5;
    let starRate = '';
    for (let i = 0; i < rate; i += 1) {
      starRate += star;
    }
    for (let i = 0; i < (maxRate - rate); i += 1) {
      starRate += emptyStar;
    }
    return starRate;
  }

  render() {
    const { commentEmail, comment, rate } = this.props;
    const quote = '"';
    return (
      <section className="comment-container">
        <p className="rate-email">{ commentEmail }</p>
        <p className="rate-star star-avaliation">{ this.createStars(rate) }</p>
        <p className="rate-comment">
          {comment.length > 0 && <span>{quote}</span>}
          { comment }
          {comment.length > 0 && <span>{quote}</span>}
        </p>
      </section>
    );
  }
}

Comment.propTypes = {
  commentEmail: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
};

export default Comment;
