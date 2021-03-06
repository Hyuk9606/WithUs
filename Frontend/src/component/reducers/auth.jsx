import React from 'react'

const initUser = {
    token : '',
    username : '',
    email : '',
    userId : '',
    isLogined : false,
    isSession : false,
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
        return { ...state, quote: action.payload };

        case "LOGOUT":
            state = logoutUser
            return { ...state, quote: action.payload };
        
        case "JOINSESSION":
            state.isSession = true;
            return {...state, quote: action.payload};

        case "LEAVESESSION":
            state.isSession = false;
            return {...state, quote: action.payload}
        
        default:
            return state;
        } 
    }