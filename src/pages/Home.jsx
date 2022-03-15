/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery, getCategories, getItem } from '../services/api';
import imgcart from './imgcart.png';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
      dataCardResult: '',
      dataCategories: [],
      productsId: [],
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeButton = this.handleChangeButton.bind(this);
    this.requestCategories = this.requestCategories.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
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

  async handleAddButton({ target }) {
    console.log(target.id);
    const { thumbnail, id, price, title } = await getItem(target.id);
    const obj = { thumbnail, id, price, title };
    this.setState((prev) => ({ productsId: [...prev.productsId, obj] }));
  }

  async requestCategories() {
    const response = await getCategories();
    this.setState({ dataCategories: response });
  }

  render() {
    const { inputSearch, dataCardResult, dataCategories, productsId } = this.state;
    return (
      <main className="container-geral">

        <header className="container-button-cart">
          <span className="title">
            <strong>trybe</strong>
            shopping
          </span>
          <Link
            to={ { pathname: '/cart', productsId } }
            // data-testid="shopping-cart-button"
            className="img-cart"
          >
            <img src={ imgcart } alt="imagem shopping cart" width="35px" />
            <p data-testid="shopping-cart-button">{ productsId.length }</p>
          </Link>
        </header>

        <div data-testid="home-initial-message">
          <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        </div>

        <div className="container-search-input">
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
                    <div className="container-product-card" key={ element.id }>
                      <ProductCard
                        id={ element.id }
                        title={ element.title }
                        thumbnail={ element.thumbnail }
                        price={ element.price }
                        handleAddButton={ this.handleAddButton }
                      />
                      <Link
                        to={ `/productdetails/${element.id}` }
                        data-testid="product-detail-link"
                      >
                        <img src="https://icons.veryicon.com/png/o/education-technology/smart-campus-1/view-details-2.png" alt="imagem icon return" width="20px" />
                        <p>Detalhes do produto</p>
                      </Link>
                    </div>))
                  : <p className="message-not-found">Nenhum produto foi encontrado</p>
              }
            </div>
          </div>
        </div>

      </main>
    );
  }
}

export default Home;
