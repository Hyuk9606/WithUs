import React from "react";
import styled from 'styled-components';

const GuideWrap = styled.div`
      width: 100%;
      height: 100vh;
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      align-items: center;
      justify-content: center;
    `
const Image = styled.image`
      border-radius: 100px;
    `
const StyleImage = styled.img`
      border-radius: 15px;
    `

export default function Guide(){

    return(
        <>
            <GuideWrap>
                <div>
                    <StyleImage src={require("../../img/키보드.PNG")} alt="키보드" />
                </div>
                <div>
                    <h1>w,s,d,a : 이동</h1> <br />
                    <h1>spacebar : 점프</h1> <br />
                    <h1>마우스좌클릭, e : 상호작용</h1>
                </div>
            </GuideWrap>
        </>
    )
}