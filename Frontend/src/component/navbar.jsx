import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu,AiOutlineHome } from "react-icons/ai"
import {BsPersonCircle} from "react-icons/bs"
import {GiMagnifyingGlass} from "react-icons/gi"
import LoginModal from './loginModal';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const NavBox = styled.div`
    width: 100%;
    height: 70px;
    background-color: #166678;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
  z-index: 9999;
`
const MenuBar = styled.div`
    margin: auto 20px auto 0;
`
const LoginName = styled.div`
  margin: auto 20px auto 0;
  color: white;
  font-family: Jua, sans-serif, cursive;
`
const RightItem = styled.div`
  display: flex;
`
const LogoBox = styled.div`
`

const LogoImg = styled.img`
    margin-top: 8px;
    margin-left: 20px;
    height: 60px;
`

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const open = Boolean(anchorEl);

    const Swal = require('sweetalert2')
    
    const dispatch = useDispatch()
    const user = useSelector(state => state)

    let navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleHomeClick = () => {
        setAnchorEl(null);
        window.location.replace('https://withus.ssafy.io/')
    }
    const handleAboutClick = () => {
        setAnchorEl(null);
        window.location.replace('https://withus.ssafy.io/about')
    }
    const handleLoginClick = () => {
        setIsModalOpen(true);
        setAnchorEl(null);
    }
    const handleLogoutClick = () => {
        Swal.fire({
            title: '로그아웃 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '로그아웃',
            cancelButtonText: '취소'
        }).then(res => {
            dispatch({type:"LOGOUT"});
            setAnchorEl(null);
            window.location.replace('https://withus.ssafy.io/')
        })
    }

    const ModalClose = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <NavBox>
                <LogoBox>
                    <LogoImg src='logo.png' onClick={handleHomeClick} />
                </LogoBox>
                <RightItem>
                    {user.auth.username == "" ? (null):(
                    <LoginName>안녕하세요 {user.auth.username}님</LoginName>
                )
                }
                <MenuBar>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <AiOutlineMenu size='40' color='white'/>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleHomeClick}><AiOutlineHome size='20' />&nbsp;&nbsp;Home</MenuItem>
                        {user.auth.isLogined ? <MenuItem onClick={handleLogoutClick}><BsPersonCircle size='20'/>&nbsp;&nbsp;Logout</MenuItem> :
                            <MenuItem onClick={handleLoginClick}><BsPersonCircle size='20'/>&nbsp;&nbsp;Login</MenuItem>
                        }
                        <MenuItem onClick={handleAboutClick}><GiMagnifyingGlass size='20'/>&nbsp;&nbsp;About</MenuItem>

                    </Menu>
                </MenuBar>
                </RightItem>
            </NavBox>
            <LoginModal isModalOpen={isModalOpen} ModalClose={ModalClose}/>
        </>
    )
}
