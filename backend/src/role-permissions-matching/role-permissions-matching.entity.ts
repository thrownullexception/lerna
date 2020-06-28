import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Permission } from '../permissions/permissions.entity';
import { Role } from '../roles/roles.entity';

@Entity('role_permissions_matching')
export class RolesPermissionMatching {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  roleId: number;

  @Column()
  permissionId: number;

  @ManyToOne(
    type => Role,
    role => role.id,
  )
  role: Role;

  @ManyToOne(
    type => Permission,
    permission => permission.id,
  )
  permission: Permission;
}
