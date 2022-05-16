import React from "react";
import styled from 'styled-components';

const Wrap = styled.div`
      width: 100%;
      height: 100vh;
      justify-content: center;
      text-align: center;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      background-color: #f7f7f7;
    `

export default function PreviewCharacter(){

    return(
        <>
            <Wrap>
                <img src="/image/character.png" style={{width : '600px', marginRight : '50px', height: "40vh"}}/>
                <div>
                    <div style={{fontSize:'40px'}}>나만의 캐릭터를</div> <br />
                    <div style={{fontSize:'40px'}}>만들어보세요!</div>
                </div>
            </Wrap>
        </>
    )
}