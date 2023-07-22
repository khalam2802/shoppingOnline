import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button, Typography } from 'antd';
const { Meta } = Card;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <Col span={6}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img src={"data:image/jpg;base64," + item.image} className='w-full h-[250px] object-cover'alt={item.name} />}
          >
            <Meta className='text-left h-full pt-1 text-[#d70018]' title={item.name}/>
            <div className="flex items-end space-x-2 mt-2">
              <Typography className='text-[#d70018] font-bold text-[18px] leading-[1.1]'>{(item.price).toFixed(3) + '$'}</Typography>
            </div>
            <Button className='border-orange-500 text-orange-500 w-full mt-3'><Link to={'/product/' + item._id}>View Detail</Link></Button>
          </Card>
        </Col>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <Col span={6}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img src={"data:image/jpg;base64," + item.image} className='w-full h-[250px] object-cover'alt={item.name} />}
          >
            <Meta className='text-left h-full pt-1 text-[#d70018]' title={item.name}/>
            <div className="flex items-end space-x-2 mt-2">
              <Typography className='text-[#d70018] font-bold text-[18px] leading-[1.1]'>{item.price + '$'}</Typography>
              <Typography className='line-through text-[#707070] font-bold text-sm'>{(item.price * 1.3).toFixed(3) + '$'}</Typography>
            </div>
            <Button className='border-orange-500 text-orange-500 w-full mt-3'><Link to={'/product/' + item._id}>View Detail</Link></Button>
          </Card>
        </Col>
      );
    });
    return (
      <div>
        {this.state.hotprods.length > 0 ?
          <div className='container-80'>
           <div className="p-5 bg-liner rounded-xl">
            <div className="mb-3"> <img className='object-cover  mx-auto' src="./hot-sale-use-for-home-page.png" alt="" /></div>
            <Row>
              {hotprods}
            </Row>
          </div>
          </div>
          : <div />}
        <div className="container-80 pt-10">
          <div className="rounded-sm">
            <div className="mb-6"> <Typography className='font-bold text-[#444] text-3xl'>Outstanding Product</Typography></div>
            <Row>
              {newprods}
            </Row>
          </div>
        </div>
        
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;