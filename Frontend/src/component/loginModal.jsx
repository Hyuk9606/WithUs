import React from 'react'
import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';

export default function LoginModal() {

    const _clickSnsLoginKakao = (e) => {
        console.log(e)
        let kakaoid = e.profile.id; // 카카오에서 제공한 ID
    };
    const _clickSnsLoginNaver = (e) => {
        console.log(e)
        let naverid = e.id; // 네이버에서 제공한 ID
    };
    const _clickSnsLoginGoogle = (e) => {
        console.log(e)
        let googleid = e.Ft.NT; // 구글에서 제공한 ID
    };

  return (
    <>
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
    </>
  )
}
