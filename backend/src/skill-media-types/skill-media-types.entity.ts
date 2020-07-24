import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('skill_media_types')
export class SkillMediaType extends SystemValueEntity {}
