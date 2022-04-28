import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      productInfo: {},
      attributes: [],
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getTheProduct();
  }

  addToCart = (id) => {
    const items = localStorage.getItem('addedProductsIds');
    let array = JSON.parse(items);
    const equalId = array.filter((item) => item.id === id);
    if (equalId.length > 0) {
      console.log('exist');
      const newArray = array.find((item) => item.id === id);
      array = array.filter((item) => item.id !== id);
      localStorage.setItem('addedProductsIds', JSON.stringify([...array, {
        id,
        qntd: newArray.qntd + 1,
      }]));
    } else {
      localStorage.setItem('addedProductsIds', JSON.stringify([...array, {
        id,
        qntd: 1,
      }]));
    }
  }

  getTheProduct = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const response = await request.json();
    console.log(response);
    this.setState({ productInfo: response, attributes: response.attributes });
  }

  render() {
    const { productInfo, attributes } = this.state;
    console.log(productInfo);
    console.log(attributes);
    return (
      <section>
        <Header />
        <div key={ productInfo.title }>
          <p data-testid="product-detail-name">{ productInfo.title }</p>
          <img src={ productInfo.thumbnail } alt={ productInfo.name } />
          <p>{ productInfo.price }</p>
        </div>
        { attributes.map((att, index) => (
          <p key={ index }>{ `${att.name}:: ${att.value_name}` }</p>
        )) }
        <button
          type="button"
          onClick={ () => this.addToCart(productInfo.id) }
          data-testid="product-detail-add-to-cart"
        >
          <i className="fa-solid fa-cart-plus" />
        </button>
      </section>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default ProductDetail;

// {id: 'MLB2122615231', site_id: 'MLB', title: 'Máquina De Solda Inverter Trato Tin130 Verde 60hz 220v', subtitle: null, seller_id: 324677383, …}
// accepts_mercadopago: true
// attributes: (30) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

// 0:
// attribute_group_id: ""
// attribute_group_name: ""
// id: "SOLDERING_MACHINE_WEIGHT"
// name: "Peso da maquina solda"
// value_id: null
// value_name: "2.5 kg"
// value_struct: {number: 2.5, unit: 'kg'}
// values: [{…}]
// [[Prototype]]: Object

// automatic_relist: false
// available_quantity: 150
// base_price: 350.9
// buying_mode: "buy_it_now"
// catalog_listing: true
// catalog_product_id: "MLB15290884"
// category_id: "MLB261436"
// channels: ['marketplace']
// condition: "new"
// coverage_areas: []
// currency_id: "BRL"
// date_created: "2021-12-23T15:26:50.000Z"
// deal_ids: (7) ['MLB3976', 'MLB8268', 'MLB6079', 'MLB6265', 'MLB8545', 'MLB8315', 'MLB8503']
// descriptions: []
// differential_pricing: null
// domain_id: "MLB-WELDING_MACHINES"
// health: null
// id: "MLB2122615231"
// initial_quantity: 1710
// international_delivery_mode: "none"
// last_updated: "2022-04-27T20:14:01.623Z"
// listing_source: ""
// listing_type_id: "gold_special"
// location: {}
// non_mercado_pago_payment_methods: []
// official_store_id: null
// original_price: 373
// parent_item_id: null
// permalink: "https://produto.mercadolivre.com.br/MLB-2122615231-maquina-de-solda-inverter-trato-tin130-verde-60hz-220v-_JM"
// pictures: (2) [{…}, {…}]
// price: 350.9
// sale_terms: (2) [{…}, {…}]
// secure_thumbnail: "https://http2.mlstatic.com/D_769882-MLA40532293040_012020-I.jpg"
// seller_address: {city: {…}, state: {…}, country: {…}, search_location: {…}, id: 1206641813}
// seller_contact: null
// seller_id: 324677383
// shipping: {mode: 'me2', free_methods: Array(1), tags: Array(1), dimensions: null, local_pick_up: false, …}
// site_id: "MLB"
// sold_quantity: 500
// start_time: "2021-12-23T15:26:50.000Z"
// status: "active"
// stop_time: "2041-12-18T04:00:00.000Z"
// sub_status: []
// subtitle: null
// tags: (7) ['good_quality_picture', 'good_quality_thumbnail', 'loyalty_discount_eligible', 'brand_verified', 'deal_of_the_day', 'immediate_payment', 'cart_eligible']
// thumbnail: "http://http2.mlstatic.com/D_769882-MLA40532293040_012020-I.jpg"
// thumbnail_id: "769882-MLA40532293040_012020"
// title: "Máquina De Solda Inverter Trato Tin130 Verde 60hz 220v"
// variations: []
// video_id: null
// warnings: []
// warranty: "Garantia de fábrica: 3 meses"
// [[Prototype]]: Object
