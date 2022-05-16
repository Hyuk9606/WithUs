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

    `

export default function PreviewPDF(){

    return(
        <>
            <Wrap>
                <div>
                    <div style={{fontSize:'40px'}}>다른 사람들에게</div> <br />
                    <div style={{fontSize:'40px'}}>발표할 수 있어요!</div>
                </div>
                <img src="/image/PDF.png" style={{width : '600px', marginLeft : '70px', height: "40vh"}}/>
            </Wrap>
        </>
    )
}