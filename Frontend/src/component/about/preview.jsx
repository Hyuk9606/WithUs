import React from "react";
import styled from 'styled-components';

export default function Preview(){

    const Wrap = styled.div`
      width: 100%;
      height: 100vh;
      //justify-content: center;
      text-align: center;
    `

    return(
        <>
            <Wrap>
                <h2>WithUs에서</h2> <br />
                <h2>체험해보세요</h2>
            </Wrap>
        </>
    )
}