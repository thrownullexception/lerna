import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { ThunkInterface } from '../../shared/types';
import { FormsAction, ActionType } from './forms.types';

export class FormsActions {
  static formRequestStarted(): ThunkInterface<void> {
    return async (dispatch: Dispatch<FormsAction>) => {
      dispatch(action(ActionType.FORM_REQUEST_STARTED));
    };
  }
  static formRequestEnded(): ThunkInterface<void> {
    return async (dispatch: Dispatch<FormsAction>) => {
      dispatch(action(ActionType.FORMS_REQUEST_ENDED));
    };
  }
}
