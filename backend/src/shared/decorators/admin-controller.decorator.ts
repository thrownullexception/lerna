/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, UseGuards, Controller, UseInterceptors } from '@nestjs/common';
import { AdminPermission } from './admin-permission.decorator';
import { APP_CONSTANTS } from '../constants';
import { PermissionsGuard } from '../../auth/guards';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_CONTANTS } from '../../auth/auth.constants';
import { SessionFlashInterceptor } from '../interceptors';

export function AdminController(
  path: string,
  permission: string,
): <TFunction>(target: object | TFunction) => void {
  return applyDecorators(
    Controller(APP_CONSTANTS.ADMIN_ROUTES_PREFIX(path)),
    AdminPermission(permission),
    UseGuards(AuthGuard(AUTH_CONTANTS.COOKIE_STRATEGY), PermissionsGuard),
    UseInterceptors(SessionFlashInterceptor),
  );
}
