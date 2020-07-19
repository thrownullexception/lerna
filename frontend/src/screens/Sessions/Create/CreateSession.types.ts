export interface IProps {
  createSession: (createSessionForm: ICreateSessionForm) => void;
  isMakingRequest: boolean;
}

export type StateProps = Pick<IProps, 'isMakingRequest'>;
export type DispatchProps = Pick<IProps, 'createSession'>;

export interface ICreateSessionForm {
  title: string;
  description: string;
  budgetFrom: string;
  budgetTo: string;
}

export const CreateSessionPath = 'create';
