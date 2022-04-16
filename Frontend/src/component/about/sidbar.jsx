import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import styled from 'styled-components';

export default function AboutSidbar(){

const menu = ["소개", "조작법", "미리보기"];
const Side = styled.div`
  width: 250px;
  height: 100%;
  top: 314px;
  left: 0;
  position: fixed;
  background-color: white;
`
const menuSelect=(text)=>{
    console.log(text);
    if(text == "소개"){
        window.scrollTo({
            top: 100,
            left: 0,
            behavior: 'smooth'
        });

    }else if(text == "조작법") {
        window.scrollTo({
            top: 800,
            left: 0,
            behavior: 'smooth'
        });
    }else{
        window.scrollTo({
            top: 1600,
            left: 0,
            behavior: 'smooth'
        });
    }
    }
    return (
        <>
            <Side>
            <List
                sx={{  height: "60%", maxWidth: 360, borderRight: "1px solid black",
                    left: "0", top: "0", padding: "20px 0" }}
                aria-label="contacts"
            >
                {menu.map(text=>(
                    <ListItem button >
                        <ListItemText primary={text} onClick={()=>menuSelect(text)}></ListItemText>
                    </ListItem>
                ))}
            </List>
            </Side>
        </>
    );
};
