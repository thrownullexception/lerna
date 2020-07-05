import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../users/users.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.get<string>('permission', context.getClass());
    if (!requiredPermission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user.role) {
      // TODO alert hack
      return false;
    }
    if (user.role.name === 'SUPER_ADMIN') {
      return true;
    }
    // TODO make the FE so solid that is this turns out to be false then we should alert hack here too
    return (
      user && user.role.permissions.some(({ permission }) => permission === requiredPermission)
    );
  }
}
