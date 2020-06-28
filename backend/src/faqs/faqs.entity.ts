import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { AccountMode } from 'src/account-modes/account-modes.entity';

@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @ManyToOne(
    () => AccountMode,
    ({ systemName }) => systemName,
  )
  @JoinColumn({
    name: 'accountMode',
    referencedColumnName: 'systemName',
  })
  accountMode$1: AccountMode;

  @Column()
  lastTouchedBy: number;

  @ManyToOne(
    () => User,
    ({ id }) => id,
  )
  lastTouchedBy$1: User;
}
