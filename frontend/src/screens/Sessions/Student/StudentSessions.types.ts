import { StudentSessionResponse } from '../../../app/sessions/responses';
import { Cursor } from '../../../app/types';

export interface IProps {
  fetchStudentSessions: (cursor: Cursor) => void;
  studentSessionsData: StudentSessionResponse[];
  studentSessionsCursor: Cursor;
  isMakingDataRequest: boolean;
}

export type StateProps = Pick<
  IProps,
  'studentSessionsCursor' | 'studentSessionsData' | 'isMakingDataRequest'
>;
export type DispatchProps = Pick<IProps, 'fetchStudentSessions'>;

export const StudentSessionsPrefix = '';
