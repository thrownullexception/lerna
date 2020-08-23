import * as React from 'react';
import { NavigationService } from '../../services';
import { IMenuItems } from '../../routes/types';
import { AccountModeType } from '../../app/auth/auth.types';

const ListTutorSkillsComponent = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Tutor/List').then(({ ListTutorSkills }) => ({
    default: ListTutorSkills,
  })),
);

const ListStudentSkillsComponent = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Student/List').then(({ ListStudentSkills }) => ({
    default: ListStudentSkills,
  })),
);

export const SkillsPath = 'skills';

export const SkillsRoutes: IMenuItems[] = [
  {
    path: NavigationService.studentPath(SkillsPath),
    exact: true,
    title: 'Skills',
    showOnNavigation: true,
    accountModes: [AccountModeType.Student],
    component: ListStudentSkillsComponent,
  },
  {
    path: NavigationService.tutorPath(SkillsPath),
    exact: true,
    title: 'Skills',
    showOnNavigation: true,
    accountModes: [AccountModeType.Tutor],
    component: ListTutorSkillsComponent,
  },
];
