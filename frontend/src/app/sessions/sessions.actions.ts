import { ThunkInterface, IThunkDispatch } from '../../shared/types';
import { AccountModeType } from '../auth/auth.types';
import { RequestService, ToastService, NavigationService } from '../../services';
import { transformCursorData, queryStringifyCursor, mutateAUUIDIdOnMe } from '../utils';
import { ICreateSessionForm } from '../../screens/Sessions/Create/CreateSession.types';
import {
  StudentSessionResponse,
  TutorSessionResponse,
  TutorSessionDetailsResponse,
  StudentSessionDetailsResponse,
} from './responses';
import { Cursor } from '../types';
import { sessionsSlice } from './sessions.ducks';
import { requestStatusSlice } from '../request-status/request-status.ducks';
import { SessionsPath } from '../../screens/Sessions';
import { RequestStatusActions } from '../request-status/request-status.actions';
import { SessionsSelectors } from './sessions.selectors';
import { IStore } from '../../store/rootReducers';

const BASE_PATH = 'sessions';

export class SessionsActions {
  static createSession(createSessionForm: ICreateSessionForm): ThunkInterface<void> {
    return async (dispatch: IThunkDispatch) => {
      dispatch(requestStatusSlice.actions.formRequestStarted());
      try {
        await RequestService.post(BASE_PATH, mutateAUUIDIdOnMe(createSessionForm));
        NavigationService.goTo(
          NavigationService.studentPath(
            NavigationService.getIdAndShowPath(SessionsPath, createSessionForm),
          ),
        );
        ToastService.success('Session Created Successfully');
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.formRequestEnded());
    };
  }

  static fetchStudentSessions(cursor: Cursor): ThunkInterface<void> {
    return async (dispatch: IThunkDispatch, getState: () => IStore) => {
      dispatch(
        RequestStatusActions.startRequestIndicator(
          SessionsSelectors.selectStudentSessionsData(getState()),
        ),
      );
      try {
        const { data } = await RequestService.get(
          `${BASE_PATH}/${AccountModeType.Student}${queryStringifyCursor(cursor)}`,
        );
        dispatch(
          sessionsSlice.actions.setStudentSessions(
            transformCursorData<StudentSessionResponse>(data, StudentSessionResponse),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(RequestStatusActions.endRequestIndicator());
    };
  }

  static fetchStudentSessionDetails(sessionId: string): ThunkInterface<void> {
    return async (dispatch: IThunkDispatch) => {
      dispatch(requestStatusSlice.actions.dataRequestStarted());
      try {
        const { data } = await RequestService.get(
          `${BASE_PATH}/${sessionId}/${AccountModeType.Student}`,
        );
        dispatch(
          sessionsSlice.actions.setStudentSessionDetails(new StudentSessionDetailsResponse(data)),
        );
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.dataRequestEnded());
    };
  }

  static fetchTutorSessions(cursor: Cursor): ThunkInterface<void> {
    return async (dispatch: IThunkDispatch) => {
      dispatch(requestStatusSlice.actions.dataRequestStarted());
      try {
        const { data } = await RequestService.get(
          `${BASE_PATH}/${AccountModeType.Tutor}${queryStringifyCursor(cursor)}`,
        );
        dispatch(
          sessionsSlice.actions.setTutorSessions(
            transformCursorData<TutorSessionResponse>(data, TutorSessionResponse),
          ),
        );
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.dataRequestEnded());
    };
  }

  static fetchTutorSessionDetails(sessionId: string): ThunkInterface<void> {
    return async (dispatch: IThunkDispatch) => {
      dispatch(requestStatusSlice.actions.dataRequestStarted());
      try {
        const { data } = await RequestService.get(
          `${BASE_PATH}/${sessionId}/${AccountModeType.Tutor}`,
        );
        dispatch(
          sessionsSlice.actions.setTutorSessionDetails(new TutorSessionDetailsResponse(data)),
        );
      } catch (e) {
        ToastService.error(e);
      }
      dispatch(requestStatusSlice.actions.dataRequestEnded());
    };
  }
}
