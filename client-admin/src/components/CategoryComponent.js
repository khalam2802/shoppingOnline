import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import { Typography } from 'antd';

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr className="bg-white text-center border-b transition-all hover:dark:bg-orange-200 hover:dark:border-orange-200 hover:dark:text-white" key={item._id} onClick={() => this.trItemClick(item)}>
          <td className='sm:text-[10px] md:text-[16px] px-6 py-4 cursor-pointer text-gray-600'>{item._id}</td>
          <td scope="row" class="break-words cursor-pointer px-6 py-4 text-gray-600 whitespace-nowrap">
            {item.name}
          </td>
        </tr>
      );
    });
    return (
      <div className='container-xl flex-row space-y-5 lg:flex lg:justify-between lg:gap-5 lg:py-[40px]'>
      <div className="w-full">
        <div className="text-center mt-5 lg:mt-0 mb-5"><Typography className='text-[20px] font-bold'>CATEGORY LIST</Typography></div>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" border="1">
            <thead className="text-xs uppercase bg-[#f18634] text-black">
              <tr className='text-center'>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Name</th>
              </tr>
            </thead>
            <tbody>
              {cates}
            </tbody>
          </table>
      </div>
      <div />
        <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
      </div>
    );
}
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
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
export default Category;