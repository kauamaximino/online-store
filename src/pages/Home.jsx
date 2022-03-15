import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import imgcart from './imgcart.png';
import './Home.css';

class Home extends React.Component {
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
    // this.handleAddButton = this.handleAddButton.bind(this);
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
    const { inputSearch, dataCardResult, dataCategories } = this.state;
    const { productsId, handleChange } = this.props;

    return (
      <main className="container-geral">
        <header className="container-button-cart">
          <span className="title">
            <strong>trybe</strong>
            shopping
          </span>
          <Link
            to="/cart"
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
          <form className="container-form-search">
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
                    <div
                      className="container-product-card"
                      id={ element.id }
                      key={ element.id }
                    >
                      <ProductCard
                        id={ element.id }
                        title={ element.title }
                        thumbnail={ element.thumbnail }
                        price={ element.price }
                        dataCardResult={ dataCardResult }
                        // handleChange={ handleChange }
                      />
                      <Link
                        to={ `/productdetails/${element.id}` }
                        data-testid="product-detail-link"
                      >
                        <img src="https://icons.veryicon.com/png/o/education-technology/smart-campus-1/view-details-2.png" alt="imagem icon return" width="20px" />
                        <p>Detalhes do produto</p>
                      </Link>
                      <button
                        data-testid="product-add-to-cart"
                        className="button-add-qtd"
                        type="button"
                        onClick={ handleChange }

                      >
                        {' '}
                        +
                        {' '}

                      </button>
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

Home.propTypes = {
  productsId: PropType.string,
  handleChange: PropType.func,
}.isRequired;

export default Home;
