import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('user_verifications')
export class UserVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  verificationHash: string;
}
