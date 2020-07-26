import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { AccountModeType } from '../auth/auth.types';
import { RequestService, ToastService, ProgressService } from '../../services';
import { addUUIDToForm, transformCursorData, queryStringifyCursor } from '../utils';
import { ICreateSessionForm } from '../../screens/Sessions/Create/CreateSession.types';
import { StudentSessionResponse, TutorSessionResponse } from './responses';
import { Cursor } from '../types';
import { sessionsSlice } from './sessions.ducks';

const BASE_PATH = 'sessions';

export class SessionsActions {
  static createSession(createSessionForm: ICreateSessionForm): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      // dispatch(FormsActions.formRequestStarted());
      try {
        await RequestService.post(BASE_PATH, addUUIDToForm(createSessionForm));
        // dispatch(
        //   action(
        //     ActionType.FETCH_FAQS_SUCCESSFULL,
        //     data.map((datum: object) => new FaqResponse(datum)),
        //   ),
        // );
      } catch (e) {
        ToastService.error(e);
      }
      // dispatch(FormsActions.formRequestEnded());
    };
  }

  static fetchStudentSessions(cursor: Cursor): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      ProgressService.start();
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
      ProgressService.end();
    };
  }

  static fetchTutorSessions(cursor: Cursor): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      ProgressService.start();
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
      ProgressService.end();
    };
  }
}
