import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItem } from '../services/api';
import ProductCard from '../components/ProductCard';
import imgcart from './imgcart.png';
import iconReturn from './iconReturn.svg';
import './ProductDetails.css';

const three = 3;
const four = 4;
const five = 5;
export default class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      requestResult: [],
      details: [],
      email: '',
      stars: [1, 2, three, four, five],
      description: '',
      evaluation: [],
      radioStars: 0,
    };
    this.request = this.request.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.GetItemStorage = this.GetItemStorage.bind(this);
  }

  componentDidMount() {
    this.request();
    this.GetItemStorage();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  sendEvaluation = () => {
    // event.preventDefault();
    const { email, description, radioStars } = this.state;
    const obj = { email, radioStars, description };
    const getSavedEvaluation = JSON.parse(localStorage.getItem('evaluationList'));
    if (getSavedEvaluation) {
      localStorage.setItem('evaluationList', JSON.stringify(
        [...getSavedEvaluation, obj],
      ));
    } else {
      localStorage.setItem('evaluationList', JSON.stringify([obj]));
    }
    this.setState({
      email: '',
      radioStars: 0,
      description: '',
    });
    this.GetItemStorage();
  }

  GetItemStorage() {
    const evaluation = JSON.parse(localStorage.getItem('evaluationList'));
    this.setState({ evaluation });
  }

  async request() {
    const { match: { params: { id } } } = this.props;
    const response = await getItem(id);
    this.setState({
      requestResult: response,
      details: response.attributes,
    });
  }

  render() {
    const { requestResult, details, email, stars, description, evaluation } = this.state;
    const { match: { params: { id } }, handleToCart } = this.props;
    return (
      <div className="container-product-details">
        <div className="container-link-return-cart">
          <Link to="/" className="img-cart">
            <img src={ iconReturn } alt="imagem shopping cart" width="50px" />
          </Link>
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
            className="img-cart"
          >
            <img src={ imgcart } alt="imagem icon return" width="50px" />
          </Link>
        </div>
        <div id={ id }>
          <ProductCard { ...requestResult } />
          <button
            data-testid="product-detail-add-to-cart"
            className="button-add-qtd"
            type="button"
            onClick={ handleToCart }

          >
            {' '}
            +
            {' '}

          </button>
        </div>
        <div>
          <h5 data-testid="product-detail-name">{ requestResult.title }</h5>
          {details.map((element, index) => (
            <div key={ index }>
              <p>{ `${element.name}: ${element.value_name}` }</p>
            </div>))}
        </div>
        <div>
          <form>
            <input
              data-testid="product-detail-email"
              className="product-detail-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />

            {stars.map((index) => (
              <div key={ index }>
                <label htmlFor={ index } data-testid={ `${index}-rating` }>
                  <input
                    className="input-radio"
                    value={ index }
                    name="radioStars"
                    type="radio"
                    id={ index }
                    onChange={ this.handleChange }
                  />
                  {index}
                </label>
              </div>
            ))}

            <div>
              <textarea
                data-testid="product-detail-evaluation"
                className="edit-input-description"
                name="description"
                id="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
              />
            </div>
            <button
              data-testid="submit-review-btn"
              className="edit-button-save"
              type="button"
              name="buttonSaveEdit"
              id="edit-button-save"
              onClick={ this.sendEvaluation }
            >
              Editar perfil
            </button>

          </form>
        </div>
        <div>
          {evaluation ? evaluation.map((element, index) => (
            <div key={ index }>
              <p>{element.email}</p>
              <p>{element.radioStars}</p>
              <p>{element.description}</p>

            </div>
          )) : <p className="message-not-found-evaluation">Produto sem avaliação</p>}
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = ({ // aprendido em https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}).isRequired;
