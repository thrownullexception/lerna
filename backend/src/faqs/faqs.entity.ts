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
    type => AccountMode,
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
    type => User,
    ({ id }) => id,
  )
  lastTouchedBy$1: User;
}
