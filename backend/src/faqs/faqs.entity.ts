import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { AccountMode } from 'src/account-modes/account-modes.entity';
import { AccountModeType } from 'src/account-modes/account-modes.types';

@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  accountModeSystemName: AccountModeType;

  @Column()
  createdAt: string;

  @Column({ select: false })
  updatedAt: string;

  @ManyToOne(
    () => AccountMode,
    ({ systemName }) => systemName,
  )
  @JoinColumn({
    name: 'account_mode_system_name',
    referencedColumnName: 'systemName',
  })
  accountMode: AccountMode;

  @Column()
  lastTouchedById: string;

  @ManyToOne(
    () => User,
    ({ id }) => id,
  )
  lastTouchedBy: User;
}
