import { createParamDecorator } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator((field = 'id', req) => {
  return field ? req.user && req.user[field] : req.user;
});
