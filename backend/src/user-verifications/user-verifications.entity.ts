import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_verifications')
export class UserVerification {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  verificationHash: string;
}
