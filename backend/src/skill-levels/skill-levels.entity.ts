import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('skillLevels')
export class SkillLevel extends SystemValueEntity {}
