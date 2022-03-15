import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './App.css';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsId: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange({ target }) {
    this.setState((prev) => ({ productsId: [...prev.productsId, target.parentNode.id] }));
  }

  render() {
    const { productsId } = this.state;
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
              handleChange={ this.handleChange }
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
