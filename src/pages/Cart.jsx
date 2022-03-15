import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import iconReturn from './iconReturn.svg';

export default class Cart extends Component {
  componentDidUpdate() {
    const { productsId } = this.props;
    console.log(productsId.filter((ele, prox) => productsId.indexOf(ele) === prox));
  }

  render() {
    const { productsId, handleDelete, buttonDecrease, buttonIncrease,
      quantity } = this.props;
    return (
      <div>
        <Link to="/" className="img-cart">
          <img src={ iconReturn } alt="imagem shopping cart" width="50px" />
        </Link>
        {productsId.length > 0
          ? productsId.filter((ele, prox) => productsId.indexOf(ele) === prox).map((element) => (
            <div key={ element.id }>
              <h5
                data-testid="shopping-cart-product-name"
                className="title-product-card"
              >
                {element.title}
              </h5>
              <img
                className="img-product-card"
                src={ element.thumbnail }
                alt={ element.title }
              />
              <p className="price-product-card">{`R$ ${element.price}`}</p>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                {`Quantidade: 
                ${productsId.filter((item) => item.id === element.id).length}`}
              </p>
              <p>{`Valor total: ${(quantity * element.price).toFixed(2)}`}</p>
              <button id={ element.id } type="button" onClick={ buttonIncrease }>Increase</button>
              <button type="button" onClick={ buttonDecrease }>Decrease</button>
              <button
                type="button"
                id={ element.id }
                onClick={ handleDelete }
              >
                Remove
              </button>
            </div>
          ))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p> }
      </div>
    );
  }
}

Cart.propTypes = ({
  location: PropTypes.shape({
    productsId: PropTypes.string,
  }),
  quantity: PropTypes.string,
}).isRequired;
