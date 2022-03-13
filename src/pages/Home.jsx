import React from 'react';
import { Link } from 'react-router-dom';
import SearchProduct from '../components/SearchProduct';
import imgcart from './imgcart.png';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <main className="container-geral">
        <header className="container-button-cart">
          <span className="title">
            <strong>trybe</strong>
            shopping
          </span>
          <Link to="/cart" data-testid="shopping-cart-button" className="img-cart">
            <img src={ imgcart } alt="imagem shopping cart" width="35px" />
          </Link>
        </header>
        <div data-testid="home-initial-message">
          <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        </div>
        <div className="container-search-input">
          <SearchProduct />
        </div>
      </main>
    );
  }
}

export default Home;
