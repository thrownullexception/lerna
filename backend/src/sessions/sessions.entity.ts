import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { SessionStatus } from '../session-statuses/session-statuses.entity';
import { SessionStatusTypes } from '../session-statuses/session-statuses.types';
import { SessionSkill } from '../session-skills/session-skills.entity';
import { SessionQuestion } from '../session-questions/session-questions.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  tutorId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  budgetFrom: number;

  @Column()
  budgetTo: number;

  @Column()
  questionsDuration: number;

  @Column()
  passPercentage: number;

  @Column()
  noResponseDuration: number; // TODO implement

  @Column()
  statusSystemName: SessionStatusTypes;

  @ManyToOne(
    () => User,
    ({ id }) => id,
  )
  student: User;

  @ManyToOne(
    () => User,
    ({ id }) => id,
  )
  tutor: User;

  @OneToMany(
    () => SessionSkill,
    ({ session }) => session,
    {
      cascade: ['insert'],
    },
  )
  skills: Array<Partial<SessionSkill>>; // :eyes

  @OneToMany(
    () => SessionQuestion,
    ({ session }) => session,
    {
      cascade: ['insert'],
    },
  )
  questions: Array<Partial<SessionQuestion>>;

  @ManyToOne(
    () => SessionStatus,
    ({ systemName }) => systemName,
  )
  @JoinColumn({
    name: 'status_system_name',
    referencedColumnName: 'systemName',
  })
  status: SessionStatus;

  @Column()
  createdAt: string;
}
