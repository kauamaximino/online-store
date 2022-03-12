import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItem } from '../services/api';
import ProductCard from './ProductCard';

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
      <div>
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
