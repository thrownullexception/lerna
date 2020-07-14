import { NavigationService } from '../../services';
import { IMenuItems } from '../../routes/types';
import { FaqsList } from './List';
import { AccountModeType } from '../../app/auth/auth.types';

export const FaqsPath = 'faqs';

export const FaqRoutes: IMenuItems[] = [
  // {
  //   path: NavigationService.indexPath(FaqsPath),
  //   exact: true,
  //   title: 'Faqs',
  //   // component: permissionGaurd(FaqsList, CAN_MANAGE_FAQS),
  //   component: FaqsList,
  //   // permission: CAN_MANAGE_FAQS,
  //   showOnNavigation: true,
  //   actions: [
  //     {
  //       title: 'New Faq',
  //       path: NavigationService.createPath(FaqsPath),
  //     },
  //   ],
  // },
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
