import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_USER_STATE = {
    signedState: false
};

export const turnTrue = createAction('TURN_TRUE');
export const turnFalse = createAction('TURN_FALSE');

export default createReducer(INITIAL_USER_STATE, {
    [turnTrue.type]: (state) => ({ signedState: true }),
    [turnFalse.type]: (state) => ({ signedState: false })
});