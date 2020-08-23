import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('sessionCandidateStatuses')
export class SessionCandidateStatus extends SystemValueEntity {}
