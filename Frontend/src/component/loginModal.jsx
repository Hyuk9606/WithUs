import React from 'react'
import { useState, useEffect } from 'react';
import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';

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

    const _clickSnsLoginKakao = (e) => {
        console.log(e)
        props.ModalClose()
        let kakaoid = e.profile.id; // 카카오에서 제공한 ID
    };
    const _clickSnsLoginNaver = (e) => {
        setOpen(false)
        console.log(e)
        console.log(props)
        props.ModalClose()
        let naverid = e.id; // 네이버에서 제공한 ID
    };
    const _clickSnsLoginGoogle = (e) => {
        console.log(e)
        props.ModalClose()
        let googleid = e.Ft.NT; // 구글에서 제공한 ID
    };

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
                <NaverLogin 
                clientId={`${process.env.REACT_APP_NAVER}`}
                callbackUrl="http://localhost:3000/"
                render={renderProps => (
                    <LoginButtonBox onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <NaverButton>네이버로그인</NaverButton>
                    </LoginButtonBox>
                )}
                onSuccess={(e) => _clickSnsLoginNaver(e)}
                onFailure={(result) => console.error(result)}
                />
                <KakaoLogin 
                    token={`${process.env.REACT_APP_KAKAO}`}
                    render={renderProps => (
                        <LoginButtonBox onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <KakaoButton>카카오로그인</KakaoButton>
                        </LoginButtonBox>
                    )}
                    onSuccess={(e) => _clickSnsLoginKakao(e)}
                    onFail={console.error}
                    onLogout={console.info}
                />
                <GoogleLogin
                    clientId={`${process.env.REACT_APP_GOOGLE}`}
                    buttonText="구글로그인"
                    render={renderProps=> (
                        <LoginButtonBox onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <GoogleButton>구글로그인</GoogleButton>
                        </LoginButtonBox>
                    )}
                    onSuccess={(e) => _clickSnsLoginGoogle(e)}
                    onFailure={console.log}
                    cookiePolicy={'single_host_origin'}
                />
            </Box>
        </Modal>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
        </style>
    </>
  )
}
