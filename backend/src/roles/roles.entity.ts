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
    type => RolesPermissionMatching,
    rolesPermissionMatching => rolesPermissionMatching.role,
  )
  permissions: RolesPermissionMatching[];

  @OneToMany(
    type => User,
    user => user.role,
  )
  users: User[];
}
