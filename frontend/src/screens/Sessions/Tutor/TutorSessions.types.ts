import { TutorSessionResponse } from '../../../app/sessions/responses';
import { Cursor } from '../../../app/types';

export interface IProps {
  fetchTutorSessions: (cursor: Cursor) => void;
  tutorSessionsData: TutorSessionResponse[];
  tutorSessionsCursor: Cursor;
}

export type StateProps = Pick<IProps, 'tutorSessionsCursor' | 'tutorSessionsData'>;
export type DispatchProps = Pick<IProps, 'fetchTutorSessions'>;

export const TutorSessionsPrefix = '';
