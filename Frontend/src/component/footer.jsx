import React from "react";
import styled from 'styled-components';

const Container = styled.div`
  background-color: #303740;
  position: relative;
  width: 100%;
  height: 100px;
`
const Content = styled.div`
  align-items: center;
  height: 100%;
  color: white;
`
const ContentBox = styled.div`
  padding-top : 5px;
  display: flex;
  justify-content: center;
  height: 60px;
`

const Title = styled.div`
    margin: auto 20px auto 10px;
    font-weight: 600;
    font-size: 30px;
`
const CopyWrite = styled.div`
  display: flex;
  justify-content: center;
`

export default function Footer(){

    return(
            <Container>
                <Content>
                  <ContentBox>
                    <img src="logo2.png" alt="logo" style={{width:"50px", height:"50px", margin:"auto 0 auto 0"}}/>
                    <Title>METAMONG</Title>
                  </ContentBox>
                    <CopyWrite>Copyright @ 2022 METAMONG. All Rights Reserved</CopyWrite>
                </Content>
            </Container>
    )
}