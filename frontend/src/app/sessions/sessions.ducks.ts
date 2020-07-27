import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CursorData } from '../types';
import { StudentSessionResponse, TutorSessionResponse } from './responses';

const DOMAIN = 'sessions';

interface IState {
  studentSessions: CursorData<StudentSessionResponse>;
  tutorSessions: CursorData<TutorSessionResponse>;
}

const initial: IState = {
  studentSessions: {
    cursor: {},
    data: [],
  },
  tutorSessions: {
    cursor: {},
    data: [],
  },
};

export const sessionsSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    setStudentSessions: (state, { payload }: PayloadAction<CursorData<StudentSessionResponse>>) => {
      state.studentSessions = payload;
    },
    setTutorSessions: (state, { payload }: PayloadAction<CursorData<TutorSessionResponse>>) => {
      state.tutorSessions = payload;
    },
  },
});
