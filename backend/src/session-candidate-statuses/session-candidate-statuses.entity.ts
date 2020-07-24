import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('session_candidate_statuses')
export class SessionCandidateStatus extends SystemValueEntity {}
