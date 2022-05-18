import React from "react";
import styled from 'styled-components';
import whiteboardVideo from '../../video/whiteboard.mp4'

const Wrap = styled.div`
      width: 100%;
      height: 100vh;
      justify-content: center;
      text-align: center;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
    `

export default function PreviewWhiteBoard(){

    return(
        <>
            <Wrap>
                <video
                    autoPlay
                    muted
                    loop
                    style={{
                        width : '600px', 
                        marginLeft : '70px', 
                        height: "50vh"
                    }}
                >
                    <source src={whiteboardVideo} type='video/mp4'/>
                </video>
                <div>
                    <div style={{fontSize:'40px', marginLeft: "60px"}}>여러분들만의</div> <br />
                    <div style={{fontSize:'40px', marginLeft: "60px"}}>공간을 제공합니다!</div>
                </div>
            </Wrap>
        </>
    )
}