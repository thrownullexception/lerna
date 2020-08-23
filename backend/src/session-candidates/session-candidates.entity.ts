import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Session } from '../sessions/sessions.entity';
import { User } from '../users/users.entity';
import { SessionCandidateStatus } from '../session-candidate-statuses/session-candidate-statuses.entity';
import { SessionCandidateStatusTypes } from '../session-candidate-statuses/session-candidate-statuses.types';

@Entity('sessionCandidates')
export class SessionCandidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sessionId: string;

  @Column()
  candidateId: string;

  @Column()
  statusSystemName: SessionCandidateStatusTypes;

  @Column()
  reason: string;

  @Column()
  openedAt: string;

  @Column()
  respondedAt: string;

  @Column()
  questionedAt: string;

  @ManyToOne(
    () => Session,
    ({ id }) => id,
  )
  session: Session;

  @ManyToOne(
    () => User,
    ({ id }) => id,
  )
  candidate: User;

  @ManyToOne(
    () => SessionCandidateStatus,
    ({ systemName }) => systemName,
  )
  @JoinColumn({
    name: 'statusSystemName',
    referencedColumnName: 'systemName',
  })
  status: SessionCandidateStatus;

  createdAt: string;

  created_at: string;
}
