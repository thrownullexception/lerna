import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Session } from 'src/sessions/sessions.entity';

@Entity('session_quizzes')
export class SessionCandidate {
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

  @ManyToOne(
    () => Session,
    ({ id }) => id,
  )
  session: Session;
}
