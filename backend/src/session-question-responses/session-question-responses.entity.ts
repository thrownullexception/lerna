import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sessionQuestionResponses')
export class SessionQuestionResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sessionId: string;

  @Column()
  sessionQuestionId: string;

  @Column()
  userId: string;

  @Column()
  response: string;

  @Column()
  isCorrect: boolean;
}
