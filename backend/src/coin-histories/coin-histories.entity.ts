import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {
  TransactionHistorySource,
  TransactionHistoryType,
} from './coin-histories.types';
import { User } from '../users/users.entity';

@Entity('coin_histories')
export class CoinHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  message: string;

  @Column()
  source: TransactionHistorySource;

  @Column()
  sourceReference: string;

  @Column()
  amount: number;

  @Column()
  type: TransactionHistoryType;

  @Column()
  createdAt: Date;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  user: User;
}
