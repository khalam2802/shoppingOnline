import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { Button, Input, Space} from 'antd';

class Menu extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="cursor-pointer p-[15px] space-x-2 uppercase transition-all hover:text-orange-500 relative after:w-0 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-orange-500 after:transition-all after:hover:w-full"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="shadow">
        <div className="container-80 flex justify-between items-center py-5">
        <div className="logo">
          <Link to={'/home'}>
            <img src="https://phono-demo.myshopify.com/cdn/shop/files/logo.png?v=1620470788&width=250" alt="" />
          </Link>
        </div>
        <div className="float-left flex items-center">
          <ul className="menu">
            <li className="menu">
              <Link to={'/home'}>Home</Link>
            </li>
          </ul>
          <ul className='flex'>
          {cates} 
          </ul>
        </div>
        <div className="float-right">
        <form action="">
          <Space direction="vertical" size="middle">
            <Space.Compact style={{ width: '100%' }}>
              <Input value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }}/>
              <Button onClick={(e) => this.btnSearchClick(e)}  htmlType='submit' className='bg-blue-500 hover:text-black'>Search</Button>
            </Space.Compact>
          </Space>
        </form>
        </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);