import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userState';
import userInfoReducer from './user/userInfo';
import thunk from 'redux-thunk';

export default configureStore({
    reducer: {
        user: userReducer,
        userInfo: userInfoReducer
    },
    middleware: [thunk]
});