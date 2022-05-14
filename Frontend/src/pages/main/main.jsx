import React, { useEffect } from 'react'
import Navbar from '../../component/navbar';
import styled from 'styled-components';
import test from '../../video/test.mp4'
import { useNavigate } from "react-router-dom";
import {useState} from 'react'
import LoginModal from '../../component/loginModal'
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../component/footer';

const MainContainer = styled.div`
  height: 100vh;
  margin: 0;
`
const Title = styled.div`
  padding-top:10% ;
  padding-bottom: 5%;
  text-align: center;
  font-size: 8vw;
  background-image: -webkit-linear-gradient(right, #d9a7c7, #fffcdc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: hue 5s infinite linear;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
`

const ButtonBox = styled.div`
  width: 100%;
`

const StartButton = styled.button`
  background-color: #B9F8D3;
  font-size: 4vw;
  color: white;
  border: 1px solid #B9F8D3;
  border-radius: 20px;
  margin: auto;
  display: block;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
`
const ContentBox = styled.div`
  text-align: center;
  font-size: 3vw;
  padding-left: 10%;
  padding-right: 10%;
  color : white;
  padding-bottom: 5%;
  font-family: 'Jua', sans-serif, cursive;
`

export default function Main() {
  let navigate = useNavigate()
  const [isLogined, setIsLogined] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch()
  const user = useSelector(state => state)
  useEffect(() => {
    setIsLogined(user.auth.isLogined)
  })

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
      <MainContainer>
        <Title>With Us</Title>
        <ContentBox>With Us에서는 가상공간에 참여해 사용자들에게 토론, 발표, 대화 등의 공간을 제공해 간편하게 커뮤니티를 구성할 수 있습니다.</ContentBox>
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
        @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
      </style>
      <LoginModal isModalOpen={isModalOpen} ModalClose={ModalClose}/>
      <Footer />
    </>
  )
}
