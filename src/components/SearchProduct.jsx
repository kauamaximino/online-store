import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class SearchProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  async handleButton() {
    const { inputSearch } = this.state;
    const response = await getProductsFromCategoryAndQuery(inputSearch);
    console.log(response);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { inputSearch } = this.state;
    return (
      <form>
        <label htmlFor="inputSearch">
          <input
            name="inputSearch"
            id="inputSearch"
            value={ inputSearch }
            onChange={ this.handleChange }
          />
        </label>
        <button type="button" onClick={ this.handleButton }>Buscar</button>
      </form>
    );
  }
}
