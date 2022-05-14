import React, {  } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";


const LoadingImg = styled.img`
    width : 500px;
    height : 300px;
    margin : 0 auto 0 auto;
`

export default function LoadingSlider() {
    const settings = {
      fade: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000
    };
    return (
      <div style={{marginTop:'3%', marginBottom: '3%'}}>
        <Slider {...settings}>
          <div>
            <LoadingImg src='/loading.png' />
          </div>
          <div>
            <LoadingImg  src='/logo.png' />
          </div>
          <div>
            <LoadingImg  src='/loading.png' />
          </div>
          <div>
            <LoadingImg  src='/logo2.png' />
          </div>
        </Slider>
      </div>
    );
  }