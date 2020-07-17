import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Session } from 'src/sessions/sessions.entity';
import { User } from 'src/users/users.entity';
import { SessionCandidateStatus } from 'src/session-candidate-statuses/session-candidate-statuses.entity';
import { SessionCandidateStatusTypes } from 'src/session-candidate-statuses/session-candidate-statuses.types';

@Entity('session_candidates')
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
  quizedAt: string;

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
    name: 'status_system_name',
    referencedColumnName: 'systemName',
  })
  status: SessionCandidateStatus;

  createdAt: string;
}
