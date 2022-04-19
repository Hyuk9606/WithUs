import {createStore, combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {configureStore} from '@reduxjs/toolkit';
import auth from "../reducers/auth";
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: "root",
  storage,
  whiteList : ['auth'],
};

const rootReducer = combineReducers({
  auth,
});

const enhancedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: enhancedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;