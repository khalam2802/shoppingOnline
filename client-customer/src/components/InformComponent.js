import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="container-80 flex justify-end space-x-2 py-5 items-center">
        <div className="">
          {this.context.token === "" ? (
            <div className="flex space-x-2">
              <Button className="border-orange-500 text-orange-500">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="border-blue-500 text-blue-500">
                <Link to="/signup">Sign-up</Link>
              </Button>
              <Button className="border-none">
                <Link to="/active">Active</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <b>{this.context.customer.name}</b> <span>|</span>
              <Link to="/home" onClick={() => this.lnkLogoutClick()}>
                Logout
              </Link>
              <span>|</span><Link to="/myprofile">My profile</Link> <span>|</span>
              <div className="">
                <Link to="/mycart" className="text-2xl relative">
                  <ShoppingCartOutlined />
                  <b className="text-red-500 text-sm absolute bottom-[-10px] right-[-5px] z-10">
                    {this.context.mycart.length}
                  </b>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;
