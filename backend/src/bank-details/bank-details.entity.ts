import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Bank } from '../banks/banks.entity';

@Entity('bankDetails')
export class BankDetail {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  accountNumber: number;

  @Column()
  bankId: number;

  @Column()
  accountName: string;

  @ManyToOne(
    () => Bank,
    bank => bank.bankDetails,
  )
  bank: Bank;
}
