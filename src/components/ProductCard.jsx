import React, { Component } from 'react';
import PropType from 'prop-types';
import './ProductCard.css';

export default class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      addItem: 0,
    };
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
  }

  componentDidMount = () => {

  }

  handleAddButton() {
    this.setState((prevState) => ({ addItem: prevState.addItem + 1 }), () => {
      // const { addItem } = this.state;
      // localStorage.setItem('qtdProductsCart', addItem);
    });
  }

  handleRemoveButton() {
    this.setState((prevState) => ({
      addItem: prevState.addItem === 0 ? 0 : prevState.addItem - 1,
    }));
  }

  render() {
    const { title, thumbnail, price } = this.props;
    const { addItem } = this.state;
    return (
      <div className="product-card" data-testid="product">
        <h5 className="title-product-card">{title}</h5>
        <div className="img-product-card">
          <img src={ thumbnail } alt={ title } />
        </div>
        <p className="price-product-card">{`R$ ${price}`}</p>
        <div className="container-add-remove-card">
          <button
            data-testid="product-add-to-cart"
            className="button-add-qtd"
            type="button"
            onClick={ this.handleAddButton }
          >
            {' '}
            +
            {' '}

          </button>
          <p className="input-qtd-cart">{addItem}</p>
          <button
            className="button-remove-qtd"
            type="button"
            onClick={ this.handleRemoveButton }
          >
            {' '}
            -
            {' '}

          </button>
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
