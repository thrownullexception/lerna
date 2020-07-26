import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import { StudentSessionResponse, TutorSessionResponse } from './responses';
import { Cursor, CursorData } from '../types';

export class SessionsSelectors {
  static base(state: IStore) {
    return state.sessions;
  }

  static selectTutorSessions$1(state: IStore): CursorData<TutorSessionResponse> {
    return createSelector(SessionsSelectors.base, ({ tutorSessions }) => tutorSessions)(state);
  }

  static selectStudentSessions$1(state: IStore): CursorData<StudentSessionResponse> {
    return createSelector(SessionsSelectors.base, ({ studentSessions }) => studentSessions)(state);
  }

  static selectStudentSessionsData(state: IStore): StudentSessionResponse[] {
    return createSelector(SessionsSelectors.selectStudentSessions$1, ({ data }) => data)(state);
  }

  static selectStudentSessionCursor(state: IStore): Cursor {
    return createSelector(SessionsSelectors.selectStudentSessions$1, ({ cursor }) => cursor)(state);
  }

  static selectTutorSessionsData(state: IStore): TutorSessionResponse[] {
    return createSelector(SessionsSelectors.selectTutorSessions$1, ({ data }) => data)(state);
  }

  static selectTutorSessionCursor(state: IStore): Cursor {
    return createSelector(SessionsSelectors.selectTutorSessions$1, ({ cursor }) => cursor)(state);
  }
}
