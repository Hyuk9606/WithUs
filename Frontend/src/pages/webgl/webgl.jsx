import React from 'react'
import Unity, { UnityContext } from "react-unity-webgl";
import styled from 'styled-components';

const unityContext = new UnityContext({
  loaderUrl: "build/webgl확인용.loader.js",
  dataUrl: "build/webgl확인용.data",
  frameworkUrl: "build/webgl확인용.framework.js",
  codeUrl: "build/webgl확인용.wasm",
});

const GameContainer = styled.div`
`

export default function Webgl() {
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
