import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_USER_STATE = {
    userData: {}
};

export const saveUserData = createAction('SAVE_USER_DATA');

export default createReducer(INITIAL_USER_STATE, {
    [saveUserData.type]: (state, action) => ({...state, userData: action.payload })
});