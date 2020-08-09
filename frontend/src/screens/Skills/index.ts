import { NavigationService } from '../../services';
import { IMenuItems } from '../../routes/types';
import { ListStudentSkills } from './Student/List';
import { AccountModeType } from '../../app/auth/auth.types';
import { ListTutorSkills } from './Tutor/List';

export const SkillsPath = 'skills';

export const SkillsRoutes: IMenuItems[] = [
  {
    path: NavigationService.studentPath(SkillsPath),
    exact: true,
    title: 'Skills',
    showOnNavigation: true,
    accountModes: [AccountModeType.Student],
    component: ListStudentSkills,
  },
  {
    path: NavigationService.tutorPath(SkillsPath),
    exact: true,
    title: 'Skills',
    showOnNavigation: true,
    accountModes: [AccountModeType.Tutor],
    component: ListTutorSkills,
  },
];
