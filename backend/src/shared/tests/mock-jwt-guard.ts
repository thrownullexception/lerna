import { ExecutionContext } from '@nestjs/common';

export const mockJWTGuard = {
  canActivate: (context: ExecutionContext): boolean => {
    const req = context.switchToHttp().getRequest();
    req.user = { id: 'c351ee24-9a21-44ac-ae92-766769f80233' };
    return true;
  },
};
