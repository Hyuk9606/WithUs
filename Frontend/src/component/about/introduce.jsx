import React from "react";
import styled from 'styled-components';

export default function Introduce(){

    const VideoWrap = styled.div`
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    `
    const Text = styled.div`
      text-align: center;

    `

    return(
        <>
            <VideoWrap>
                <video
                    src="media/testVideo.mp4"
                    width="800" height="1000" autoplay="autoplay" muted="muted" loop="loop">
                </video>
                <Text>
                    <h1>메타몽?</h1>
                    <h3>Unity를 사용한 메타버스 환경</h3>
                    <h3>발표, 토론, 회의를 할 수 있는 기능</h3>
                </Text>
            </VideoWrap>
        </>
    )
}