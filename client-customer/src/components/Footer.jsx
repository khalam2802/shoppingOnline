import { Col, Row, Typography, Button, Input,  Space  } from 'antd'
import React from 'react'

export default function Footer() {
  return (
    <div className='pt-20'>
      <div className="bg-[#2e3a47]">
      <div className="container-80 py-8">
        <Row gutter={52} className='flex items-center'>
          <Col span={13}>
            <Typography className='text-[white] font-bold text-xl'>SIGN UP FOR INFORMATION</Typography>
            <Typography  className='text-[white] text-sm mt-2'>Register now to receive the earliest updates of useful information, extremely attractive offers, and surprise gifts from <span className='text-red-500 font-bold'>PHONO</span></Typography>
          </Col>
          <Col className='items-center' span={11}>
            <Space className='w-full' direction="vertical" size="middle">
              <Space.Compact className='flex items-center'>
                <Input className='p-2' placeholder='Enter your email!'/>
                <Button value='SignUp' className='bg-red-500 border-none p-5 flex items-center uppercase'>register</Button>
              </Space.Compact>
            </Space>
          </Col>
        </Row>
      </div>
      </div>
      <div className="bg-[#2e3a47] border-t-[1px] border-t-gray-500">
      <div className="container-80 py-8">
        <Row gutter={[32]} className=''>
          <Col span={9}>
            <Typography className='uppercase text-[18px] text-white'>PHONO.VN - Authentic </Typography>
            <div >
              <Typography className='text-white mt-2'>
                Phone.vn is oriented to become the leading e-commerce system selling genuine phones in Vietnam.
              </Typography>
              <Typography className='text-white my-2'>Showroom: 224 Nguyen Van Luong, Go Vap, Ho Chi Minh</Typography>
              <Typography className='text-white'>Hotline: 0973711568</Typography>
            </div>
          </Col>
          <Col span={5}>
            <Typography className='uppercase text-[18px] text-white'>About Us</Typography>
            <ul className='flex-row space-y-1 text-white mt-1'>
              <li>Introduce</li>
              <li>Terms of use</li>
              <li>Privacy Policy</li>
              <li>News PHONE</li>
              <li>Job Opportunity</li>
              <li>Contact</li>
            </ul>
          </Col>
          <Col span={5}>
          <Typography className='uppercase text-[18px] text-white'>Client</Typography>
            <ul className='flex-row space-y-1 text-white mt-1'>
              <li>Shopping guide</li>
              <li>return policy</li>
              <li>Warranty Policy</li>
              <li>Loyal customer</li>
              <li>Promotions</li>
            </ul>
          </Col>
          <Col span={5}>
          <Typography className='uppercase text-[18px] text-white'>Certifications</Typography> 
          <div className="mt-2">
            <div className="w-[130px] h-[70px]">
              <img className='object-cover w-full' src="./logo-bct.png" alt="" />
            </div>
            <div className="w-[150px] h-[100px]">
              <img className='object-cover w-full' src="./dmca_copyright_protected150c.png" alt="" />
            </div>
          </div>
          </Col>
        </Row>
      </div>
      </div>
    </div>
  )
}
