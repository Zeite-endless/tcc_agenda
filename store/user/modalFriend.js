import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_FRIEND_STATE = {
    friendData: [],
};

export const saveFriendData = createAction('SAVE_FRIEND_DATA');

export default createReducer(INITIAL_FRIEND_STATE, {
    [saveFriendData.type]: (state, action) => ({...state, friendData: action.payload })
});

// import { createAction, createReducer } from '@reduxjs/toolkit';

// const INITIAL_USER_STATE = {
//     userData: {}
// };

// export const saveUserData = createAction('SAVE_USER_DATA');

// export default createReducer(INITIAL_USER_STATE, {
//     [saveUserData.type]: (state, action) => ({...state, userData: action.payload })
// });