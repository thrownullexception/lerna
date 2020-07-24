import { ExecutionContext } from '@nestjs/common';

export const mockJWTGuard = {
  canActivate: (context: ExecutionContext): boolean => {
    const req = context.switchToHttp().getRequest();
    req.user = { id: 1, email: 'name@some.mail', roles: [] };
    return true;
  },
};
