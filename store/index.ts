import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userState';
import userInfoReducer from './user/userInfo';
import modalAddFriends from './user/modalAddFriends';
import thunk from 'redux-thunk';

export default configureStore({
    reducer: {
        user: userReducer,
        userInfo: userInfoReducer,
        modalAddFriends: modalAddFriends
    },
    middleware: [thunk]
});