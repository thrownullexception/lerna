import { RequestStatusAction } from '../request-status/request-status.types';
import { TutorSessionResponse, StudentSessionResponse } from './responses';
import { CursorData } from '../types';

export interface ISessionsState {
  studentSessions: CursorData<StudentSessionResponse>;
  tutorSessions: CursorData<TutorSessionResponse>;
}

export enum ActionType {
  SET_STUDENT_SESSIONS = 'SET_STUDENT_SESSIONS',
  SET_TUTOR_SESSIONS = 'SET_TUTOR_SESSIONS',
}

interface ISetStudentSessions {
  type: ActionType.SET_STUDENT_SESSIONS;
  payload: CursorData<StudentSessionResponse>;
}

interface ISetTutorSessions {
  type: ActionType.SET_TUTOR_SESSIONS;
  payload: CursorData<TutorSessionResponse>;
}

interface IDefaultAction {
  type: '';
}

export type SessionsActionTypes =
  | RequestStatusAction
  | ISetStudentSessions
  | ISetTutorSessions
  | IDefaultAction;
