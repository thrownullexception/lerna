import { NavigationService } from '../../services';
import { IMenuItems } from '../../routes/types';
import { CreateSession } from './Create';
import { StudentSessions } from './Student';
import { TutorSessions } from './Tutor';
import { AccountModeType } from '../../app/auth/auth.types';
import { CreateSessionPath } from './Create/CreateSession.types';
import { StudentSessionsPath } from './Student/StudentSessions.types';
import { TutorSessionsPath } from './Tutor/TutorSessions.types';

export const SessionsPath = 'session';

const prefixRoute = (path: string) => `${SessionsPath}/${path}`;

export const CreateSessionPath$1 = prefixRoute(CreateSessionPath);
export const StudentSessionsPath$1 = prefixRoute(StudentSessionsPath);
export const TutorSessionsPath$1 = prefixRoute(TutorSessionsPath);

export const SessionsRoutes: IMenuItems[] = [
  {
    path: NavigationService.studentPath(CreateSessionPath$1),
    exact: true,
    title: 'Create Session',
    showOnNavigation: true,
    accountModes: [AccountModeType.Student],
    component: CreateSession,
  },
  {
    path: NavigationService.studentPath(StudentSessionsPath$1),
    exact: true,
    title: 'Sessions',
    showOnNavigation: true,
    accountModes: [AccountModeType.Student],
    component: StudentSessions,
  },
  {
    path: NavigationService.tutorPath(TutorSessionsPath$1),
    exact: true,
    title: 'Sessions',
    showOnNavigation: true,
    accountModes: [AccountModeType.Tutor],
    component: TutorSessions,
  },
];
