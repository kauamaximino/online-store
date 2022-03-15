import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './App.css';
import ProductDetails from './pages/ProductDetails';
import { getItem } from './services/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsId: [],
      // quantity: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete({ target }) {
    const { productsId } = this.state;
    const test = productsId.filter((element) => element.id !== target.id);
    this.setState({
      productsId: test,
    });
  }

  async handleChange({ target }) {
    const { id } = target.parentNode;
    const { thumbnail, price, title } = await getItem(id);
    const obj = { thumbnail, id, price, title };
    this.setState((prev) => ({ productsId: [...prev.productsId, obj] }));
  }

  buttonDecrease = () => {
    // this.setState((prevState) => ({
    //   quantity: prevState.quantity === 0 ? 0 : prevState.quantity - 1 }));
  }

  buttonIncrease = async ({ target }) => {
    const { thumbnail, price, title } = await getItem(target.id);
    const obj = { thumbnail, id: target.id, price, title };
    this.setState((prev) => ({ productsId: [...prev.productsId, obj] }));
  }

  render() {
    const { productsId, quantity } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Home
              productsId={ productsId }
              handleChange={ this.handleChange }
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
              handleChange={ this.handleChange }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
