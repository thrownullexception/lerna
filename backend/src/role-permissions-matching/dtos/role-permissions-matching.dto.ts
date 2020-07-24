import { IsNotEmpty, IsInt, IsUUID } from 'class-validator';

export class RolePermissionMatchingDTO {
  @IsNotEmpty({
    message: 'Id is required',
  })
  @IsUUID(4)
  id: string;

  @IsNotEmpty({
    message: 'Role Id is required',
  })
  @IsInt({
    message: 'Role Id should be an Int',
  })
  roleId: number;

  @IsNotEmpty({
    message: 'Permission Id is required',
  })
  @IsInt({
    message: 'Permission Id should be an Int',
  })
  permissionId: number;
  // TODO: unique `${serviceAccountId}_${permissionId}` check
}
