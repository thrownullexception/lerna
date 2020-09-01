import { Dispatch } from 'redux';
import { ThunkInterface } from '../../shared/types';
import { ProgressService } from '../../services';

import { requestStatusSlice } from '../request-status/request-status.ducks';

export class RequestStatusActions {
  static startRequestIndicator(data: any[]): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(requestStatusSlice.actions.dataRequestStarted());
      if (data.length > 0) {
        ProgressService.start();
      }
    };
  }

  static endRequestIndicator(): ThunkInterface<void> {
    return async (dispatch: Dispatch) => {
      dispatch(requestStatusSlice.actions.dataRequestEnded());
      ProgressService.end();
    };
  }
}
