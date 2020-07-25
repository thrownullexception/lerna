import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { ThunkInterface } from '../../shared/types';
import { RequestStatusAction, RequestStatusActionType } from './request-status.types';

export class RequestStatusActions {
  static formRequestStarted(): ThunkInterface<void> {
    return async (dispatch: Dispatch<RequestStatusAction>) => {
      dispatch(action(RequestStatusActionType.FORM_REQUEST_STARTED));
    };
  }
  static formRequestEnded(): ThunkInterface<void> {
    return async (dispatch: Dispatch<RequestStatusAction>) => {
      dispatch(action(RequestStatusActionType.FORM_REQUEST_ENDED));
    };
  }
  static dataRequestEnded(): ThunkInterface<void> {
    return async (dispatch: Dispatch<RequestStatusAction>) => {
      dispatch(action(RequestStatusActionType.DATA_REQUEST_ENDED));
    };
  }
  static dataRequestStarted(): ThunkInterface<void> {
    return async (dispatch: Dispatch<RequestStatusAction>) => {
      dispatch(action(RequestStatusActionType.DATA_REQUEST_STARTED));
    };
  }
}
