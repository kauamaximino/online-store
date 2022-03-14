import React, { Component } from 'react';
import { getItem } from '../services/api';
import ProductCard from '../components/ProductCard';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      requestResult: [],
    };
    this.request = this.request.bind(this);
    this.get = this.get.bind(this);
  }

  componentDidMount() {
    this.get();
  }

  async request(element) {
    const response = await getItem(element);
    this.setState((oldElement) => ({
      requestResult: [...oldElement.requestResult, response],
    }));
    // console.log(this.state.requestResult);
  }

  get() {
    const items = Object.keys(localStorage);
    items.forEach(this.request);
  }

  render() {
    const { requestResult } = this.state;
    return (
      <div>
        {requestResult.map((element) => (
          <div key={ element.id }>
            <ProductCard { ...element } />
          </div>
        )) }
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </div>
    );
  }
}
