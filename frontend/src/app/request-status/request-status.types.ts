export interface IRequestStatusState {
  isMakingFormRequest: boolean;
  isMakingDataRequest: boolean;
}

export enum RequestStatusActionType {
  FORM_REQUEST_STARTED = 'FORM_REQUEST_STARTED',
  FORM_REQUEST_ENDED = 'FORM_REQUEST_ENDED',
  DATA_REQUEST_STARTED = 'DATA_REQUEST_STARTED',
  DATA_REQUEST_ENDED = 'DATA_REQUEST_ENDED',
}

interface IDataRequestStarted {
  type: RequestStatusActionType.DATA_REQUEST_STARTED;
}

interface IDataRequestEnded {
  type: RequestStatusActionType.DATA_REQUEST_ENDED;
}

interface IFormsRequestStarted {
  type: RequestStatusActionType.FORM_REQUEST_STARTED;
}

interface IFormsRequestEnded {
  type: RequestStatusActionType.FORM_REQUEST_ENDED;
}

interface IDefaultAction {
  type: '';
}

export type RequestStatusAction =
  | IFormsRequestStarted
  | IFormsRequestEnded
  | IDataRequestEnded
  | IDataRequestStarted
  | IDefaultAction;
