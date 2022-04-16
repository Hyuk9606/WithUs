import React from 'react'
import Navbar from '../../component/navbar';
import styled from 'styled-components';
import test from '../../video/test.mp4'

const MainContainer = styled.div`
  margin-top: 76px ;
`
const BgVideo = styled.video`
  
`


export default function Main() {
  return (
    <>
      <MainContainer>
        <video
          autoPlay
          muted
          loop
          width="100%"
        >
          <source src={test} type='video/mp4'/>
        </video>
      </MainContainer>
      <Navbar />
    </>
  )
}
