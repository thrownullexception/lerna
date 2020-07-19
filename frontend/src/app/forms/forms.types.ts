export interface IFormState {
  isMakingFormRequest: boolean;
}

export enum ActionType {
  FORM_REQUEST_STARTED = 'FORM_REQUEST_STARTED',
  FORMS_REQUEST_ENDED = 'FORMS_REQUEST_ENDED',
}

interface IFormsRequestStarted {
  type: ActionType.FORM_REQUEST_STARTED;
}

interface IFormsRequestEnded {
  type: ActionType.FORMS_REQUEST_ENDED;
}

interface IDefaultAction {
  type: '';
}

export type FormsAction = IFormsRequestStarted | IFormsRequestEnded | IDefaultAction;
