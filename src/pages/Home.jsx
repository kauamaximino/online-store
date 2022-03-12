import React from 'react';
import { Link } from 'react-router-dom';
import SearchProduct from '../components/SearchProduct';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <main className="container-geral">
        <div className="container-button-cart">
          <Link to="/cart" data-testid="shopping-cart-button">
            <button type="button">
              Ícone Carrinho
            </button>
          </Link>
        </div>
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
