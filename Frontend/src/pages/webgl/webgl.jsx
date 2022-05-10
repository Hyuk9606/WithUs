import React, { useState, useEffect } from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import VideoRoomComponent from '../../openVidu/components/VideoRoomComponent'
import axios from 'axios';
import AWS from 'aws-sdk'

const S3_BUCKET ='ssafy-withus';
const REGION ='ap-northeast-2';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_ACCESSKEY
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})


const unityContext = new UnityContext({
  loaderUrl: "Build/build.loader.js",
  dataUrl: "Build/build.data",
  frameworkUrl: "Build/build.framework.js",
  codeUrl: "Build/build.wasm",
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
  const url = process.env.REACT_APP_BASE_URL + '/api/v1/avatar'
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

  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    var inputFileName = e.target.files[0].name
    var idxDot = inputFileName.lastIndexOf(".") + 1;
    var extFile = inputFileName.substr(idxDot, inputFileName.length).toLowerCase();
    if (extFile=="pdf"){
        setSelectedFile(e.target.files[0]);
    }else{
        alert("Only jpg/jpeg and png files are allowed!");
        document.getElementById("inputFile").value = "";
    }     
  }
  // S3 업로드
  const uploadFile = (file) => {
    const fileName = "test.pdf"
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: fileName,
        ContentType: 'application/pdf'
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
        })

}


  // 캐릭터 정보 받아오기
  function getAvatar (userId) {
    axios.get(url+"/"+userId, {headers: {
      Authorization: `Bearer ${token}`
    }
    }).then(response => {
      console.log(response.data.body.avatar);
      unityContext.send("GameObject", "ReceiveAvatar", response.data.body.avatar);
    })
  }

  unityContext.on("CallAvatar", function (userId) { getAvatar(userId); });
  unityContext.on("CallSaveAvatar",  function (settings) { saveAvatar(settings); })

  // 캐릭터 정보 저장하기
  function saveAvatar (build) {
    axios.post(url,build, {headers: {
      Authorization: `Bearer ${token}`,
      'Content-type' : 'text/plane'
    }},
    ).then(response => {
      console.log("저장 완료");
      // console.log(response);
    })
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
    // saveAvatar(tmpData)
    getAvatar("2201016114")
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
      <input id="inputFile" type="file" accept=".pdf" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      <OpenViduContainer>
        {/* <VideoRoomComponent sessionName={sessionName}/> */}
      </OpenViduContainer>
      <GameContainer>
        <div id='unity-container'>
          <Unity unityContext={unityContext} 
            style={{
              width: "100%",
              height: "85%",
              justifySelf: 'center',
              alignSelf: 'center'
            }}
          />;
        </div>
      </GameContainer>
      <button onClick={sendUsername}>button</button>
      <button onClick={click}>sessionChange</button>
    </>
  )
}
