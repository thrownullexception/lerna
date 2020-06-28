import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator((field = 'id', ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();
  return field ? user && user[field] : user;
});
