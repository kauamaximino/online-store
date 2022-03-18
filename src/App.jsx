import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './App.css';
import ProductDetails from './pages/ProductDetails';
import { getProductsFromCategoryAndQuery } from './services/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsId: [],
      inputSearch: '',
      dataCardResult: '',
      quantity: 0,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeButton = this.handleChangeButton.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleDelete({ target }) {
    const { productsId } = this.state;
    const test = productsId.filter((element) => element.id !== target.id);
    this.setState({
      productsId: test,
    });
  }

  handleToCart = ({ target }) => {
    const { id } = target.parentNode;
    const { dataCardResult } = this.state;
    const resultFilter = dataCardResult.find((element) => element.id === id);
    resultFilter.quantity = 1;
    this.setState((
      prevState,
    ) => ({ productsId: [...prevState.productsId, resultFilter] }));
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

  buttonIncrease = ({ target: { id } }) => {
    const { productsId } = this.state;
    const resultFilter = productsId.find((element) => element.id === id);
    resultFilter.quantity += 1;
    this.setState((
      prevState,
    ) => ({ productsId: [...prevState.productsId, resultFilter] }));
  }

  buttonDecrease = ({ target: { id } }) => {
    const { productsId } = this.state;
    const resultFilter = productsId.find((element) => element.id === id);
    resultFilter.quantity -= 1;
    this.setState((
      prevState,
    ) => ({ productsId: [...prevState.productsId, resultFilter] }));
  }

  render() {
    const { productsId, quantity, dataCardResult } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Home
              productsId={ productsId }
              handleToCart={ this.handleToCart }
              dataCardResult={ dataCardResult }
              handleChangeRadio={ this.handleChangeRadio }
              handleChangeButton={ this.handleChangeButton }
              handleChangeInput={ this.handleChangeInput }

            />) }
          />

          <Route
            exact
            path="/cart"
            render={ () => (<Cart
              productsId={ productsId }
              quantity={ quantity }
              handleDelete={ this.handleDelete }
              buttonDecrease={ this.buttonDecrease }
              buttonIncrease={ this.buttonIncrease }
            />) }
          />

          <Route
            exact
            path="/productdetails/:id"
            // render={ (props) => <ProductDetails { ...props } />
            // path="/productdetails"
            render={ (props) => (<ProductDetails
              { ...props }
              productsId={ productsId }
              handleToCart={ this.handleToCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
