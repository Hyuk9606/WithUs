import React from 'react'
import Navbar from '../../component/navbar';
import styled from 'styled-components';
import test from '../../video/test.mp4'
import { useNavigate } from "react-router-dom";
import {useState} from 'react'
import LoginModal from '../../component/loginModal'

const MainContainer = styled.div`
  margin-top: 76px ;
`
const Title = styled.div`
  margin : 15% auto 10% auto;
  text-align: center;
  font-size: 100px;
  background-image: -webkit-linear-gradient(right, #d9a7c7, #fffcdc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: hue 10s infinite linear;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
`

const ButtonBox = styled.div`
  width: 100%;
`

const StartButton = styled.button`
  background-color: #B9F8D3;
  font-size: 50px;
  color: white;
  border: 1px solid #B9F8D3;
  border-radius: 20px;
  margin: auto;
  display: block;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
`

export default function Main() {
  let navigate = useNavigate()
  const [isLogined, setIsLogined] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickbutton = () => {
    if (isLogined === false) {
      setIsModalOpen(true)
    } else {
      navigate('/webgl')
    }
  }
  const ModalClose = () => {
    setIsModalOpen(false);
}
  return (
    <>
      <MainContainer>
        <video
          autoPlay
          muted
          loop
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "50%",
            top: "50%",
            objectFit : "cover",
            transform: "translate(-50%,-50%)",
            zIndex: -1,
          }}
        >
          <source src={test} type='video/mp4'/>
        </video>
        <Title>With Us</Title>
        <ButtonBox>
          <StartButton onClick={() => clickbutton()}>&nbsp;&nbsp;Start&nbsp;&nbsp;</StartButton>
        </ButtonBox>
      </MainContainer>
      <Navbar />
      <style>
        {`@-webkit-keyframes hue {
          from {
            -webkit-filter: hue-rotate(180deg);
          }
          to {
            -webkit-filter: hue-rotate(-180deg);
          }
        }`}
      </style>
      <LoginModal isModalOpen={isModalOpen} ModalClose={ModalClose}/>
    </>
  )
}
