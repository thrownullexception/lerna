import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userVerifications')
export class UserVerification {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  verificationHash: string;
}
