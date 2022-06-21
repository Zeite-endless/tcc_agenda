import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_FRIEND_STATE = {
    agendaData: [],
};

export const saveAgendaData = createAction('SAVE_AGENDA_DATA');

export default createReducer(INITIAL_FRIEND_STATE, {
    [saveAgendaData.type]: (state, action) => ({...state, agendaData: action.payload })
});