import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu,AiOutlineHome } from "react-icons/ai"
import {BsPersonCircle} from "react-icons/bs"
import {GiMagnifyingGlass} from "react-icons/gi"
import LoginModal from './loginModal';
import { useSelector, useDispatch } from 'react-redux';

const NavBox = styled.div`
    width: 100%;
    height: 76px;
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
        navigate('/')
        setAnchorEl(null);
    }
    const handleAboutClick = () => {
        navigate('/about')
        setAnchorEl(null);
    }
    const handleLoginClick = () => {
        setIsModalOpen(true);
        setAnchorEl(null);
    }
    const handleLogoutClick = () => {
        dispatch({type:"LOGOUT"});
        setAnchorEl(null);
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
                        {user.isLogined ? <MenuItem onClick={handleLogoutClick}><BsPersonCircle size='20'/>&nbsp;&nbsp;Logout</MenuItem> :
                            <MenuItem onClick={handleLoginClick}><BsPersonCircle size='20'/>&nbsp;&nbsp;Login</MenuItem>
                        }
                        <MenuItem onClick={handleAboutClick}><GiMagnifyingGlass size='20'/>&nbsp;&nbsp;About</MenuItem>

                    </Menu>
                </MenuBar>
            </NavBox>
            <LoginModal isModalOpen={isModalOpen} ModalClose={ModalClose}/>
        </>
    )
}
