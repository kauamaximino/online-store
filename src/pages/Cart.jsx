import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import iconReturn from './iconReturn.svg';
import { getItem } from '../services/api';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      requestResult: [],
      quantity: 1,
    };
    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    this.renderItems();
  }

  buttonDecrease = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
  }

  buttonIncrease = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  }

  async renderItems() {
    const { productsId } = this.props;
    productsId.map(async (element) => {
      const { thumbnail, id, price, title } = await getItem(element);
      const obj = { thumbnail, id, price, title };
      this.setState((prev) => ({ requestResult: [...prev.requestResult, obj] }));
    });
  }

  render() {
    const { requestResult, quantity } = this.state;
    return (
      <div>
        <Link to="/" className="img-cart">
          <img src={ iconReturn } alt="imagem shopping cart" width="50px" />
        </Link>
        {requestResult.length > 0
          ? requestResult.map((element) => (
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
                {`Quantidade: ${quantity}`}

              </p>
              <p>{`Valor total: ${(quantity * element.price).toFixed(2)}`}</p>
              <button type="button" onClick={ this.buttonIncrease }>Increase</button>
              <button type="button" onClick={ this.buttonDecrease }>Decrease</button>
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
}).isRequired;
