import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CursorData } from '../types';
import {
  StudentSessionResponse,
  TutorSessionResponse,
  TutorSessionDetailsResponse,
  StudentSessionDetailsResponse,
} from './responses';

const DOMAIN = 'sessions';

interface IState {
  studentSessions: CursorData<StudentSessionResponse>;
  tutorSessions: CursorData<TutorSessionResponse>;
  tutorSessionDetails: TutorSessionDetailsResponse;
  studentSessionDetails: StudentSessionDetailsResponse;
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
  tutorSessionDetails: new TutorSessionDetailsResponse({}),
  studentSessionDetails: new StudentSessionDetailsResponse({}),
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
    setTutorSessionDetails: (state, { payload }: PayloadAction<TutorSessionDetailsResponse>) => {
      state.tutorSessionDetails = payload;
    },
    setStudentSessionDetails: (
      state,
      { payload }: PayloadAction<StudentSessionDetailsResponse>,
    ) => {
      state.studentSessionDetails = payload;
    },
  },
});
