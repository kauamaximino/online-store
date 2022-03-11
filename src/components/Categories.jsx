import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataCategories: [],
    };

    this.requestCategories = this.requestCategories.bind(this);
  }

  componentDidMount() {
    this.requestCategories();
  }

  async requestCategories() {
    const response = await getCategories();
    this.setState({ dataCategories: response });
  }

  render() {
    const { dataCategories } = this.state;
    return (
      <div>
        <ul>
          {dataCategories.map(({ name, id }) => (
            <div key={ id }>
              <li>{ name }</li>
              <label htmlFor="radio-categories" data-testid="category">
                <input name="radio-categories" type="radio" id="radio-categories" />
              </label>
            </div>
          ))}
        </ul>
        {/* {dataCategories.map(({ name, id }) => (
          <button key={ id } type="button" data-testid="category">{ name }</button>
        ))} */}
      </div>
    );
  }
}
