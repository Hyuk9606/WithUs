import React, { useState, useEffect } from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AWS from 'aws-sdk'
import Navbar from '../../component/navbar';
import Vidu from '../../openVidu/Vidu'
import Loadingbar from '../../component/loading/Loadingbar'
import LoadingSlider from '../../component/loading/loadingSlider';

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

const LoadingPageContainer = styled.div`
  width: 100%;
  height: 100vh;
`
const LoadingImg = styled.img`
  width: 100%;
  height: 100vh;
`
const LoadingContent = styled.div`
	text-align: center;
	position: absolute;
  width: 100%;
  height: 10%;
	top: 15%;
	left: 50%;
	transform: translate( -50%, -50% );
`
const LoadingText = styled.div`
  margin-top: 2%;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
`
const Title = styled.div`
  text-align: center;
  font-size: 8vw;
  background-image: -webkit-linear-gradient(right, #d9a7c7, #fffcdc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: hue 5s infinite linear;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
`

export default function Webgl() {
  const user = useSelector(state => state)
  const url = process.env.REACT_APP_BASE_URL+ process.env.REACT_APP_BACK_PORT  + '/api/v1/avatar'
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
    // if (user.auth.token === '') {
    //   alert('로그인을 하셔야 이용가능 합니다.')
    //   window.location.replace('https://withus.ssafy.io/')
    // }
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
        var pdfFile = e.target.files[0]
        reader.onloadend = function(){
          var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
          uploadFile(pdfFile,count)
        }
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
  const uploadFile = (file, count) => {
    console.log(file, count)
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
                if (className == "class1") {
                     unityContext.send("class1", "GetProviderId", user.auth.userId)
    
                    unityContext.send("class1", "GetUrl", className)
                    unityContext.send("class1", "StartShare", count)
                } else if (className == "class2") {
                     unityContext.send("class2", "GetProviderId", user.auth.userId)
    
                    unityContext.send("class2", "GetUrl", className)
                    unityContext.send("class2", "StartShare", count)
                } else if (className == "class3") {
                    unityContext.send("class3", "GetProviderId", user.auth.userId)
    
                    unityContext.send("class3", "GetUrl", className)
                    unityContext.send("class3", "StartShare", count)
                }
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
      unityContext.send("GameObject", "ReceiveAvatar", response.data.body.avatar);
    })
  }

  unityContext.on("CallAvatar", function (userId) { getAvatar(userId); });
  unityContext.on("CallSaveAvatar",  function (settings) { saveAvatar(settings); })
  unityContext.on("CallUserName", function () { unityContext.send("ChatController","GetUserName", user.auth.username)})
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
    unityContext.send("class1", "GetUserId", user.auth.userId);
    unityContext.send("class2", "GetUserId", user.auth.userId);
    unityContext.send("class3", "GetUserId", user.auth.userId);
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
    unityContext.send("GameObject", "GetUser", user.auth.username);
    unityContext.send("GameObject", "GetUserId", user.auth.userId);
    
  }

  // useEffect(() => {
  //   // 사용자 id 보내기
  //     unityContext.send("class1", "GetUserId", user.auth.userId);
  //     unityContext.send("class2", "GetUserId", user.auth.userId);
  //     unityContext.send("class3", "GetUserId", user.auth.userId);
  // }, [])

  useEffect(() => {
    unityContext.send("GameObject", "GetUser", user.auth.username);
    unityContext.send("GameObject", "GetUserId", user.auth.userId);
  },[isStart])



  return (
    <>
      <Navbar />
      <input id="inputFile" type="file" accept=".pdf" style={{display:'none'}} onChange={handleFileInput}/>
      <Vidu sessionName={sessionName} myUserName={userId} audioChange={audioChange}/>
      <LoadingPageContainer style={{display : isLoaded ? "none" : "block"}}>
        <LoadingContent>
          {/* <Title>With Us</Title> */}
          <LoadingSlider />
          <Loadingbar bgcolor='black' completed={parseInt(progression * 100)}/>
          {parseInt(progression * 100) < 70 ? 
          <LoadingText>로딩중 입니다.</LoadingText> : 
          <LoadingText>거의 다 왔어요.</LoadingText>}
        </LoadingContent>
      </LoadingPageContainer>
      <GameContainer style={{display : isLoaded ? "block" : "none" , margin:'0 auto 0 auto'}}>
        <div id='unity-container'>
          <Unity unityContext={unityContext} 
            style={{
              marginTop:"70px",
              height: "91vh",
              width: "100%",
              justifySelf: 'center',
              alignSelf: 'center'
            }}
          />
        </div>
      </GameContainer>
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
    </>
  )
}
