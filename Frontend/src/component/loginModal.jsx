import React from 'react'
import { useState, useEffect } from 'react';
import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
                <NaverLogin 
                clientId={`${process.env.REACT_APP_NAVER}`}
                callbackUrl="http://localhost:3000/"
                render={renderProps => (
                    <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <button>네이버</button>
                    </div>
                )}
                onSuccess={(e) => _clickSnsLoginNaver(e)}
                onFailure={(result) => console.error(result)}
                />
                <KakaoLogin 
                    token={`${process.env.REACT_APP_KAKAO}`}
                    render={renderProps => (
                        <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <button>카카오</button>
                        </div>
                    )}
                    onSuccess={(e) => _clickSnsLoginKakao(e)}
                    onFail={console.error}
                    onLogout={console.info}
                />
                <GoogleLogin
                    clientId={`${process.env.REACT_APP_GOOGLE}`}
                    buttonText="구글로그인"
                    render={renderProps=> (
                        <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <button>구글</button>
                        </div>
                    )}
                    onSuccess={(e) => _clickSnsLoginGoogle(e)}
                    onFailure={console.log}
                    cookiePolicy={'single_host_origin'}
                />
            </Box>
        </Modal>
    </>
  )
}
