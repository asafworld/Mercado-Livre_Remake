import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <section>
        <form>
          <label htmlFor="search-input">
            <input
              type="text"
              id="search-input"
            />
          </label>
        </form>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      </section>
    );
  }
}

export default Home;
