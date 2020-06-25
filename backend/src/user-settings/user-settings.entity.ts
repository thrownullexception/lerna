import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserSettingTypes } from './user-settings.types';
import { User } from '../users/users.entity';

@Entity('user_settings')
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  field: UserSettingTypes | string;

  @Column()
  value: string;

  @ManyToOne(
    type => User,
    user => user.settings,
  )
  user: User;
}
