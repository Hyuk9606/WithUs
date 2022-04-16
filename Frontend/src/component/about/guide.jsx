import React from "react";
import styled from 'styled-components';

export default function Guide(){

    const GuideWrap = styled.div`
      width: 100%;
      height: 100vh;
      display: block;
      text-align: center;
    `

    return(
        <>
            <GuideWrap>
                <img src={require("../../img/키보드.PNG")} alt="키보드" />
                <h1>w,s,d,a : 이동</h1> <br />
                <h1>spacebar : 점프</h1> <br />
                <h1>마우스좌클릭, e : 상호작용</h1>
            </GuideWrap>
        </>
    )
}