import { SetMetadata } from '@nestjs/common';

export const AdminPermission = (permission: string) =>
  SetMetadata('permission', permission);
