import React from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';

class Home extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/cart" data-testid="shopping-cart-button">
          <button type="button">
            Ícone Carrinho
          </button>
        </Link>
        <Categories />
      </div>
    );
  }
}

export default Home;
