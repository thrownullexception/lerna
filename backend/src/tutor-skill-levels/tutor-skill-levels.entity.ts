import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('tutor_skills_levels')
export class TutorSkillLevel extends SystemValueEntity {}
