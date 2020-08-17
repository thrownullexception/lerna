import { createSelector } from 'reselect';
import { IStore } from '../../store/rootReducers';
import {
  StudentSessionResponse,
  TutorSessionResponse,
  TutorSessionDetailsResponse,
  StudentSessionDetailsResponse,
} from './responses';
import { Cursor, CursorData } from '../types';

export class SessionsSelectors {
  static base(state: IStore) {
    return state.sessions;
  }

  static selectTutorSessionsCursorData(state: IStore): CursorData<TutorSessionResponse> {
    return createSelector(SessionsSelectors.base, ({ tutorSessions }) => tutorSessions)(state);
  }

  static selectStudentSessionsCursorData(state: IStore): CursorData<StudentSessionResponse> {
    return createSelector(SessionsSelectors.base, ({ studentSessions }) => studentSessions)(state);
  }

  static selectStudentSessionsData(state: IStore): StudentSessionResponse[] {
    return createSelector(
      SessionsSelectors.selectStudentSessionsCursorData,
      ({ data }) => data,
    )(state);
  }

  static selectStudentSessionCursor(state: IStore): Cursor {
    return createSelector(
      SessionsSelectors.selectStudentSessionsCursorData,
      ({ cursor }) => cursor,
    )(state);
  }

  static selectStudentSessionDetails(state: IStore): StudentSessionDetailsResponse {
    return createSelector(
      SessionsSelectors.base,
      ({ studentSessionDetails }) => studentSessionDetails,
    )(state);
  }

  static selectTutorSessionsData(state: IStore): TutorSessionResponse[] {
    return createSelector(
      SessionsSelectors.selectTutorSessionsCursorData,
      ({ data }) => data,
    )(state);
  }

  static selectTutorSessionCursor(state: IStore): Cursor {
    return createSelector(
      SessionsSelectors.selectTutorSessionsCursorData,
      ({ cursor }) => cursor,
    )(state);
  }

  static selectTutorSessionDetails(state: IStore): TutorSessionDetailsResponse {
    return createSelector(
      SessionsSelectors.base,
      ({ tutorSessionDetails }) => tutorSessionDetails,
    )(state);
  }
}
