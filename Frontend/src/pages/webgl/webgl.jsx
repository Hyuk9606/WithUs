import React, { useState, useEffect } from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import VideoRoomComponent from '../../openVidu/components/VideoRoomComponent'
import axios from 'axios';

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
  const url = 'http://localhost:8080/api/v1/avatar'
  const [isStart, setIsStart] = useState(false);
  const [charaterData, setCharaterData] = useState('');
  const [token, setToken] = useState('');
  let tmpData = `{
    "settingsName": "MaleSettings",
    "selectedElements": {
        "Hair": 1,
        "Beard": 7,
        "Hat": 5,
        "Shirt": 11,
        "Pants": 9,
        "Shoes": 11,
        "Accessory": 11,
        "Item1": -1
    }`
  useEffect(() => {
    setToken(user.auth.token)
  },[])

  // 캐릭터 정보 받아오기
  function getAvatar () {
    axios.get(url, {headers: {
      Authorization: `Bearer ${token}`
    }}).then(response => 
      console.log(response)
      )
  }

  // 캐릭터 정보 저장하기
  function saveAvatar (test) {
    axios.post(url,test, {headers: {
      Authorization: `Bearer ${token}`,
      'Content-type' : 'text/plane'
    }},
    ).then(response => console.log(response))
  }

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
    saveAvatar(tmpData)
    getAvatar()
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
        {/* <VideoRoomComponent sessionName={sessionName}/> */}
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
