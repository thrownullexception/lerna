import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
// import { UserNotification } from '../user-notifications/user-notifications.entity';
import { Profile } from '../profiles/profiles.entity';
import { BankDetail } from '../bank-details/bank-details.entity';
import { UserSetting } from '../user-settings/user-settings.entity';
import { Role } from '../roles/roles.entity';
import { AccountMode } from 'src/account-modes/account-modes.entity';
// import { Support } from '../supports/supports.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ select: false })
  username: string;

  @Column({ select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  verified: boolean;

  @Column({ select: false })
  accountMode: string;

  @Column({ select: false })
  roleId?: number;

  @Column({ select: false })
  createdAt: string;

  @Column({ select: false })
  updatedAt: string;

  @OneToOne(
    () => Profile,
    profile => profile.id,
  )
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'userId',
  })
  profile: Profile;

  @OneToMany(
    () => UserSetting,
    userSetting => userSetting.user,
  )
  settings: UserSetting[];

  // TODO Check if this works
  @ManyToOne(
    () => AccountMode,
    ({ systemName }) => systemName,
  )
  @JoinColumn({
    name: 'accountMode',
    referencedColumnName: 'systemName',
  })
  accountMode$1: AccountMode;

  @ManyToOne(
    () => Role,
    role => role.users,
  )
  role: Role;

  // @OneToMany(
  //   () => UserNotification,
  //   userNotification => userNotification.user,
  // )
  // notifications: UserNotification[];

  // @OneToMany(() => Support, support => support.user)
  // supports: Support[];

  @OneToOne(
    () => BankDetail,
    bankDetail => bankDetail.id,
  )
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'userId',
  })
  bankDetail: BankDetail;
}
