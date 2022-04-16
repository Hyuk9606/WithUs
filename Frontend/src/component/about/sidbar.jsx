import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
         position: fixed;
         height: 100%;
         width: 200px;
         background-color: #000000;
         background-color: white;
      text-align: center;
    `
const Sidebar = styled.div`
      position: fixed;
      margin: 0 auto;
      top: 50%;
      a {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 30px;
        display: block;
        color: black;
        cursor: pointer;
        &:hover {
          color: darkgreen;
        }
      }      
    `

export default function AboutSidbar(){


    function handleClick(event) {
        // console.log(arr[0][0].classList, "arr classList")
        // console.log(event.target.className,"target")
        event.target.style.color="red";
        let div;
        for(let i=0; i<arr.length; i++){
            if(event.target.className !== arr[i][0].className){
                // console.log(arr[i][0])
                arr[i][0].style.color = "black";
            }
        }
    }

    const menuSelect=(e)=>{
        const text = e.target.text;
        if(text == "소개"){
            window.scrollTo({
                top: 92,
                left: 0,
                behavior: 'smooth'
            });
            setSelect(text);
        }else if(text == "조작법") {
            window.scrollTo({
                top: 1034,
                left: 0,
                behavior: 'smooth'
            });
            setSelect(text);
        }else{
            window.scrollTo({
                top: 1967,
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
            for(let i=0; i<3; i++){
                subArr.push(document.getElementsByClassName(`div${i}`))
                setArr(subArr);
            }
    },[])

//     window.addEventListener("scroll", () => {
//         let value = window.scrollY
//         console.log("scrollY : ", value);
//     })
    return (
        <>
            <Wrapper>
                <Sidebar>
                    {menu.map((text,idx)=> {
                            return (
                            <div className="div" key={idx}>
                                <a value={text} onClick={menuSelect} className={"div"+idx} >{text}</a>
                            </div>
                            )
                    })}
                </Sidebar>
            </Wrapper>
        </>
    );
};
