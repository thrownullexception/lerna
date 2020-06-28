import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_modes')
export class AccountMode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  systemName: string;

  @Column()
  displayName: string;
}
