import axios from 'axios';
import React, { Component } from 'react';
import { message, Typography } from 'antd'

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="flex justify-center">
      <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="pb-7 text-center"> <Typography className='font-bold text-[#444] text-3xl'>LIST PRODUCT</Typography></div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            ID
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }}  />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Token
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)}>
            ACTIVE
          </button>
        </div>
      </form>
    </div>
     </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        message.success('ACTIVE SUCCESSFULLY!');
      } else {
        message.success('ACTIVE FAILED!');
      }
    });
  }
}
export default Active;