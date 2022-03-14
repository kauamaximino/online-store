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
    // this.testValor = this.testValor.bind(this);
  }

  componentDidMount() {
    const test = Object.keys(localStorage);
    const getQtdStorage = localStorage.getItem(test);
    if (getQtdStorage === null) {
      localStorage.setItem(test, 1);
    } else {
      localStorage.setItem(test, (parseFloat(getQtdStorage) + 1) - 1);
    }
    this.setState({ addItem: localStorage.getItem(test) });
  }

  handleAddButton(event) {
    const getQtdStorage = localStorage.getItem(event.target.id);
    if (getQtdStorage === null) {
      localStorage.setItem(event.target.id, 1);
    } else {
      localStorage.setItem(event.target.id, parseFloat(getQtdStorage) + 1);
    }
    this.setState({ addItem: localStorage.getItem(event.target.id) });
  }

  handleRemoveButton(event) {
    const getQtdStorage = localStorage.getItem(event.target.id);
    if (getQtdStorage !== null) {
      localStorage.setItem(event.target.id, parseFloat(getQtdStorage) - 1);
    }
    if (getQtdStorage < 2) {
      localStorage.removeItem(event.target.id);
    }
    this.setState({ addItem: localStorage.getItem(event.target.id) });
  }

  // handleAddButton() {
  //   const { id } = this.props;
  //   const { addItem } = this.state;
  //   this.setState((prevState) => ({ addItem: prevState.addItem + 1 }), () => {
  //   });
  //   localStorage.setItem(id, addItem);
  //   console.log(addItem);
  //   // localStorage.clear();
  // }

  // handleRemoveButton() {
  //   const { id } = this.props;
  //   const { addItem } = this.state;
  //   this.setState((prevState) => ({
  //     addItem: prevState.addItem === 0 ? 0 : prevState.addItem - 1,
  //   }));
  //   localStorage.setItem(id, addItem);
  //   console.log(addItem);
  // }

  // testValor(event) {
  // const { id } = this.props;
  // this.setState({ addItem: localStorage.getItem(event.target.id) });
  // }

  // testValor() {
  //   const { id } = this.props;
  //   localStorage.getItem(id);
  // }

  render() {
    const { title, thumbnail, price, id } = this.props;
    const { addItem } = this.state;
    return (
      <div className="product-card" data-testid="product">
        <h5
          data-testid="shopping-cart-product-name"
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
        <div id={ id } className="container-add-remove-card">
          <button
            data-testid="product-add-to-cart"
            className="button-add-qtd"
            type="button"
            onClick={ this.handleAddButton }
            id={ id }
          >
            {' '}
            +
            {' '}

          </button>
          <p
            data-testid="shopping-cart-product-quantity"
            className="input-qtd-cart"
          >
            {addItem}

          </p>
          <button
            className="button-remove-qtd"
            type="button"
            onClick={ this.handleRemoveButton }
            id={ id }
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
  id: PropType.string.isRequired,
};
