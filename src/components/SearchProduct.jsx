import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import ProductCard from './ProductCard';
import './SearchProduct.css';

export default class SearchProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
      dataCardResult: '',
      dataCategories: [],
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeButton = this.handleChangeButton.bind(this);
    this.requestCategories = this.requestCategories.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
  }

  componentDidMount() {
    this.requestCategories();
  }

  async handleChangeRadio({ target: { value } }) {
    const { results } = await getProductsFromCategoryAndQuery(value, false);
    this.setState({ dataCardResult: results });
  }

  async handleChangeButton() {
    const { inputSearch } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(false, inputSearch);

    this.setState({
      dataCardResult: results,
    });
  }

  handleChangeInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async requestCategories() {
    const response = await getCategories();
    this.setState({ dataCategories: response });
  }

  render() {
    const {
      inputSearch,
      dataCardResult,
      dataCategories } = this.state;
    return (
      <div>
        <div className="container-form-search">
          <form>
            <label htmlFor="inputSearch">
              <input
                data-testid="query-input"
                name="inputSearch"
                id="inputSearch"
                value={ inputSearch }
                onChange={ this.handleChangeInput }
              />
            </label>
            <button
              data-testid="query-button"
              type="button"
              onClick={ this.handleChangeButton }
            >
              Buscar
            </button>
          </form>
        </div>
        <div className="container-categories-productCard">
          <div className="container-radio-categories">
            {dataCategories.map(({ name, id }) => (
              <div className="categories-radio" key={ id }>
                <label htmlFor={ id } data-testid="category">
                  <input
                    className="input-radio"
                    value={ id }
                    name="radio-category"
                    type="radio"
                    id={ id }
                    onChange={ this.handleChangeRadio }
                  />
                  {name}
                </label>
              </div>
            ))}
          </div>
          <div className="container-geral-product-card">
            {
              dataCardResult
                ? dataCardResult.map((element) => (
                  <ProductCard key={ element.id } { ...element } />))
                : <p>Nenhum produto foi encontrado</p>
            }
          </div>
        </div>
      </div>
    );
  }
}
