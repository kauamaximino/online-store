import React, { Component } from 'react';

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

  renderItems() {
    const { location: { productsId } } = this.props;
    console.log(productsId);
    this.setState({ requestResult: productsId });
  }

  render() {
    const { requestResult, quantity } = this.state;
    return (
      <div>
        {requestResult
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
              <p>{`Quantidade: ${quantity}`}</p>
              <p>{`Valor total: ${(quantity * element.price).toFixed(2)}`}</p>
              <button type="button" onClick={ this.buttonIncrease }>Increase</button>
              <button type="button" onClick={ this.buttonDecrease }>Decrease</button>
            </div>
          ))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p> }
        {requestResult
          && (
            <p
              data-testid="shopping-cart-product-quantity"
            >
              {`Quantidade de produtos: ${requestResult.length}`}
            </p>)}
      </div>
    );
  }
}
