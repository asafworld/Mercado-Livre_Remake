import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <section>
        <p>{ commentEmail }</p>
        <p>{ this.createStars(rate) }</p>
        <p>{ comment }</p>
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
