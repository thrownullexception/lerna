import { produce } from 'immer';
import { ISessionsState, ActionType, SessionsActionTypes } from './sessions.types';

const initial: ISessionsState = {
  studentSessions: {
    cursor: {},
    data: [],
  },
  tutorSessions: {
    cursor: {},
    data: [],
  },
};

export const sessionReducer = (state = initial, action: SessionsActionTypes) => {
  return produce(state, draftState => {
    if (action.type === ActionType.SET_STUDENT_SESSIONS) {
      draftState.studentSessions = action.payload;
    }

    if (action.type === ActionType.SET_TUTOR_SESSIONS) {
      draftState.tutorSessions = action.payload;
    }
  });
};
