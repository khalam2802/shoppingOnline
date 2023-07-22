import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import { Button, Checkbox, Form, Input, message } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    return (
      <div className="container-80 h-full flex-col items-center justify-center">
          <div className="rounded shadow-2xl  px-[20px] py-[50px]">
          <h2 className="text-center mb-[20px] font-bold text-[25px]">CLIENT LOGIN</h2>
          <Form
          className='mx-auto'
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              value={this.state.txtPassword}
              onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button className='bg-blue-500' type="primary" htmlType="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)}  >
                LOGIN
              </Button>
            </Form.Item>
          </Form>
          </div>
      </div>
    );
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      message.error(`Please input Username and Password!`)
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
        message.success('Đăng nhập thành công!')
      } else {
        message.error('Đăng nhập thất bại!')
      }
    });
  }
}
export default withRouter(Login);