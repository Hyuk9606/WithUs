import React from "react";
import styled from 'styled-components';
import pdfVideo from '../../video/pdf.mp4'
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

export default function PreviewPDF(){

    return(
        <>
            <Wrap>
                <div>
                    <div style={{fontSize:'40px', marginLeft: "60px"}}>다른 사람들에게</div> <br />
                    <div style={{fontSize:'40px', marginLeft: "60px"}}>발표할 수 있어요!</div>
                </div>
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
                    <source src={pdfVideo} type='video/mp4'/>
                </video>
            </Wrap>
        </>
    )
}