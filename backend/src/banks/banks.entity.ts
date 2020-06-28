import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BankDetail } from '../bank-details/bank-details.entity';

@Entity('banks')
export class Bank {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(
    type => BankDetail,
    bankDetail => bankDetail.bank,
  )
  bankDetails: BankDetail[];
}
