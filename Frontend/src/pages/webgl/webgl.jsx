import React, {useEffect, useState} from 'react'
import Unity, { UnityContext } from "react-unity-webgl";
import styled from 'styled-components';

const unityContext = new UnityContext({
  loaderUrl: "Build/Documents.loader.js",
  dataUrl: "Build/Documents.data",
  frameworkUrl: "Build/Documents.framework.js",
  codeUrl: "Build/Documents.wasm",
});

const GameContainer = styled.div`
`

export default function Webgl() {

    const [data, setData] = useState("");

    useEffect(function () {
        unityContext.on("showCharactor", function (str) {
            console.log(" data : ", str)
            setData(str);
        });
    }, []);

    useEffect(()=>{
        console.log("리엑트에서 캐릭터 정보 : ", data);

    })

  return (
    <>
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
    </>
  )
}
