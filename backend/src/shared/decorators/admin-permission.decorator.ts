import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const AdminPermission = (permission: string): CustomDecorator<string> =>
  SetMetadata('permission', permission);
