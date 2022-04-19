import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { rootReducer } from "./component/reducers/index"


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


function reducer(state = initUser, action) {
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
    }
    
    return state
  }
  
let store = createStore(reducer)
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

        <App />

    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
