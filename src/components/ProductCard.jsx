import React, { Component } from 'react';
import PropType from 'prop-types';
import './ProductCard.css';

export default class ProductCard extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div className="product-card" data-testid="product">
        <h5 className="title-product-card">{title}</h5>
        <div className="img-product-card">
          <img src={ thumbnail } alt={ title } />
        </div>
        <p className="price-product-card">{`R$ ${price}`}</p>
        <div className="container-add-remove-card">
          <button className="button-add-qtd" type="button"> + </button>
          <input className="input-qtd-cart" />
          <button className="button-add-qtd" type="button"> - </button>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropType.string.isRequired,
  thumbnail: PropType.string.isRequired,
  price: PropType.number.isRequired,
};
