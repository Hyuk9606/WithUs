import React from 'react'
import Unity, { UnityContext } from "react-unity-webgl";
import styled from 'styled-components';

const unityContext = new UnityContext({
  loaderUrl: "build/forwebgl.loader.js",
  dataUrl: "build/forwebgl.data",
  frameworkUrl: "build/forwebgl.framework.js",
  codeUrl: "build/forwebgl.wasm",
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
