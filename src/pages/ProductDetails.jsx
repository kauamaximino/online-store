import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItem } from '../services/api';
import ProductCard from '../components/ProductCard';
import imgcart from './imgcart.png';
import iconReturn from './iconReturn.svg';
import './ProductDetails.css';

export default class ProductDetails extends Component {
  constructor() {
    super();

    this.request = this.request.bind(this);

    this.state = {
      requestResult: [],
      details: [],
    };
  }

  componentDidMount() {
    this.request();
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
    const { requestResult, details } = this.state;
    return (
      <div className="container-product-details">
        <div className="container-link-return-cart">
          <Link to="/" className="img-cart">
            <img src={ iconReturn } alt="imagem shopping cart" width="50px" />
          </Link>
          <Link to="/cart" data-testid="shopping-cart-button" className="img-cart">
            <img src={ imgcart } alt="imagem icon return" width="50px" />
          </Link>
        </div>
        <div>
          <ProductCard { ...requestResult } />
        </div>
        <div>
          <h5 data-testid="product-detail-name">{ requestResult.title }</h5>
          {details.map((element, index) => (
            <div key={ index }>
              <p>{ `${element.name}: ${element.value_name}` }</p>
            </div>))}
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
