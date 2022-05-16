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
                    <div style={{fontSize : "35px" }}>w,s,d,a : 이동</div > <br />
                    <div style={{fontSize : "35px" }}>spacebar : 점프</div > <br />
                    <div style={{fontSize : "35px" }}>t : 마이크 켜기/끄기</div > <br />
                    <div style={{fontSize : "35px" }}>e : 상호작용 & PDF 렌더링</div >
                    <div style={{fontSize : "35px" }}>p, o, y : PDF 다음페이지, 이전페이지, 렌더링종료</div > <br />
                </div>
            </GuideWrap>
        </>
    )
}