import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_USER_STATE = {
    isVisible: false
};

export const turnTrueModal = createAction('TURN_TRUE_MODAL');
export const turnFalseModal = createAction('TURN_FALSE_MODAL');

export default createReducer(INITIAL_USER_STATE, {
    [turnTrueModal.type]: (state) => ({ isVisible: true }),
    [turnFalseModal.type]: (state) => ({ isVisible: false }),
});