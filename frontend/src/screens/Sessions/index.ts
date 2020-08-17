import { NavigationService } from '../../services';
import { IMenuItems } from '../../routes/types';
import { CreateSession } from './Create';
import { StudentSessions } from './Student';
import { TutorSessions } from './Tutor';
import { AccountModeType } from '../../app/auth/auth.types';
import { CreateSessionPrefix } from './Create/CreateSession.types';
import { StudentSessionsPrefix } from './Student/StudentSessions.types';
import { TutorSessionsPrefix } from './Tutor/TutorSessions.types';
import { TutorSessionDetails } from './Tutor/Details';
import { StudentSessionDetails } from './Student/Details';

export const SessionsPath = 'session';

const prefixRoute = (path: string) => `${SessionsPath}/${path}`;

export const CREATE_A_SESSION_PATH = NavigationService.studentPath(
  prefixRoute(CreateSessionPrefix),
);

export const SessionsRoutes: IMenuItems[] = [
  {
    path: CREATE_A_SESSION_PATH,
    exact: true,
    title: 'Create Session',
    showOnNavigation: false,
    accountModes: [AccountModeType.Student],
    component: CreateSession,
  },
  {
    path: NavigationService.studentPath(prefixRoute(StudentSessionsPrefix)),
    exact: true,
    title: 'Sessions',
    showOnNavigation: true,
    accountModes: [AccountModeType.Student],
    component: StudentSessions,
  },
  {
    path: NavigationService.tutorPath(prefixRoute(TutorSessionsPrefix)),
    exact: true,
    title: 'Sessions',
    showOnNavigation: true,
    accountModes: [AccountModeType.Tutor],
    component: TutorSessions,
  },
  {
    path: NavigationService.tutorPath(prefixRoute(':sessionId')),
    exact: true,
    title: 'Session Details',
    showOnNavigation: false,
    accountModes: [AccountModeType.Tutor],
    component: TutorSessionDetails,
  },
  {
    path: NavigationService.studentPath(prefixRoute(':sessionId')),
    exact: true,
    title: 'Session Details',
    showOnNavigation: false,
    accountModes: [AccountModeType.Student],
    component: StudentSessionDetails,
  },
];
