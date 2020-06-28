import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { RolesPermissionMatching } from '../role-permissions-matching/role-permissions-matching.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => RolesPermissionMatching,
    rolesPermissionMatching => rolesPermissionMatching.role,
  )
  permissions: RolesPermissionMatching[];

  @OneToMany(
    () => User,
    user => user.role,
  )
  users: User[];
}
