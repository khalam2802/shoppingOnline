import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import { Typography } from 'antd';
import './product.css'

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr  className="bg-white border-b border-x transition-all hover:dark:bg-orange-200 hover:dark:border-orange-200 hover:dark:text-white text-center" key={item._id} onClick={() => this.trItemClick(item)}>
          <td data-lable='ID' scope="row" class="break-words text-sm md:text-[16px] cursor-pointer px-6 py-3  text-gray-600">
            {item._id}
          </td>
          <td data-lable='Name' className='text-sm md:text-[16px] px-6 py-3 cursor-pointer text-gray-600 shadow lg:shadow-none'>{item.name}</td>
          <td data-lable='Price' className='text-sm md:text-[16px] px-6 py-3 cursor-pointer text-gray-600 shadow lg:shadow-none'>{item.price} <span>$</span></td>
          <td data-lable='Time' className='text-sm md:text-[16px] px-6 py-3 cursor-pointer text-gray-600 shadow lg:shadow-none'>{new Date(item.cdate).toLocaleString()}</td>
          <td data-lable='Category' className='text-sm md:text-[16px] px-6 py-3 cursor-pointer text-gray-600 shadow lg:shadow-none'>{item.category.name}</td>
          <td data-lable='Image' className='text-sm md:text-[16px] px-6 py-3 cursor-pointer text-right shadow lg:shadow-none'>
            <img className='w-[50px] h-[70px] lg:w-full lg:h-[80px] text-right ml-auto' src={"data:image/jpg;base64," + item.image} alt={item.name} />
          </td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<button className='mr-2 w-[30px] h-[30px] rounded-full bg-[#f18634] text-black'><span  key={index}> <b >{index + 1}</b>  </span></button>);
      } else {
        return (<button className='mx-2 transition-all w-[30px] h-[30px] rounded-full hover:bg-[#f18634] hover:text-black hover:font-bold'>
          <span key={index} onClick={() => this.lnkPageClick(index + 1)}> {index + 1} </span>
        </button>);
      }
    });
    return (
      <div className='container-xl py-[40px] flex-row xl:justify-between xl:flex space-x-3'>
        <div className="">
        <div className="text-center mb-5"><Typography className='text-[20px] font-bold font-montserrat'>PRODUCT LIST</Typography></div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table" border="1">
            <thead className="text-xs uppercase bg-[#f18634] text-black">
                <tr className='text-center'>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Creation date</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Image</th>
                </tr>
              </thead>
            <tbody id='tbodyCustumer'>
              {prods}
              {/* <tr className='flex justify-center items-center' >   
              </tr> */}
            </tbody>
          </table>
          <Typography className='active-bar text-center p-0 lg:pt-3'>{pagination}</Typography>
        </div>
        <div/>
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts}/>
        <div className="float-clear" />
      </div>
    );
  }
  updateProducts = (products, noPages) => { // arrow-function
    this.setState({ products: products, noPages: noPages });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;