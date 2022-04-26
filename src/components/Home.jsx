import React from 'react';
import Card from './Card';
import Categories from './Categories';
import Header from './Header';

class Home extends React.Component {
  render() {
    return (
      <>
        <Header />
        <section>
          <Categories />
          <Card />
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        </section>
      </>
    );
  }
}

export default Home;
