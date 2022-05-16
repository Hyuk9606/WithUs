import React from "react";
import styled from 'styled-components';

const Wrap = styled.div`
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;
      background-color: #f7f7f7;
    `
const Text = styled.div`
      text-align: center;
    `
const VideoWrap = styled.video`
      border-radius: 15px;
      width: 800px;
    `

export default function Introduce(){

    return(
        <>
            <Wrap>
                <div>
                    <img src="/image/building.png" style={{width : '550px', marginRight : '50px', marginLeft : '100px', height: "40vh"}} />
                </div>
                <div>
                    <Text>
                        <h1>With US?</h1>
                        <h3>With Us는 발표, 강의, 토론 등 비대면 오피스를 제공하는 메타버스 플랫폼입니다.</h3>
                        <h3>음성채팅, 화이트보드,  PDF 실시간 공유 등의 기능을 제공합니다.</h3>
                    </Text>
                </div>
            </Wrap>
        </>
    )
}