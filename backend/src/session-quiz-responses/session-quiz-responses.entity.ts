import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('session_quiz_responses')
export class SessionQuizResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sessionId: string;

  @Column()
  sessionQuizId: string;

  @Column()
  userId: string;

  @Column()
  response: string;

  @Column()
  isCorrect: boolean;
}
