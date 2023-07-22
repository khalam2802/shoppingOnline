import React, { Component, useState } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import { Button, Menu as Nav} from 'antd';
import { AppstoreOutlined, HomeOutlined , SettingOutlined, IdcardOutlined, ShoppingCartOutlined } from '@ant-design/icons';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const items = [
      {
        label: <Link to='/admin/home'>Home</Link>,
        key: 'mail',
        icon: <HomeOutlined />,
      },
      {
        label: <Link to='/admin/category'>Category</Link>,
        key: 'app',
        icon: <AppstoreOutlined />,
      },
      {
        label: <Link to='/admin/product'>Product</Link>,
        key: 'SubMenu',
        icon: <SettingOutlined />,
      }
      ,
      {
        label: <Link to='/admin/order'>Order</Link>,
        key: 'Order',
        icon: <ShoppingCartOutlined />,
      }
      ,
      {
        label: <Link to='/admin/customer'>Customer</Link>,
        key: 'Customer',
        icon: <IdcardOutlined />,
      }
    ];
    return (
      <div className=" bg-[#2e3a47]"> 
       <div className="flex items-center justify-between mx-[10%]">
       <div className="float-left w-70">
          <ul className="p-[10px] nav-bar text-white">
            <Nav className=" bg-[#2e3a47] text-white" mode="horizontal" items={items} />
          </ul>
        </div>
        <div className="flex-col md:flex-row p-[10px] text-white w-30 text-center">
          <b className='hidden md:inline-block md:mr-5'>{this.context.username}</b> 
          <Button className='border-[#f18634] text-white'><Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link></Button>
        </div>
       </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;