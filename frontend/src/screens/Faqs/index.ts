import { NavigationService } from '../../services';
import { IMenuItems } from '../../routes/types';
import { FaqsList } from './List';
import { AccountModeType } from '../../app/auth/auth.types';

export const FaqsPath = 'faqs';

export const FaqRoutes: IMenuItems[] = [
  {
    path: NavigationService.tutorPath(FaqsPath),
    exact: true,
    title: 'Support',
    showOnNavigation: true,
    accountModes: [AccountModeType.Tutor],
    component: FaqsList,
  },
  {
    path: NavigationService.studentPath(FaqsPath),
    exact: true,
    title: 'Support',
    showOnNavigation: true,
    accountModes: [AccountModeType.Student],
    component: FaqsList,
  },
];
