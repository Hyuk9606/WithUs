import React from "react";
import styled, { css } from 'styled-components'

const Container = styled.div`
    height: 100px;
    margin-top: auto;
    background-color: #166678;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%; 
    padding: 15px 0;  
`
const Content = styled.div`
    height: 100%;
    display: flex;
    // align-items: center;
    // justify-content: center;
`
const Title = styled.h2`
    font-weight: 600;
    font-size: 20px;
`
const List = styled.li`
    list-style:none;
`

export default function Footer(){

    return(
        <>
            <Container>
                <Content>
                    <Title>footer</Title>
                    <ul>
                        <List>정재현</List>
                        <List>정재현</List>
                        <List>정재현</List>
                    </ul>
                    <ul>
                        <List>정재현</List>
                        <List>정재현</List>
                        <List>정재현</List>
                    </ul>
                </Content>
            </Container>

        </>
    )
}