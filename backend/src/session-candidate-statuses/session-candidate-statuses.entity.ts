import { Entity } from 'typeorm';
import { SystemValueEntity } from 'src/shared/entities';

@Entity('session_candidate_statuses')
export class SessionCandidateStatus extends SystemValueEntity {}
