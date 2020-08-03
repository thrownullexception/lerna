import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Permission } from '../permissions/permissions.entity';
import { Role } from '../roles/roles.entity';

@Entity('role_permissions_matching')
export class RolesPermissionMatching {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  roleId: string;

  @Column()
  permissionId: string;

  @ManyToOne(
    () => Role,
    role => role.id,
  )
  role: Role;

  @ManyToOne(
    () => Permission,
    permission => permission.id,
  )
  permission: Permission;
}
