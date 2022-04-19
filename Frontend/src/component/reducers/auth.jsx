import React from 'react'

const initUser = {
    token : '',
    username : '',
    email : '',
    userId : '',
    isLogined : false,
  }
  
  const logoutUser = {
    token : '',
    username : '',
    email : '',
    userId : '',
    isLogined : false,
  }
  

export default function auth(state = initUser, action) {
    switch (action.type) {
        case "LOGIN": 
            state.token = action.token
            state.username = action.data.data.body.user.username
            state.email = action.data.data.body.user.email
            state.userId = action.data.data.body.user.userId
            state.isLogined = true
        return state

        case "LOGOUT":
            state = logoutUser
            return state

        default:
            return state;
        } 
    }
