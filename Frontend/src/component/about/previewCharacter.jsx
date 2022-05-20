import React from "react";
import styled from 'styled-components';
import characterVideo from '../../video/characterCustom.mp4'

const Wrap = styled.div`
      width: 100%;
      height: 100vh;
      justify-content: center;
      text-align: center;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
    `

export default function PreviewCharacter(){

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
                    <source src={characterVideo} type='video/mp4'/>
                </video>
                <div>
                    <div style={{fontSize:'40px', marginLeft: "60px"}}>나만의 캐릭터를</div> <br />
                    <div style={{fontSize:'40px', marginLeft: "60px"}}>만들어보세요!</div>
                </div>
            </Wrap>
        </>
    )
}