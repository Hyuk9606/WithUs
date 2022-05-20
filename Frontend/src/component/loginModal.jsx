import React from 'react'
import { useState, useEffect } from 'react';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';

import {GOOGLE_AUTH_URL,FACEBOOK_AUTH_URL,NAVER_AUTH_URL,KAKAO_AUTH_URL } from '../utils'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Title = styled.h1`
    text-align: center;
    font-size : 50px;
    margin-bottom: 15%;
    font-family: 'Jua', sans-serif;
`
const LoginButtonBox = styled.div`
    margin: 5% auto 5% auto;
`
const NaverButton = styled.button`
    background-color: #2DB400;
    border: 1px solid #2DB400;
    border-radius: 5px;
    width: 90%;
    height: 40px;
    margin: auto;
    display: block;
    font-size: 17px;
    color : white;
    font-family: 'Jua', sans-serif;
`
const KakaoButton = styled.button`
    background-color: #f9e000;
    border: 1px solid #f9e000;
    border-radius: 5px;
    width: 90%;
    height: 40px;
    margin: auto;
    display: block;
    font-size: 17px;
    font-family: 'Jua', sans-serif;
`
const GoogleButton = styled.button`
    background-color: lightgrey;
    border: 1px solid lightgrey;
    border-radius: 5px;
    width: 90%;
    height: 40px;
    margin: auto;
    display: block;
    font-size: 17px;
    color: grey;
    font-family: 'Jua', sans-serif;
`

export default function LoginModal(props) {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        props.ModalClose()
        setOpen(false)
    }
    
    useEffect(() => {
        if (props !== undefined) {
            setOpen(props.isModalOpen)
        }
    }, [props])


  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Title>로그인</Title>

                <LoginButtonBox onClick={() => {
                    window.open(
                        `${NAVER_AUTH_URL}`,
                        "_blank",
                        "height=700,width=377,top=100,left=200,scrollbars=yes,resizable=yes"
                        );
                }}>
                    <NaverButton>네이버로그인</NaverButton>
                </LoginButtonBox>

                <LoginButtonBox onClick={() => {
                    window.open(
                        `${KAKAO_AUTH_URL}`,
                        "_blank",
                        "height=700,width=600,top=100,left=200,scrollbars=yes,resizable=yes"
                        );
                }}>
                    <KakaoButton>카카오로그인</KakaoButton>
                </LoginButtonBox>

                <LoginButtonBox onClick={() => {
                    window.open(
                        `${GOOGLE_AUTH_URL}`,
                        "_blank",
                        "height=600,width=577,top=100,left=200,scrollbars=yes,resizable=yes"
                        );
                }}>
                    <GoogleButton>구글로그인</GoogleButton>
                </LoginButtonBox>
            </Box>
        </Modal>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
        </style>
    </>
  )
}
