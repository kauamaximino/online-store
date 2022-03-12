import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './App.css';
import ProductDetails from './components/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Cart } />
          <Route
            path="/productdetails/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
