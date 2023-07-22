import React, { Component } from 'react';
import bgAnimate from './bg_animate.json'
import Lottie from "lottie-react";
class Home extends Component {
  render() {
    return (
      <div className="align-center h-80 py-20 md:h-full  block lg:flex items-center">
        <div className=" sm:w-[35%] mx-auto lg:w-[40%]">
        <Lottie  animationData={bgAnimate} loop={true} />
        </div>
        <div className="w-[80%] mx-auto lg:w-[60%] font-lilita"><h2 className="text-center font-bold text-4xl sm:text-6xl">WELLCOME TO ADMIN PAGE</h2></div>
      </div>
    );
  }
}
export default Home;