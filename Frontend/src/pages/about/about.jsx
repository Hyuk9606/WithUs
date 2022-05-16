import React from 'react'
import AboutSidbar from "../../component/about/sidbar";
import Introduce from "../../component/about/introduce";
import styled from 'styled-components';
import Guide from "../../component/about/guide";
import PreviewCharacter from "../../component/about/previewCharacter";
import PreviewPDF from "../../component/about/previewPDF";
import Navbar from '../../component/navbar';
import Footer from '../../component/footer';

const Wrap = styled.div`
  font-family: 'Jua', sans-serif, cursive;
`

export default function About() {

  return (
    <>
        <Navbar />
        <AboutSidbar />
        <Wrap>
            <Introduce />
            <Guide />
            <PreviewCharacter />
            <PreviewPDF/>
        </Wrap>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
        </style>
        <Footer />
    </>
  )
}
