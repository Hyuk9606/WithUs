import React from "react";
import styled from 'styled-components';

const Container = styled.div`
    background-color: #303740;
    position: absolute;
    bottom: 0px;
    width: 100%; 
    flex-direction: column;
`
const Content = styled.div`
  align-items: center;
  height: 100%;
  display: flex;
  justify-content: center;
  color: white;
  padding: 32px 20px;
`
const Title = styled.h2`
    font-weight: 600;
    font-size: 20px;
`
const Wrap = styled.ul`
  line-height: 2;
`
const List = styled.li`
  list-style:none;
  float: left;
  margin: 3px;
`

export default function Footer(){

    return(
        <>
            <Container>
                <Content>
                    <img src={require("../img/favicon.ico")} alt="logo"/>
                    <Title>메타몽</Title>
                    <div>
                        <Wrap>
                            <List>이은성</List>
                            <List>임혁</List>
                            <List>김성준</List>
                        </Wrap>
                        <Wrap>
                            <List>정재현</List>
                            <List>한윤희</List>
                            <List>허영민</List>
                        </Wrap>
                        <ul>
                            <List>&copy;CopyRight&nbsp;&nbsp;C103</List>
                        </ul>
                    </div>
                </Content>
            </Container>

        </>
    )
}