import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserSettingTypes } from './user-settings.types';
import { User } from '../users/users.entity';

@Entity('userSettings')
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: number;

  @Column()
  field: UserSettingTypes | string;

  @Column()
  value: string;

  @ManyToOne(
    () => User,
    user => user.settings,
  )
  user: User;
}
