import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userState';
import userInfoReducer from './user/userInfo';
import modalAddFriends from './user/modalAddFriends';
import modalFriend from './user/modalFriend';
import thunk from 'redux-thunk';
import modalAddAgenda from './user/modalAddAgenda';
import ModalAgenda from './user/modalAgenda';

export default configureStore({
    reducer: {
        user: userReducer,
        userInfo: userInfoReducer,
        modalAddFriends: modalAddFriends,
        friend: modalFriend,
        modalAddAgenda: modalAddAgenda,
        agenda: ModalAgenda
    },
    middleware: [thunk]
});