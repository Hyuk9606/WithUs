import React, { useState, useEffect } from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import VideoRoomComponent from '../../openVidu/components/VideoRoomComponent'

const unityContext = new UnityContext({
  loaderUrl: "Build/Documents.loader.js",
  dataUrl: "Build/Documents.data",
  frameworkUrl: "Build/Documents.framework.js",
  codeUrl: "Build/Documents.wasm",
});

const GameContainer = styled.div`

`

const OpenViduContainer = styled.div`
  z-index: -1;
`

export default function Webgl() {

    // const [data, setData] = useState("");
    //
    // useEffect(function () {
    //     unityContext.on("showCharactor", function (str) {
    //         console.log(" data : ", str)
    //         setData(str);
    //     });
    // }, []);
    //
    // useEffect(()=>{
    //     console.log("리엑트에서 캐릭터 정보 : ", data);
    //
    // })
  const user = useSelector(state => state)

  const [isStart, setIsStart] = useState(false);

  // 디버깅 테스트
  const [sessionName, SetSessionName] = useState('lobby')

  function click() {
    if (sessionName === 'lobby'){
      SetSessionName('classroom')
    } else{
      SetSessionName('lobby')
    }
    console.log(sessionName)
  }


  unityContext.on("ClickStartbtn" , function() {
    setIsStart(true)
  });
  
  function sendUsername () {
    console.log(user.auth.username)
    unityContext.send("GameObject", "GetUser", user.auth.username);
    unityContext.send("GameObject", "GetUserId", user.auth.userId);
    
  }
  useEffect(() => {
    console.log(user.auth.username)
    unityContext.send("GameObject", "GetUser", user.auth.username);
    unityContext.send("GameObject", "GetUserId", user.auth.userId);
  },[isStart])



  return (
    <>
      <OpenViduContainer>
        <VideoRoomComponent sessionName={sessionName}/>
      </OpenViduContainer>
      <GameContainer>
        <Unity unityContext={unityContext} 
          style={{
            width: "100%",
            height: "85%",
            justifySelf: 'center',
            alignSelf: 'center'
          }}
        />;
      </GameContainer>
      <button onClick={sendUsername}>button</button>
      <button onClick={click}>sessionChange</button>
    </>
  )
}
