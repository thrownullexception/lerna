import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserResigsteredBy } from './users.types';
// import { UserNotification } from '../user-notifications/user-notifications.entity';
import { Profile } from '../profiles/profiles.entity';
// import { BankDetail } from '../bank-details/bank-details.entity';
import { UserSetting } from '../user-settings/user-settings.entity';
import { Role } from '../roles/roles.entity';
// import { Support } from '../supports/supports.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false })
  username: string;

  @Column({ select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  referredBy: number;

  @Column({ default: 0 })
  rankPoints: number;

  @Column({ select: false })
  registeredBy: UserResigsteredBy;

  @Column({ select: false })
  verified: boolean;

  @Column({ select: false })
  roleId?: number;

  // @OneToMany(
  //   type => UserNotification,
  //   userNotification => userNotification.user,
  // )
  // notifications: UserNotification[];

  // @OneToMany(type => Support, support => support.user)
  // supports: Support[];

  @OneToOne(
    type => Profile,
    profile => profile.id,
  )
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'userId',
  })
  profile: Profile;

  // @OneToOne(type => BankDetail, bankDetail => bankDetail.id)
  // @JoinColumn({
  //   name: 'id',
  //   referencedColumnName: 'userId',
  // })
  // bankDetail: BankDetail;

  @OneToMany(
    type => UserSetting,
    userSetting => userSetting.user,
  )
  settings: UserSetting[];

  @ManyToOne(
    type => Role,
    role => role.users,
  )
  role: Role;
}
