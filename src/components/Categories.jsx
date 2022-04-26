import React from 'react';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount = async () => {
    const newFetch = await getCategories();
    this.setState({ categories: newFetch });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <form>
          { categories.map((categorie) => (
            <button
              key={ categorie.name }
              type="button"
              data-testid="category"
            >
              { categorie.name }
            </button>
          ))}
        </form>
      </div>
    );
  }
}

export default Categories;
