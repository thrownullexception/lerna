import * as React from 'react';
import { NavigationService } from '../../services';
import { IMenuItems } from '../../routes/types';
import { AccountModeType } from '../../app/auth/auth.types';
import { CreateSessionPrefix } from './Create/CreateSession.types';
import { StudentSessionsPrefix } from './Student/StudentSessions.types';
import { TutorSessionsPrefix } from './Tutor/TutorSessions.types';

const StudentSessionsComponent = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Student').then(({ StudentSessions }) => ({
    default: StudentSessions,
  })),
);

const CreateSessionComponent = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Create').then(({ CreateSession }) => ({
    default: CreateSession,
  })),
);

const StudentSessionDetailsComponent = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Student/Details').then(({ StudentSessionDetails }) => ({
    default: StudentSessionDetails,
  })),
);

const TutorSessionDetailsComponent = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Tutor/Details').then(({ TutorSessionDetails }) => ({
    default: TutorSessionDetails,
  })),
);

const TutorSessionsComponent = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Tutor').then(({ TutorSessions }) => ({
    default: TutorSessions,
  })),
);

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
    component: CreateSessionComponent,
  },
  {
    path: NavigationService.studentPath(prefixRoute(StudentSessionsPrefix)),
    exact: true,
    title: 'Sessions',
    showOnNavigation: true,
    accountModes: [AccountModeType.Student],
    component: StudentSessionsComponent,
  },
  {
    path: NavigationService.tutorPath(prefixRoute(TutorSessionsPrefix)),
    exact: true,
    title: 'Sessions',
    showOnNavigation: true,
    accountModes: [AccountModeType.Tutor],
    component: TutorSessionsComponent,
  },
  {
    path: NavigationService.tutorPath(prefixRoute(':sessionId')),
    exact: true,
    title: 'Session Details',
    showOnNavigation: false,
    accountModes: [AccountModeType.Tutor],
    component: TutorSessionDetailsComponent,
  },
  {
    path: NavigationService.studentPath(prefixRoute(':sessionId')),
    exact: true,
    title: 'Session Details',
    showOnNavigation: false,
    accountModes: [AccountModeType.Student],
    component: StudentSessionDetailsComponent,
  },
];
