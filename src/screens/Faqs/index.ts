import { NavigationService } from '../../services';
import { permissionGaurd } from '../../guards';
import { IMenuItems } from '../../routes/types';
import { FaqsList } from './List';
import { FaqsEdit } from './Edit';
import { FaqsCreate } from './Create';

const CAN_MANAGE_FAQS = 'CAN_MANAGE_FAQS';
export const FaqsPath = 'faqs';

export const FaqRoutes: IMenuItems[] = [
  {
    path: NavigationService.indexPath(FaqsPath),
    exact: true,
    title: 'Faqs',
    // component: permissionGaurd(FaqsList, CAN_MANAGE_FAQS),
    component: FaqsList,
    // permission: CAN_MANAGE_FAQS,
    showOnNavigation: true,
    actions: [
      {
        title: 'New Faq',
        path: NavigationService.createPath(FaqsPath),
      },
    ],
  },
  {
    path: NavigationService.editPath(FaqsPath, ':id'),
    exact: true,
    title: 'Edit Faq',
    component: permissionGaurd(FaqsEdit, CAN_MANAGE_FAQS),
    permission: CAN_MANAGE_FAQS,
  },
  {
    path: NavigationService.createPath(FaqsPath),
    exact: true,
    title: 'Create Faq',
    component: permissionGaurd(FaqsCreate, CAN_MANAGE_FAQS),
    permission: CAN_MANAGE_FAQS,
  },
];
