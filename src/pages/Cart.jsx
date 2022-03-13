import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import iconReturn from './iconReturn.svg';

export default class Cart extends Component {
  render() {
    console.log(requestResult);
    return (
      <div>
        <Link to="/" className="img-cart">
          <img src={ iconReturn } alt="imagem shopping cart" width="50px" />
        </Link>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        {/* <h5 data-testid="product-detail-name">{ requestResult.title }</h5> */}
      </div>
    );
  }
}
