import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Session } from '../sessions/sessions.entity';

@Entity('session_quizzes')
export class SessionQuiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sessionId: string;

  @Column()
  question: string;

  @Column()
  optionA: string;

  @Column()
  optionB: string;

  @Column()
  optionC: string;

  @Column()
  optionD: string;

  @Column()
  optionE: string;

  @ManyToOne(
    () => Session,
    ({ id }) => id,
  )
  session: Session;
}
