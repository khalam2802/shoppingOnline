import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
import { Card, Row, Col, Typography, Button } from 'antd';

const { Meta } = Card;
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <Col span={6} key={item._id} >
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img src={"data:image/jpg;base64," + item.image} className='w-full h-[250px] object-cover'alt={item.name} />}
          >
            <Meta className='text-left h-full pt-1 text-[#d70018]' title={item.name}/>
            <div className="flex items-end space-x-2 mt-2">
              <Typography className='text-[#d70018] font-bold text-[18px] leading-[1.1]'>{item.price + '$'}</Typography>
              <Typography className='line-through text-[#707070] font-bold text-sm'>{(item.price * 1.3).toFixed(3) + '$'}</Typography>
            </div>
            <Button className='border-orange-500 text-orange-500 w-full mt-3'><Link to={'/product/' + item._id}>View Detail</Link></Button>
          </Card>
          {/* <figure>
            <Link to={'/product/' + item._id}>
              <img
                src={"data:image/jpg;base64," + item.image}
                width="300px"
                height="300px"
                alt=""
              />
            </Link>
            <figcaption className="text-center">
              {item.name}
              <br />
              Price: {item.price}
            </figcaption>
          </figure> */}
        </Col>
      );
    });
    return (
      <div className="px-8 py-0 container-80">
        <div className="text-center">
        <div className="pb-7"> <Typography className='font-bold text-[#444] text-3xl'>LIST PRODUCT</Typography></div>
        <Row>
          {prods}
        </Row>
      </div>
      </div>
    );
  }
  componentDidMount() {
    // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) {
    // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByKeyword(keyword) {
    axios.get("/api/customer/products/search/" + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get("/api/customer/products/category/" + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}
export default withRouter(Product);
