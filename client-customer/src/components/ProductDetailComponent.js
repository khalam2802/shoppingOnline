import axios from "axios";
import React, { Component } from "react";
import withRouter from "../utils/withRouter";
import MyContext from "../contexts/MyContext";
import { Card,  Button, Checkbox, Form, Input, Typography, message } from 'antd';
const { Meta } = Card;

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className=" bg-liner container-80 px-20 py-10 rounded-xl">
          <div className="flex space-x-12">
            <Card
              hoverable
              style={{ width: 300 }}
              cover={<img
                src={"data:image/jpg;base64," + prod.image}
                alt="hinh"
                className="object-cover"
              />}
              >
              <div className="flex items-center pt-5 pl-5 space-x-3 justify-start font-bold">
                <Typography className='text-[#d70018] font-bold text-[18px] leading-[1.1]'>{(prod.price).toFixed(3) + '$'}</Typography>
                <Typography className='line-through text-[#707070] font-bold text-sm'>{(prod.price * 1.3).toFixed(3) + '$'}</Typography>
              </div>
            </Card>
              <form>
                <div className="flex-row space-y-8">
                  <Typography  className="text-3xl text-red-400 font-bold">{prod.name}</Typography>
                  <div>
                    <ul className="text-white list-disc">
                            <li className="mt-1 text-sm">Powerful flat design - Durable metal processing, modern, luxurious style.</li>
                            <li className="mt-1 text-sm">The 6.67-inch screen and AMOLED panels provide a beautiful visual display space.</li>
                            <li className="mt-1 text-sm">Snapdragon® 732G processor combined with Adreno 618 graphics chip for smooth gameplay.</li>
                            <li className="mt-1 text-sm">Unleash your passion for photography with a 3-camera system with a main lens of up to 50 MP.</li>
                            <li className="mt-1 text-sm">5000 mAh capacity battery for all-day operation at basic tasks.</li>
                      </ul>
                  </div>
                  <div>
                    <span  className="text-left text-white mr-3">Quantity:</span>
                        <Input className="w-[30%]"
                          type="number"
                          min="1"
                          max="99"
                          value={this.state.txtQuantity}
                          onChange={(e) => {
                            this.setState({ txtQuantity: e.target.value });
                          }}>
                          </Input>
                  </div>
                  <Button
                    className="bg-[#39045d] text-white font-bold transition-all duration-500 hover:text-[#d70018] hover:bg-[#4c055c]"
                    type="submit"
                    value="ADD TO CART"
                    onClick={(e) => this.btnAdd2CartClick(e)}
                    >ADD TO CARD
                  </Button>
                </div>
              </form>
          </div>
        </div>
      );
    }
    return <div />;
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    axios.get("/api/customer/products/" + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      message.success(`Thêm thành công!`)
    } else {
      alert('Please input quantity');
    }
  }
}
export default withRouter(ProductDetail);
