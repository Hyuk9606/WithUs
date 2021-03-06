import React, {useEffect, useState} from 'react';
import styled, {keyframes } from 'styled-components';
import {FaArrowCircleDown} from 'react-icons/fa';

const Wrapper = styled.div`
         position: fixed;
         height: 100%;
         width: 200px;
         background-color: beige;
        text-align: center;
    `

const Sidebar = styled.div`
      position: relative;
      margin: 0 auto;
      top: 25%;
      font-family: 'Jua', sans-serif, cursive;
      a {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 30px;
        display: block;
        color: black;
        cursor: pointer;
      }      
    `
    const bounceText = keyframes`
      0%   { transform: translateY(0); }
      50%  { transform: translateY(-30px); }
      100% { transform: translateY(0); }
    `

    const ClickHere = styled.div`
     animation-name: ${bounceText};
      animation-duration: 3s; // 애니메이션 지속시간
      animation-timing-function: linear; // 애니메이션 움직임 속도
      animation-iteration-count: infinite; // 애니메이션 반복 횟수 지정
      color: #166678;
      margin-bottom: 5px;
    `

export default function AboutSidbar(){
// 600 1500
    const [scroll, setScroll] = useState(0);

    function handleClick(event) {
        // console.log(arr[0][0].classList, "arr classList")
        // console.log(event.target.className,"target")
        // event.target.style.color="red";
        if({scroll} > 600){
                    // console.log(arr[i][0])
                    arr[0][0].style.color = "red";
                }
        // for(let i=0; i<arr.length; i++){
        //     if(event.target.className !== arr[i][0].className){
        //         // console.log(arr[i][0])
        //         arr[i][0].style.color = "black";
        //     }
        // }
    }

    const menuSelect=(e)=>{
        const text = e.target.text;
        if(text == "소개"){
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            setSelect(text);
        }else if(text == "조작법") {
            window.scrollTo({
                top: 934,
                left: 0,
                behavior: 'smooth'
            });
            setSelect(text);
        }else{
            window.scrollTo({
                top: 1440,
                left: 0,
                behavior: 'smooth'
            });
            setSelect(text);
        }

        handleClick(e)
    }
    const [select, setSelect] = useState("");
    const [arr, setArr] = useState([]);
    const [menu, setMenu] = useState(["소개", "조작법", "미리보기"]);

    useEffect(()=>{
        let subArr = [];
            for(let i=0; i<menu.length; i++){
                subArr.push(document.getElementsByClassName(`div${i}`))
                setArr(subArr);
            }
    },[])

    useEffect(() => {
        function scrollListener(){
            window.addEventListener("scroll", handleScroll);
        }
        scrollListener();
        return()=>{
            window.removeEventListener("scroll", handleScroll);
        }
    });

    const handleScroll=()=>{
        setScroll(window.scrollY);
        const ChangeColor=(idx)=>{
            for(let i=0; i<arr.length; i++){
                if(i == idx) {
                    continue;
                }
                arr[i][0].style.color = "black";
            }
        }
        if (scroll >= 0 && scroll < 600) {
                arr[0][0].style.color = "red";
                ChangeColor(0);
            } else if (scroll >= 600 && scroll < 1439) {
                arr[1][0].style.color = "red";
                ChangeColor(1);
            } else if (scroll >= 1439) {
                arr[2][0].style.color = "red";
                ChangeColor(2);
        }
    }

    return (
        <>
            <Wrapper>
                <Sidebar>
                    <ClickHere>
                        <div>
                            <h1>click</h1>
                        </div>
                        <div>
                            <FaArrowCircleDown size="30" />
                        </div>
                    </ClickHere>
                    {menu.map((text,idx)=> {
                            return (
                            <div key={idx}>
                                <a value={text} onClick={menuSelect} className={"div"+idx} >{text}</a>
                            </div>
                            )
                    })}
                </Sidebar>
            </Wrapper>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
            </style>
        </>
    );
};
