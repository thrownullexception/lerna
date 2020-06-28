import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/users.entity';
import { RolesPermissionMatching } from '../role-permissions-matching/role-permissions-matching.entity';
import { Permission } from '../permissions/permissions.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  // @OneToMany(
  //   () => RolesPermissionMatching,
  //   rolesPermissionMatching => rolesPermissionMatching.role,
  // )
  // permissions: RolesPermissionMatching[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permissions_matching',
  })
  permissions: Permission[];

  @OneToMany(
    () => User,
    user => user.role,
  )
  users: User[];
}
