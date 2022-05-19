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
      background-color: #f7f7f7;
    `
const Image = styled.image`
      border-radius: 100px;
    `
const StyleImage = styled.img`
      border-radius: 15px;
      margin-left: 120px;
    `

export default function Guide(){

    return(
        <>
            <GuideWrap>
                <div>
                    <StyleImage src='/image/manual.png' alt="키보드" />
                </div>
            </GuideWrap>
        </>
    )
}