import React, { Component } from 'react';
import PropType from 'prop-types';
import './ProductCard.css';

export default class ProductCard extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div className="container-product-card" data-testid="product">
        <h5 className="title-product-card">{title}</h5>
        <img className="img-product-card" src={ thumbnail } alt={ title } />
        <p className="price-product-card">{`R$ ${price}`}</p>
        {/* <Link to={ `/productdetails/${id}` }>
          <button type="button">Detalhes do produto</button>
        </Link> */}
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropType.string.isRequired,
  // id: PropType.string.isRequired,
  thumbnail: PropType.string.isRequired,
  price: PropType.number.isRequired,
};
