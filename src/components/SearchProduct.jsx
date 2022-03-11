import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

export default class SearchProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
      dataCardResult: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  async handleButton() {
    const { inputSearch } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(false, inputSearch);

    this.setState({
      dataCardResult: results,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { inputSearch, dataCardResult } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="inputSearch">
            <input
              data-testid="query-input"
              name="inputSearch"
              id="inputSearch"
              value={ inputSearch }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.handleButton }
          >
            Buscar
          </button>
        </form>
        {
          dataCardResult.length
            ? dataCardResult.map((element) => (
              <ProductCard key={ element.id } { ...element } />))
            : <p>Nenhum produto foi encontrado</p>
        }
      </div>
    );
  }
}
