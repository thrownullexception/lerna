import { StudentSessionResponse } from '../../../app/sessions/responses';
import { Cursor } from '../../../app/types';

export interface IProps {
  fetchStudentSessions: (cursor: Cursor) => void;
  studentSessionsData: StudentSessionResponse[];
  studentSessionsCursor: Cursor;
}

export type StateProps = Pick<IProps, 'studentSessionsCursor' | 'studentSessionsData'>;
export type DispatchProps = Pick<IProps, 'fetchStudentSessions'>;

export const StudentSessionsPath = '';
