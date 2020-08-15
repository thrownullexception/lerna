import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('skill_levels')
export class SkillLevel extends SystemValueEntity {}
