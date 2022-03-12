// import React, { Component } from 'react';
// import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
// import ProductCard from './ProductCard';
// import SearchProduct from './SearchProduct';

// export default class Categories extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       dataCategories: [],
//       selectedOptionList: [],
//       getCategoryId: '',
//     };

//     this.requestCategories = this.requestCategories.bind(this);
//     this.handleChangeRadio = this.handleChangeRadio.bind(this);
//   }

//   componentDidMount() {
//     this.requestCategories();
//   }

//   async handleChangeRadio({ target: { value } }) {
//     const { results } = await getProductsFromCategoryAndQuery(value, false);
//     this.setState({ getCategoryId: value, selectedOptionList: results });
//   }

//   async requestCategories() {
//     const response = await getCategories();
//     this.setState({ dataCategories: response });
//   }

//   render() {
//     const { dataCategories, selectedOptionList, getCategoryId } = this.state;
//     return (
//       <div>
//         {dataCategories.map(({ name, id }) => (
//           <div key={ id }>
//             <label htmlFor={ id } data-testid="category">
//               <input
//                 value={ id }
//                 name="radio-category"
//                 type="radio"
//                 id={ id }
//                 onChange={ this.handleChangeRadio }
//               />
//               {name}
//             </label>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }
