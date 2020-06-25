import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  adminId: number;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  admin: User;
}
