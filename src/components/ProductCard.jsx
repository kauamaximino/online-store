import React, { Component } from 'react';
import PropType from 'prop-types';
import './ProductCard.css';

export default class ProductCard extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div className="product-card" data-testid="product">
        <h5
          className="title-product-card"
        >
          {title}

        </h5>
        <div className="img-product-card">
          <img src={ thumbnail } alt={ title } />
        </div>
        <p
          className="price-product-card"
        >
          {`R$ ${price}`}

        </p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropType.string,
  thumbnail: PropType.string,
  price: PropType.number,
}.isRequired;
