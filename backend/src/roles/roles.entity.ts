import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/users.entity';
import { Permission } from '../permissions/permissions.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

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
