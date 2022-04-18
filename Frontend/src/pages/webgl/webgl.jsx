import React from 'react'
import Unity, { UnityContext } from "react-unity-webgl";
import styled from 'styled-components';

const unityContext = new UnityContext({
  loaderUrl: "build/build.loader.js",
  dataUrl: "build/build.data",
  frameworkUrl: "build/build.framework.js",
  codeUrl: "build/build.wasm",
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
            height: "100%",
            justifySelf: 'center',
            alignSelf: 'center'
          }}
        />;
      </GameContainer>
    </>
  )
}
