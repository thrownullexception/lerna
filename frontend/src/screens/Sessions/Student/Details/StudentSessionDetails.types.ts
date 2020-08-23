import { StudentSessionDetailsResponse } from '../../../../app/sessions/responses';

export interface IProps {
  fetchStudentSessionDetails: (sessionId: string) => void;
  studentSessionDetails: StudentSessionDetailsResponse;
}

export type StateProps = Pick<IProps, 'studentSessionDetails'>;
export type DispatchProps = Pick<IProps, 'fetchStudentSessionDetails'>;
