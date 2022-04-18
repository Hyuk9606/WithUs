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
                    <VideoWrap autoPlay muted loop >
                        <source src="media/testVideo.mp4" type="video/mp4" />
                    </VideoWrap>
                </div>
                <div>
                    <Text>
                        <h1>메타몽?</h1>
                        <h3>Unity를 사용한 메타버스 환경</h3>
                        <h3>발표, 토론, 회의를 할 수 있는 기능</h3>
                    </Text>
                </div>
            </Wrap>
        </>
    )
}