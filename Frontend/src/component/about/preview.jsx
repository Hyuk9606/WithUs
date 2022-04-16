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

export default function Preview(){

    return(
        <>
            <Wrap>
                <div>
                    <h2>WithUs에서</h2> <br />
                    <h2>체험해보세요</h2>
                </div>
            </Wrap>
        </>
    )
}