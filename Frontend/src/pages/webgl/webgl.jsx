import React, { useState, useEffect } from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import VideoRoomComponent from '../../openVidu/components/VideoRoomComponent'
import axios from 'axios';
import AWS from 'aws-sdk'
import Navbar from '../../component/navbar';
import Vidu from '../../openVidu/Vidu'

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

export default function Webgl() {
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

  const [progression, setProgression] = useState(0); // Webgl 로딩
  const [isLoaded, setIsLoaded] = useState(false);

  const [progress , setProgress] = useState(0); // S3 업로드 로딩

  const [selectedFile, setSelectedFile] = useState(null);
  const [className, setClassName] = useState('');
  const [pdfPage, setPdfPage] = useState(0);
  const [userId, setUserId] = useState('');
  const [audioChange, setAudioChange] = useState(0);

  
  unityContext.on("audioChange" , function () {
    if (audioChange === 0) {
      setAudioChange(1)
    } else if (audioChange === 1) {
      setAudioChange(0)
    }
  })


  useEffect(() => {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
    unityContext.on("loaded", function () {
      setIsLoaded(true);
    });
    setToken(user.auth.token)
    setUserId(user.auth.userId)
  },[])


  

  const handleFileInput = (e) => {
    var inputFileName = e.target.files[0].name
    var idxDot = inputFileName.lastIndexOf(".") + 1;
    var extFile = inputFileName.substr(idxDot, inputFileName.length).toLowerCase();
    if (extFile=="pdf"){
        setSelectedFile(e.target.files[0]);

        var reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);

        reader.onloadend = function(){
          var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
          setPdfPage(count)
        }
        uploadFile(e.target.files[0])
        document.getElementById("inputFile").value = "";
    }else{
        alert("Only jpg/jpeg and png files are allowed!");
        document.getElementById("inputFile").value = "";
    }     
  }
  
  unityContext.on("uploadPDF", function (className) {
    setClassName(className)
    document.getElementById("inputFile").click()
  })
  // S3 업로드
  const uploadFile = (file) => {
    const fileName = className + '.pdf'
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
            
            // 업로드 성공했다고 보내기.
            unityContext.send("WebGLAPI_Usage", "GetProviderId", user.auth.userId)

            unityContext.send("WebGLAPI_Usage", "GetUrl", className)
            unityContext.send("WebGLAPI_Usage", "OnMouseDown", pdfPage)
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

  // 음성 채팅 세션
  const [sessionName, SetSessionName] = useState('')

  // 게임 처음 접속 로비 세션 입장
  unityContext.on("loadingGame", function(session) {
    SetSessionName(session)
  })
  
  // 포탈 이동시 오픈비두 세션이동

  // 로비
  unityContext.on("goToLobby", function(session) {
    SetSessionName(session);
  })
  // 로비 2층
  unityContext.on("goToLobby2", function(session) {
    SetSessionName(session)
  })
  // 강의실1
  unityContext.on("goToClass1", function(session) {
    SetSessionName(session)
  })
  // 강의실2
  unityContext.on("goToClass2", function(session) {
    SetSessionName(session)
  })
  // 강의실3
  unityContext.on("goToClass3", function(session) {
    SetSessionName(session)
  })



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
    // 사용자 id 보내기
    unityContext.send("WebGLAPI_Usage", "UserId", user.auth.userId);
  }, [])

  useEffect(() => {
    console.log(user.auth.username)
    unityContext.send("GameObject", "GetUser", user.auth.username);
    unityContext.send("GameObject", "GetUserId", user.auth.userId);
  },[isStart])



  return (
    <>
      <Navbar />
      <input id="inputFile" type="file" accept=".pdf" style={{display:'none'}} onChange={handleFileInput}/>
      <Vidu sessionName={sessionName} myUserName={userId} audioChange={audioChange}/>
      <p style={{margin:"30% auto 0 auto", display: isLoaded ? "none" : "visible"}}>Loading {progression * 100} percent...</p>
      <GameContainer>
        <div id='unity-container'>
          <Unity unityContext={unityContext} 
            style={{

              width: "100%",
              justifySelf: 'center',
              alignSelf: 'center'
            }}
          />
        </div>
      </GameContainer>
    </>
  )
}
