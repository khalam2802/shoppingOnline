import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Typography, message } from 'antd';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    return (
      <div className='flex-row mt-10 xl:mt-0'>
        <div className="text-center mb-5"><Typography className='text-[20px] font-bold'>PRODUCT DETAIL</Typography></div>
        <form className='flex-row space-y-2 justify-center'>
          <div className="flex text-center items-center">
            <label className='text-gray-700 text-sm font-bold mb-2 w-20 text-left' htmlFor="id">ID</label>
            <input  type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} className='w-full lg:w-80 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'/>
          </div>
          <div className="flex text-center items-center">
            <label className='text-gray-700 text-sm font-bold mb-2 w-20 text-left' htmlFor="id">Name</label>
            <input  type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }}  className='w-full lg:w-80 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'/>
          </div>
          <div className="flex text-center items-center">
            <label className='text-gray-700 text-sm font-bold mb-2 w-20 text-left' htmlFor="id">Price</label>
            <input  type="text" value={this.state.txtPrice} onChange={(e) => { this.setState({ txtPrice: e.target.value }) }} className='w-full lg:w-80 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'/>
          </div>
          <div className="flex text-center items-center">
            <label className='text-gray-700 text-sm font-bold mb-2 w-20 text-left' htmlFor="id">Image</label>
            <input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} className='w-full lg:w-80 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'/>
          </div>
          <div className="flex text-center items-center">
            <label className='text-gray-700 text-sm font-bold mb-2 w-20 text-left' htmlFor="id">Category</label>
            <select className='w-full lg:w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded py-2 px-3  leading-tight focus:shadow-outline' onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}>{cates}</select>
          </div>
          <div className="flex mt-1 text-black justify-end">
            <button className='px-3 py-2 bg-[#f18634] rounded font-bold text-[12px]' type='submit' onClick={(e) => this.btnAddClick(e)}>ADD NEW</button>
            <button className='px-3 py-2 bg-[#f18634] mx-5 rounded font-bold text-[12px]'  type='submit' onClick={(e) => this.btnUpdateClick(e)}>UPDATE</button>
            <button className='px-3 py-2 bg-[#f18634] rounded font-bold text-[12px]' type='submit' onClick={(e) => this.btnDeleteClick(e)}>DELETE</button>
          </div>
        </form>
      </div>
    );
  }// event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      message.error('Please input name and price and category and image')
    }
  }
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        message.error('Please input ID')
      }
    }
  }
  // apis
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        message.success('OK BABY!')
        this.apiGetProducts();
      } else {
        message.error('SORRY BABY!')
      }
    });
  }
  // apis
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        message.success('OK BABY!')
        this.apiGetProducts();
      } else {
        message.error('SORRY BABY!')
      }
    });
  }
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages);
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages);
      } else {
        axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages);
        });
      }
    });  
  }
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (id && name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPutProduct(id, prod);
    } else {
      message.error('Please input id and name and price and category and image')
    }
  }
  // apis
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        message.success('OK BABY!')
        this.apiGetProducts();
      } else {
        message.error('SORRY BABY!')
      }
    });
}

  componentDidMount() {
    this.apiGetCategories();
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }
  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default ProductDetail;