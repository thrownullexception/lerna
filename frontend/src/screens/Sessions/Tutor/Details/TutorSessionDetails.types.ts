import { TutorSessionResponse } from '../../../../app/sessions/responses';

export interface IProps {
  fetchTutorSessionDetails: (sessionId: string) => void;
  tutorSessionDetails: TutorSessionResponse;
}

export type StateProps = Pick<IProps, 'tutorSessionDetails'>;
export type DispatchProps = Pick<IProps, 'fetchTutorSessionDetails'>;
