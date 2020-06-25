import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../users/users.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    if (!permission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user.role) {
      return false;
    }
    // TODO if no role and is able to get here then alert hack
    if (user.role.name === 'SUPER_ADMIN') {
      return true;
    }
    // TODO make the FE so solid that is this turns out to be false then we should alert hack here too
    const hasPermissions = () =>
      user.role.permissions.some(
        userPermission => userPermission.permission.permission === permission,
      );
    return user && hasPermissions();
  }
}
