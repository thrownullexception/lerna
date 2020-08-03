import { IsNotEmpty, IsUUID } from 'class-validator';
import { RolesPermissionMatching } from '../role-permissions-matching.entity';
import { Unique } from '../../shared/constraints';

export class RolePermissionMatchingDTO {
  @Unique<RolePermissionMatchingDTO>(
    {
      repositoryModel: RolesPermissionMatching,
      otherColumn: 'permissionId',
    },
    {
      message: 'Permission Already Added',
    },
  )
  @IsUUID(4)
  @IsNotEmpty({
    message: 'Role Id is required',
  })
  roleId: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'Permission Id is required',
  })
  permissionId: string;
}
