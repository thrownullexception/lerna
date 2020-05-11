import { NavigationService } from '../../services';
import { studentGuard } from '../../guards';
import { IMenuItems } from '../../routes/types';
import { ListStudentSkills } from './Student/List';
import { AccountModeType } from '../../app/auth/auth.types';

// const CAN_MANAGE_FAQS = 'CAN_MANAGE_FAQS';
export const SkillsPath = 'skills';

export const SkillsRoutes: IMenuItems[] = [
  {
    path: NavigationService.studentPath(SkillsPath),
    exact: true,
    title: 'Skills',
    showOnNavigation: true,
    accountModes: [AccountModeType.Student],
    component: studentGuard(ListStudentSkills),
  },
];
